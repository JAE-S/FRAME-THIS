  // ========================================================== //
 //                       Controllers                          //
// ========================================================== //

// Node package
// =========================================================
    var axios = require("axios");
    var cheerio = require("cheerio");
    var mongoose = require("mongoose");

// Dependencies
// =========================================================
  const router = require('express').Router();
  var db = require("../models");

 // Main Route - Renders the index page
// =========================================================
  router.get("/", (req, res) => {
    res.render('index');  
  });

  // 'catch-all' Route to all browser extension except /survey and /api/friends => displays the home page
  // router.get("*", (req, res) => {
  //   res.render('index');
  // });

 // Scraping Route - A GET route for scraping Show Studios' website
// =========================================================
  // Grab the body of the html with with axios
  router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.showstudio.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article .relative").each(function(i, element) {
        // Save an empty result object
        var result = {};
         // Files on showstudios' website are saved locally - this link adds their primary url to ensure they work 
        var website = "https://www.showstudio.com"
        // Add the text and href of every link, and save them as properties of the result object
        result.category = $(this)
          .children("a").find('.mb4')
          .text();

        result.date = $(this)
        .children("a").find('.mt3')
        .text();
          
        result.title = $(this)
        .children("a").find('.h3')
        .text();

        result.description = $(this)
        .children("a").find('.mt4')
        .text();


        result.link = website + $(this)
          .children('a')
          .attr("href"); 
          
        // If both a title and link are available -> Create a new Article using the `result` object built from scraping
        if(result.category && result.date && result.title && result.description && result.link){
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
        }
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

 // Route to retrieve data from the db
// =========================================================
  router.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle){
      res.json(dbArticle); 
    })
    .catch((error) => {
      res.json(error); 
    });
  })

 // Route for grabbing a specific Article by id, populate it with it's note
// =========================================================
  router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
     // Then populate all of the notes associated with it
     .populate("note")
     .then(function(dbArticle) {
       // If we were able to successfully find an Article with the given id, send it back to the client
       res.json(dbArticle);
     })
     .catch(function(err) {
       res.json(err);
     });
 });

// Route for saving/updating an Article's associated Note
// =========================================================

  router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query to return the updated User -- it returns the original by default
        // Mongoose query returns a promise -> chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // Update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  module.exports = router; 