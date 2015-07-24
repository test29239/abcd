'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('app', ['ngResource', 'ngRoute'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
    //================================================

    //================================================
    // Define all the routes
    //================================================
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/user', {
        templateUrl: 'views/user_login.html',
        controller: 'UserCtrl'
        
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/addCategory', {
        templateUrl: 'views/addCategory.html',
        controller: 'addCategory'
      })
       .when('/editCategory/:id', {
        templateUrl: 'views/editCategory.html',
        controller: 'editCategory'
      })
       .when('/editQuestion/:id', {
        templateUrl: 'views/editQuestions.html',
        controller: 'editQuestion'
      })
        .when('/questions', {
        templateUrl: 'views/questions.html',
        controller: 'addQuestions'
      })
      .when('/viewQuestions', {
        templateUrl: 'views/viewQuestions.html',
        controller: 'addQuestions'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserCtrl'
      })
      .when('/entrypage', {
        templateUrl: 'views/entrypage.html',
        controller: 'UserCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
    //================================================

  }) // end of config()
  .run(function($rootScope, $http,$location){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };



    /**********************************************************************
 * Adding,Editing,Deleting category
 **********************************************************************/
    $rootScope.addCategory=function(){
    // console.log("Button clicked.");
      $location.url('/addCategory');
    }

     $rootScope.addQuestion=function(){
     //console.log("Button clicked to add questions.");
      $location.url('/questions');
    }


   $rootScope.viewQuestion=function(){
     //console.log("Button clicked to view  questions.");
      $location.url('/viewQuestions');
    }


    $rootScope.registration=function(){
     //console.log("register");
      $location.url('/register');
    }
   /**********************************************************************
 * End of category adding,editing,deleting controller
 **********************************************************************/
   
  });


/**********************************************************************
 * Login controller
 **********************************************************************/
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');


    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };

});



/**********************************************************************
 * Admin controller
 **********************************************************************/
app.controller('AdminCtrl', function($scope, $http) {
  // List of users got from the server
  $scope.users = [];

  // Fill the array to display it in the page
  $http.get('/users').success(function(users){
    for (var i in users)
      $scope.users.push(users[i]);
  });
});



//adding single category 
app.controller('addCategory', function($scope, $http, $location,$route,$resource) { 
    $scope.details = [];
     $scope.text=[];
    $scope.addCategoryDetail=function(){
     //console.log("addCategoryDetail."+$scope.text);
       $http.post('/addCateogrydetails', {
          categoryName: $scope.text
        })
        .success(function(user){
          $scope.details.push($scope.text);
          $route.reload();
        })
        .error(function(){ $location.path('/login');});
    }

    // Fill the array to display it in the page
    $http.get('/addCategory').success(function(cat_name){
      for (var i in cat_name)
        $scope.details.push(cat_name[i]);
    });


    $scope.edit_category=function(index,id,cat_name){

      //console.log(cat_name+'----'+id)
        /*
        $http.post('/updateCategory', {
          categoryId: id
        })
        .success(function(user){
           $scope.details.splice(index, 1);
          $route.reload();
        })
       .error(function(){ $location.path('/addCategory');});*/
        $location.url('/editCategory/:'+id);
        

    }



    $scope.remove_category=function(index,id){
      //console.log(index+'----'+id)
      $http.post('/deleteCategory', {
        categoryId: id
      })
      .success(function(user){
         $scope.details.splice(index, 1);
        $route.reload();
      })
     .error(function(){ $location.path('/addCategory');});
    }
});


app.controller('editCategory', function($scope, $http,$routeParams, $location) {
  // List of users got from the server
  $scope.details = [];
   $scope.text = [];
  var data=$routeParams.id;
  //console.log(data.split(':')[1]+'dfghjkl000000000000000000')
  // Fill the array to display it in the page
 
      $http.post('/edit_Category/:id',{ 
        categoryId : $routeParams.id.split(':')[1]
      }).success(function(users){
        //console.log('abccccccc'+users)
        for (var i in users)
          $scope.text.push(users[i]);
      });


 $scope.edit_data=function(){
     //console.log("editCategoryDetail."+$scope.text[0].category_name);


       $http.post('/editCategory/:id', {
          categoryId : data.split(':')[1],
          categoryName: $scope.text[0].category_name
        })
        .success(function(user){
          $location.path('/addCategory');
          /*$scope.details.push($scope.text);
          $route.reload();*/
        })
        //.error(function(){ $location.path('/login');});
    }
});



