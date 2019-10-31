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

// Routes
// =========================================================
  
  router.get("/", function(req,res){
    res.redirect("articles")
  });

  router.get("/articles", (req, res) => {
    res.render('index');  
  });

  // 'catch-all' Route to all browser extension except /survey and /api/friends => displays the home page
  router.get("*", (req, res) => {
    res.render('index');
  });

  

  module.exports = router; 