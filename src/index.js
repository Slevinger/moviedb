// a library to handle response
const express = require('express');
const bodyParser = require('body-parser');

let PORT = 8080;

let app = express();
// support CORS
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET ,POST , OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use(bodyParser.json());

    let respondError = function (code, msg, res) {
        return res.status(code).json(msg);
    };


