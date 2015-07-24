var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
    username: String,
    password: String,
    email:String,
});

// the schema is useless so far
// we need to create a model using it
var UserSchema = mongoose.model('UserSchema', UserSchema);

// make this available to our users in our Node applications
module.exports = UserSchema;