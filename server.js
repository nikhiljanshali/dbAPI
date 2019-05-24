const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
app.use(function (err, req, res, next) {
    // Do logging and user-friendly error message display
    console.error(err);
    res.status(500).send({ status: 500, message: 'internal error', type: 'internal' });
})

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Node Services application. Organize and keep track of all your services." });
});

require('./app/routes/business.route')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});