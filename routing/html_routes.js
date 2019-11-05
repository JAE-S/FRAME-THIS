  // ========================================================== //
 //                        HTML Routes                         //
// ========================================================== //

// Dependencies
// =========================================================
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var connection = mongoose.connection;
const router = require('express').Router();

mongoose.connect("mongodb://localhost/FASHION-THAT", { useNewUrlParser: true });

module.exports = db => {
// Main Route - Renders the index page
// =========================================================
  router.get("/", (req, res) => {
    res.render('index');  
  });

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
          
        // If category, date, title, description and link  -> Create a new Article using the `result` object built from scraping
        if(result.category && 
            result.date && 
            result.title && 
            result.description && 
            result.link){
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
            res.redirect('/');
            });
  });

 // Route for dropping articles 
// =========================================================
  // Grab the body of the html with with axios
  router.get("/drop", function(req, res) {
     connection.db.dropCollection("articles", () => {
        console.log("article");
     })

      res.redirect('/');

  });
  

  return router

}
