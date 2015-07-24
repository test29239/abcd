var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var Questions = new Schema({
    question_name: String,
    category_name:String,
    choise1:String,
    choise2:String,
    choise3:String,
    choise4:String,
    correct_answer:Number,
    date_created:Date
});

// the schema is useless so far
// we need to create a model using it
var Question = mongoose.model('Question', Questions);

// make this available to our users in our Node applications
module.exports = Question;