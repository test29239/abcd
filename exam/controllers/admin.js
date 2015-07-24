var db = require('../schema/db');
var db1 = require('../schema/questionschema');
exports.addcategory = function(req, res) {
  db.find({},function(err, docs){
       res.send(docs);
  });
};



exports.deleteCategory = function(req, res) {
  db.remove({_id: req.body.categoryId}, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result);
    res.send(result)
    //db.close();
  });
};

exports.deleteQuestion=function(req, res){
    db1.remove({_id: req.body.categoryId}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.send(result)
            //db.close();
        });
};

exports.edit_Category_id= function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id')
             res.send(docs);
        });
};

exports.show_question_id= function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db1.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id data of question details')
             res.send(docs);
        });
};


exports.edit_question_id=function(req, res){
  console.log(req.body.categoryId+'jplkasdlkasj')
        db1.find({_id: req.body.categoryId},function(err, docs){
          console.log(docs+'machi single id question')
             res.send(docs);
        });
};
exports.editCategory_id=function(req, res){
    console.log(JSON.stringify(req.body)+'fghjkl;')
    db.update(
       { '_id' :  req.body.categoryId }, 
       { $set: { 'category_name': req.body.categoryName } },
       function (err, result) {
          if (err) throw err;
          res.send(result);
       })
};

exports.editQuestion_details_id=function(req, res){
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
};

exports.addCateogrydetails=function(req, res){
    var cName = new db({
      category_name: req.body.categoryName
    });
    cName.save(function(err,data) {
      if (err) throw err;
      console.log(req.data)
      res.send(req.data)
    });
 
};


exports.addQuestion= function(req, res){
    var QName = new db1({
      question_name   :   req.body. question,
      category_name   :   req.body.categoryName,
      choise1         :   req.body.c1,
      choise2         :   req.body.c2,
      choise3         :   req.body.c3,
      choise4         :   req.body.c4,
      correct_answer  :   req.body.correct_answer,
      date_created    :   req.body.date_created
    });
    QName.save(function(err,data) {
      if (err) throw err;
      console.log(req.data+'questions added successfully')
      res.send(req.data)
    });
 
};

exports.viewCategory=function(req, res){
        db1.find({},function(err, docs){
             res.send(docs);
        });
};
