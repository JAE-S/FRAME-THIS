  // ========================================================== //
 //                         API Routes                         //
// ========================================================== //

// Dependencies
// =========================================================
const router = require('express').Router();

module.exports = function(db) {
    var appController = require("../controllers/appController")(db); 

    // Get articles 
    router.get("/articles", appController.getArticles);

    // Get articles by id 
    router.get("/articles/:id", appController.getArticleId); 

    // Show viewed Articles 
    router.put("/articles/:id", appController.updateArticles)

    router.get("/articles/:id", appController.populateNote)

    router.post("/articles/:id", appController.postNote)

    return router; 
}