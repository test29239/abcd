var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/exam');
mongoose.connect('mongodb://exam:exam123@ds047742.mongolab.com:47742/exam')
var db = require('./schema/db');
var db1 = require('./schema/questionschema');
var admin = require('./controllers/admin');
var user_det = require('./controllers/user');
var swig=require('swig');
var session = require('express-session');
//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
    res.send(401);
  else
    next();
};
//==================================================================

// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//==================================================================
// routes
app.get('/', function(req, res){
  //console.log(req.session.username+'sessions et')
  res.render('index', { title: 'Express' });
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});
//==================================================================

//==================================================================
// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});


app.get('/addCategory', admin.addcategory);
app.post('/deleteCategory', admin.deleteCategory);
app.post('/deleteQuestion', admin.deleteQuestion);
app.post('/edit_Category/:id', admin.edit_Category_id);
app.post('/show_question/:id', admin.show_question_id);
app.post('/show_question/:id', admin.show_question_id);
app.post('/edit_question/:id', admin.edit_question_id);
app.post('/editCategory/:id', admin.editCategory_id);
app.post('/editQuestion_details/:id', admin.editQuestion_details_id);
app.post('/addCateogrydetails', admin.addCateogrydetails);
app.post('/addQuestion',admin.addQuestion);
app.get('/viewCategory', admin.viewCategory);



app.post('/user_login',user_det.check_login);
app.post('/registration',user_det.registration);

app.get('/entrypage',user_det.getAllquestions);
//==================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
