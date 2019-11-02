var mongoose = require("mongoose"); 

// Save a reference to the Schema constructor 
var Schema = mongoose.Schema; 

// Using the Schema constructor, create a new UserSchema object 
var ArticleSchema = new Schema ({
    category: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },  
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    link: {
        type: String, 
        required: true
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