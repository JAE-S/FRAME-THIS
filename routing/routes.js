  // ========================================================== //
 //                       Controllers                          //
// ========================================================== //

// Node package
// =========================================================
    var axios = require("axios");
    var cheerio = require("cheerio");

// Dependencies
// =========================================================
  const router = require('express').Router();
  var db = require("../models");

// Renders the index page
// =========================================================
  router.get("/articles", (req, res) => {
    res.render('index');  
  });

  // 'catch-all' Route to all browser extension except /survey and /api/friends => displays the home page
  // router.get("*", (req, res) => {
  //   res.render('index');
  // });

 // A GET route for scraping the FRAME website
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
        result.title = $(this)
          .children("a")
          .text();
        result.link = website + $(this)
          .children('a')
          .attr("href") 
          
        // If both a title and link are available -> Create a new Article using the `result` object built from scraping
        if(result.title && result.link){
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
  module.exports = router; 