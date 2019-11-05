  // ========================================================== //
 //                        Controllers                         //
// ========================================================== //

module.exports = db => {

    return {
         // Retrieve data from the db
        // ===========================================================
        getArticles: (req, res) => {
            db.Article.find({})
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
        }, 
         // Get article by ID 
        // =========================================================
        getArticleId: (req, res) => {
            db.Article.findOne({
                _id: req.params.id
            })
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
        },
         // Set article viewed to true 
        // =========================================================
        updateArticles: (req, res) => {
            db.Article.findOneAndUpdate({
            _id: req.params.id
          }, 
            { $set: {opened: true}
          }, 
            {new: true}
        )
          .then(dbArticle => res.json(dbArticle))
          .catch(err => res.json(err))
        },
        // Grab a specific Article by id, populate it with it's note
        // =========================================================  
        populateNote: (req, res) => {
          db.Article.findOne({
            _id: req.params.id
        })
        .populate("note")
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err))
      
        },
        // Post a note
        // =========================================================
        postNote: (req, res) => {
          db.Note.create(req.body)
          .then(dbNote => {
            return db.Saved.findOneAndUpdate({
              _id: req.params.id 
            }, { 
              note: dbNote._id 
            }, { 
              new: true 
            });
          })
          .then(dbSaved => console.log(dbSaved))
          .catch(err => res.json(err));
        }
      } 
   

}