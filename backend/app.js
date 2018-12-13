const express = require('express');
const bodyParser = require("body-parser");
let firebase = require('./firebase-services');
const iextrading = require('./iextrading-services');

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

// *************** DATABASE CALLS ******************

app.get("/api/getAllSessionNames", (req, res, next) => {
    firebase.getAllSessionNamesFromFirebase()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET Names");
        });
});

app.get("/api/getAllStockData/:sessionKey", (req, res, next) => {
    
    let sessionKey = req.params.sessionKey;
    console.log("Session Key getAllStockData: " + sessionKey);

    firebase.getAllStockDataFromFirebase(sessionKey)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getSessionDates/:sessionKey", (req, res, next) => {
   
    let sessionKey = req.params.sessionKey;
    console.log("Session Key getSessionDates: " + sessionKey);

    firebase.getAllSessionDatesFromFirebase(sessionKey)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET STOCKS");
        });
});

app.get("/api/getPortfolioData/:sessionKey", (req, res, next) => {

    let sessionKey = req.params.sessionKey;
    console.log("Session Key getPortfolioData: " + sessionKey);

    firebase.getPortfolioDataFromFirebase(sessionKey)
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

app.post("/api/postNewSession", (req, res, next) => {
    const session = req.body;

    firebase.postNewSessionToFirebase(session)
        .then(response => {
            console.log("session data?: ", response);
            res.send(response);
        })
        .catch(error => {
            console.log("FAILED TO GET NEW SESSION");
        });
});


app.post("/api/postNewStock/:sessionKey", (req, res, next) => {
    const stock = req.body;

    let sessionKey = req.params.sessionKey;
    console.log("Session Key postNewStock: " + sessionKey);

    firebase.postStockDataToFirebase(stock, sessionKey)
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

app.put("/api/putStockData/:sessionKey", (req, res, next) => {
    const stock = req.body;
    let sessionKey = req.params.sessionKey;
    console.log("Session Key putStockData: " + sessionKey);

    firebase.putStockDataToFirebase(stock, sessionKey)
        .then(response => {
            res.status(200).json({message: "Stock updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT STOCK");
        });
});

app.put("/api/putSessionDates/:sessionKey", (req, res, next) => {
    const dates = req.body;
    let sessionKey = req.params.sessionKey;
    console.log("Session Key putSessionDates: " + sessionKey);

    firebase.putSessionDatesToFirebase(dates, sessionKey)
        .then(response => {
            res.status(200).json({message: "Dates updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT STOCK");
        });
});

app.put("/api/putPortfolioData/:sessionKey", (req, res, next) => {
    const portfolio = req.body;
    let sessionKey = req.params.sessionKey;
    console.log("Session Key putPortfolioData: " + sessionKey);

    firebase.putPortfolioDataToFirebase(portfolio, sessionKey)
        .then(response => {
            res.status(200).json({message: "Portfolio updated"});
        })
        .catch(error => {
            console.log("FAILED TO PUT PORTFOLIO");
        });
});

app.delete("/api/deleteStockData/:id/:sessionKey", (req, res, next) => {
    const key = req.params.id;
    let sessionKey = req.params.sessionKey;
    console.log("Session Key deleteStockData: " + sessionKey);
    firebase.deleteStockDataFromFirebase(key, sessionKey)
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