"use strict";
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const dotenv = require('dotenv').config();

const getMongooseConnection = require('./config/mongoose');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(routes);

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