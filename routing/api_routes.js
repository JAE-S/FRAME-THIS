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

    router.get("/articles-notes/", appController.populateNote)

    router.post("/articles/:id", appController.postNote)

    router.get("/notes", appController.getNote)

    router.get("/notes/:id", appController.getNoteId)

    router.put("/notes/delete/:id", appController.deleteNote)

    return router; 
}