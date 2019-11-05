const mongoose = require("mongoose");

// Save a reference to the Schema constructor 
var Schema = mongoose.Schema; 

// Using the Schema constructor, create a new NoteSchema object 
var NoteSchema = new Schema({
   
    title: {
        type: String, 
        required: true
    }, 
    created: { 
        type: Date,
        default: Date.now
    }, 
    body: {
        type: String, 
        required: true, 
    }, 
    delete: {
        type: Boolean, 
        default: false
    }, 
    note: {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }

});

// Creates a model from the Schema above, using mongoose's model method 
var Note = mongoose.model("Note", NoteSchema);

// Exports the Note modal 
module.exports = Note;  