	angular.module('quizApp',['ngResources','ngRoute'])
	.config(function($routeProvider,$locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider
		    .when('/', {
		      templateUrl: '/index.html', 
		      controller: 'ctrl1'
		    })
		   /* .when('/tags/:tagId', {
		      templateUrl: '/partials/template2.html', 
		      controller:  'ctrl2'
		    })
		    .when('/another', {
		      templateUrl: '/partials/template1.html', 
		      controller:  'ctrl1'
		    })*/
		    .otherwise({ redirectTo: '/' });
	}).controller('ctrl1',function($scope,$resource){
       		$scope.addCategory=function(){
       			 console.log("Button clicked.")
       			 //alert($scope.Message)
       		}
	})
	


<html ng-app="quizApp">
	<head>
		<title>example</title>
 	</head>
	<body >
		<h1>hi how are u</h1>
		<div >
			<button ng-click="addCategory()">Add Cartegory</button><br>
			<button ng-click="viewCategory()">View Category</button><br>
			<button ng-click="addQuestion()">Add Quiz Questions</button><br>
			<button ng-click="viewQuestion()">View Quiz Questions</button><br>
		</div>
		<div ng-view>

		</div>
	</body>


<!-- <script type="text/javascript" src="javascripts/angular.min.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js
"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-resource.min.js
"></script>

<script>

	
	

</script>
</html>















	'use strict';

		angular.module('quizApp', [
		  'ui.router'
		]).config(function($stateProvider, $urlRouterProvider) {

		    $urlRouterProvider.otherwise('/');
		    
		    $stateProvider.state('app', {
		        url: '/',
		        templateUrl: 'index.html',
		        controller: 'AppCtrl'
		    });
		    
		}).controller('AppCtrl',function($scope,$resource){
		       		$scope.addCategory=function(){
		       			 console.log("Button clicked.")
		       			 //alert($scope.Message)
		       		}
		})



var theaterApp = angular.module("theaterApp", []);
 
//Do configuration and routing here
theaterApp.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when("/",{
            controller: "MoviesCtrl",
            templateUrl: "js/views/moviesView.html"
        });
 
    $routeProvider.otherwise({"redirectTo": "/"});  //.otherwise("/"); //does not work
});
