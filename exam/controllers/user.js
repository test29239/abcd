var db2 = require('../schema/user');
var db = require('../schema/db');
var db1 = require('../schema/questionschema');


exports.check_login=function(req,res){

	//req.session.username=req.body.username
  	console.log(req.body.username)
  	db2.find({username: req.body.username},function(err, docs){
  		if(err)throw err;
	      console.log(docs)
	      if(docs.length>0){
	      	req.session.username=docs[0].username;
	      		console.log(req.session.username+'sessions et')
	      	res.send(docs)
	      }
    });
}

exports.registration=function(req,res){
console.log(req.session.username+'sessions et')
   var reg_details = new db2({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    reg_details.save(function(err,data) {
      if (err) throw err;
      console.log(req.data)
      res.send(req.data)
    });
}

exports.getAllquestions=function(req,res){
   db1.find({},function(err, docs){
       res.send(docs);
  });
}