"use strict";
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const dotenv = require('dotenv').config();

const getMongooseConnection = require('./config/mongoose');

const app = express()
const port = process.env.port || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(routes);

app.use((err, req, res, next) => {
    console.log('FINAL ERROR ', JSON.stringify(err));
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            message: err.error.toString()
        });
    } else if (err && err.errmsg) {
        res.status(500).json({
            message: err.errmsg
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.listen(port, () => {
    getMongooseConnection()
        .then(() => {
            console.log('MongoDB Connected');
        }).catch(e => {
            console.log('Mongo Error', e);
            process.exit(1);
        })
});

process.on('unCaughtException', function (err) {
    console.log(err);
    process.exit(1);
});

module.exports = app;