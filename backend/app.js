const express = require('express');
const bodyParser = require("body-parser");
const firebase = require('./firebase-services');
const iextrading = require('./iextrading-services');
let localStorage = null;
if ((typeof localStorage === "undefined" || localStorage === null)) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./local-storage');
    console.log("INITIALIZED THE LOCALSTORAGE");
}
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT"
    );
    next();
});

// ****** SET BACKEND LOCAL STORAGE SESSION KEY ********

app.get("/api/setSessionKey:id", (req, res, next) => {
    const sessionKey = req.params.id;
    localStorage.setItem('sessionKey', sessionKey);
    res.status(200).json({message: "Session key set"});
});

// *************** DATABASE CALLS ******************

app.get("/api/getAllStockData", (req, res, next) => {
    firebase.getAllStockDataFromFirebase()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getSessionDates", (req, res, next) => {
    firebase.getAllSessionDatesFromFirebase()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getPortfolioData", (req, res, next) => {
    firebase.getPortfolioDataFromFirebase()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getAllSymbolData", (req, res, next) => {
    firebase.getAllSymbolDataFromDatabase()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.post("/api/postNewStock", (req, res, next) => {
    const stock = req.body;

    firebase.postStockDataToFirebase(stock)
        .then(response => {
            console.log("Stock data?: ", response);
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.post("/api/postNewSymbol", (req, res, next) => {
    const symbol = req.body;

    firebase.postSymbolDataToFirebase(symbol)
        .then(response => {
            console.log("Symbol data?: ", response);
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET SYMBOL");
        });
});

app.put("/api/putStockData", (req, res, next) => {
    const stock = req.body;
    firebase.putStockDataToFirebase(stock)
        .then(response => {
            res.status(200).json({message: "Stock updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT STOCK");
        });
});

app.put("/api/putSessionDates", (req, res, next) => {
    const dates = req.body;
    firebase.putSessionDatesToFirebase(dates)
        .then(response => {
            res.status(200).json({message: "Dates updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT STOCK");
        });
});

app.put("/api/putPortfolioData", (req, res, next) => {
    const portfolio = req.body;
    firebase.putPortfolioDataToFirebase(portfolio)
        .then(response => {
            res.status(200).json({message: "Portfolio updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT PORTFOLIO");
        });
});

app.delete("/api/deleteStockData/:id", (req, res, next) => {
    const key = req.params.id;
    firebase.deleteStockDataFromFirebase(key)
        .then(response => {
            res.status(200).json({message: "Stock deleted"});
        })
        .catch(error => {
            console.log("FAILED TO DELETE STOCK");
        });
});


// *************** STOCK CALLS ******************

app.get("/api/getStockLogo/:id", (req, res, next) => {
    const key = req.params.id;
    iextrading.getStockLogoURLFromExternalAPI(key)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getStockFromDate/:symbol/:date", (req, res, next) => {
    const symbol = req.params.symbol;
    const date = req.params.date;
    iextrading.getStockDataFromExternalAPI(symbol, date)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

// SHOULD BE DELETED EVENTUALLY
app.get("/api/getChart/:symbol", (req, res, next) => {
    const symbol = req.params.symbol;
    iextrading.getStockChart(symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED BADLY");
        });
});

module.exports = app;