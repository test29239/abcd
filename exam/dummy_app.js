var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exam');
var db = require('./schema/db');
var db1 = require('./schema/questionschema');
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
  req.session.name="abbbbcd"
  console.log(JSON.stringify(req.session)+'dfghjkl;'+req.session.name)
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


app.get('/addCategory', function(req, res){
        db.find({},function(err, docs){
             res.send(docs);
        });
});

app.post('/deleteCategory', function(req, res){
    db.remove({_id: req.body.categoryId}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.send(result)
            //db.close();
        });
});



app.post('/deleteQuestion', function(req, res){
    db1.remove({_id: req.body.categoryId}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.send(result)
            //db.close();
        });
});

app.post('/edit_Category/:id', function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id')
             res.send(docs);
        });
});

app.post('/show_question/:id', function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db1.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id data of question details')
             res.send(docs);
        });
});


app.post('/edit_question/:id', function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db1.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id question')
             res.send(docs);
        });
});
app.post('/editCategory/:id', function(req, res){
    console.log(JSON.stringify(req.body)+'fghjkl;')
    db.update(
       { '_id' :  req.body.categoryId }, 
       { $set: { 'category_name': req.body.categoryName } },
       function (err, result) {
          if (err) throw err;
          res.send(result);
       })
});




app.post('/editQuestion_details/:id', function(req, res){
    console.log(JSON.stringify(req.body)+'fghjkl;')
    db1.update(
       { '_id' :  req.body.categoryId }, 
       { $set: { 
          'question_name': req.body.question_name ,
          'choise1':req.body.choise1,
          'choise2':req.body.choise2,
          'choise3':req.body.choise3,
          'choise4':req.body.choise4,
          'correct_answer':req.body.correct_answer,
      } },
       function (err, result) {
          if (err) throw err;
          res.send(result);
       })
});

app.post('/addCateogrydetails', function(req, res){
    var cName = new db({
      category_name: req.body.categoryName
    });
    cName.save(function(err,data) {
      if (err) throw err;
      console.log(req.data)
      res.send(req.data)
    });
 
});


app.post('/addQuestion', function(req, res){
    var QName = new db1({
      question_name   :   req.body. question,
      category_name   :   req.body.categoryName,
      choise1         :   req.body.c1,
      choise2         :   req.body.c2,
      choise3         :   req.body.c3,
      choise4         :   req.body.c4,
      correct_answer  :   req.body.correct_answer
    });
    QName.save(function(err,data) {
      if (err) throw err;
      console.log(req.data+'questions added successfully')
      res.send(req.data)
    });
 
});

app.get('/viewCategory', function(req, res){
        db1.find({},function(err, docs){
             res.send(docs);
        });
});

//==================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
