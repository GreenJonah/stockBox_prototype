const express = require('express');
const bodyParser = require("body-parser");
const firebase = require('./firebase-services');
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

app.get("/api/getAllStockData", (req, res, next) => {
    firebase.getAllStockDataFromFirebase()
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


module.exports = app;