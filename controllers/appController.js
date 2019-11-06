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
        // Populate notes with articles 
        // =========================================================  
        populateNote: (req, res) => {
          db.Article.find({})
        .populate("note")
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err))
      
        },
        // Post a note
        // =========================================================
        postNote: (req, res) => {
          db.Note.create(req.body)
          .then(dbNote => {
            return db.Article.findOneAndUpdate({
              _id: req.params.id 
            }, { 
              note: dbNote._id 
            }, { 
              new: true 
            });
          })
          .then(dbArticle => console.log(dbArticle))
          .catch(err => res.json(err));
        },
        // Find all of the notes
       // =========================================================
        getNote: (req, res) => {
          db.Note.find({})
          .then(dbNote => res.json(dbNote))
          .catch(err => res.json(err))
      },
       // Get Note by Id
       // =========================================================
        getNoteId: (req, res) => {
        db.Note.findOne({
            _id: req.params.id
        })
        .then(dbNote => res.json(dbNote))
        .catch(err => res.json(err))
     },
      // Get Note by Id
       // =========================================================
       deleteNote: (req, res) => {
        db.Note.findOneAndDelete({
            _id: req.params.id
        })
        .then(dbNote => res.json(dbNote))
        .catch(err => res.json(err))
     }
  
}
}