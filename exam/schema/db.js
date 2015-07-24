var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var Categories = new Schema({
    category_name: String
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('Category', Categories);

// make this available to our users in our Node applications
module.exports = Category;