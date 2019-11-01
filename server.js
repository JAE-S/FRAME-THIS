
  // ========================================================== //
 //                       S E R V E R                          //
// ========================================================== //

// Dependencies
// =========================================================
    const express = require("express");
    const exphbs = require("express-handlebars");
    const logger = require("morgan");
    const mongoose = require("mongoose");

// Sets up the Express App
// =========================================================
    var app = express();

// PORT
// =========================================================
    const PORT = process.env.PORT || 8080;

// Sets up for Mongoose + Heroku
// =========================================================
    var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/FRAME";
    mongoose.connect(MONGODB_URI,  { useNewUrlParser: true })
    // Connect to mongoose database 
    mongoose.connect(MONGODB_URI, err => {
        if (err){
            console.log("An error has occured: " + err);
        } else {
            console.log("Connection to Mongoose was successful");
        }
    });

// Configure middleware
// =========================================================
// Use morgan logger for logging requests
    app.use(logger("dev"));

// Parse request body as JSON
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

// Handlebars 
// =========================================================
    app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    app.use(express.static('public'));

// Route
// =========================================================
    var routes = require("./routing/routes.js");
    app.use(routes); 


// Starts the server
// =========================================================
    app.listen(PORT, () => {
        console.log("App running on port " + PORT  + "!");
    });