app.controller('addQuestions', function($scope, $http,$routeParams, $location,$route,$resource) {
  $scope.cat_details=[];
  $scope.question_details=[];
  $scope.details=[];
  $http.get('/addCategory').success(function(cat_name){
    //console.log(JSON.stringify(cat_name)+'list of category names')
      for (var i in cat_name)
        $scope.cat_details.push(cat_name[i]);
    });
  $scope.add_question_data=function(){
  
        $http.post('/addQuestion/', {
          categoryId:     $scope.selectedCategory._id,
          categoryName:   $scope.selectedCategory.category_name,
          question:       $scope.question,
          c1:             $scope.choise1,
          c2:             $scope.choise2,
          c3:             $scope.choise3,
          c4:             $scope.choise4,
          correct_answer: $scope.choosing_answer,
          date_created: new Date()
        })
        .success(function(user){
          $location.path('/admin');
          /*$scope.details.push($scope.text);
          $route.reload();*/
        })
  }

  $http.get('/viewCategory').success(function(que_name){
    //console.log(JSON.stringify(que_name)+'list of questions added into mongo')
      for (var i in que_name)
        $scope.question_details.push(que_name[i]);
    });

   $scope.edit_question=function(index,id,cat_name){
      //console.log(cat_name+'----'+id)
      $location.url('/editQuestion/:'+id);
    }
    $scope.remove_question=function(index,id){
      //console.log(index+'----'+id)
      $http.post('/deleteQuestion', {
        categoryId: id
      })
      .success(function(user){
         $scope.details.splice(index, 1);
        $route.reload();
      })
     .error(function(){ $location.path('/addCategory');});
    }
});






app.controller('editQuestion', function($scope, $http,$routeParams, $location) {
  // List of users got from the server
  $scope.cat_details=[];
  $scope.details = [];
  $scope.text = [];
  var data=$routeParams.id;
    $http.get('/addCategory').success(function(cat_name){
      //console.log(JSON.stringify(cat_name)+'list of category names')
      for (var i in cat_name)
        $scope.cat_details.push(cat_name[i]);
    });
 // console.log(data.split(':')[1]+'dfghjkl000000000000000000')
  // Fill the array to display it in the page
 
    $http.post('/show_question/:id',{ 
      categoryId : $routeParams.id.split(':')[1]
    }).success(function(users){
      //console.log('abccccccc'+users)
      for (var i in users)
        $scope.text.push(users[i]);
    });


 $scope.edit_singlequestion=function(){
     //console.log("edit_singlequestion."+$scope.text[0].category_name);
       $http.post('/editQuestion_details/:id', {
          categoryId : data.split(':')[1],
          question_name: $scope.text[0].question_name,
          choise1: $scope.text[0].choise1,
          choise2: $scope.text[0].choise2,
          choise3: $scope.text[0].choise3,
          choise4: $scope.text[0].choise4,
          correct_answer: $scope.text[0].correct_answer
        })
        .success(function(user){
          $location.path('/admin');
         
        })
        
    }
});




// --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// user Login and displaying the details of quiz
// --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------





app.controller('UserCtrl', function($scope, $rootScope,$http,$location,$route) {
  // List of users got from the server
  $scope.question_details=[];
  $scope.login_user=function(){
    //$scope.username
    $http.post('/user_login', {
          username: $scope.username,
          password: $scope.password
        })
        .success(function(user){
          //console.log(user.length)
           if(user.length>0){
              $rootScope.message = 'Authentication successful!';
              $location.url('/entrypage');
           }else{
              $rootScope.message = 'Authentication failed.';
             $location.url('/user');
           }
         
        })/*.error(function(){
          // Error: authentication failed
          $rootScope.message = 'Authentication failed.';
          $location.url('/login');
        });*/
  }
  $scope.register=function(data){
   // console.log(data.name)
     $http.post('/registration', {
          username: data.name,
          email: data.email,
          password: data.password
        })
        .success(function(user){
          $location.path('/user');
         
        })
  }

   $http.get('/entrypage').success(function(que_details){
     // console.log(JSON.stringify(que_details)+'list of que_details names')
      for (var i in que_details)
        $scope.question_details.push(que_details[i]);
    });
});