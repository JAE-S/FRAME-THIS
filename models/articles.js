var mongoose = require("mongoose"); 

// Save a reference to the Schema constructor 
var Schema = mongoose.Schema; 

// Using the Schema constructor, create a new UserSchema object 
var ArticleSchema = new Schema ({
    title: {
        type: String, 
        required: false
    }, 
    link: {
        type: String, 
        required: false
    }, 
    note: {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }
}); 
// This creates the model from the above Schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Exports the Article model
module.exports = Article;  