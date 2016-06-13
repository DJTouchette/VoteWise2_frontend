'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http', function ($scope, $http) {
  $scope.master = {};

     $scope.signUp = function( user ) {

    $http({
      method: 'POST',
      url: 'http://localhost:8080/user/signup',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data:{
        name: user.name,
        password: user.password,
        city: user.city,
        street: user.street,
        zip: user.zip,
        username: user.username,
        email: user.email
      }
  }).then(function successCallback(response) {
    $scope.response = response;
  }, function errorCallback(response) {
    $scope.response = response;
  });

     };
     $scope.reset = function() {
       $scope.user = angular.copy($scope.master);
     };

     $scope.reset();

     $scope.signIn = function ( user ) {
       console.log( user );

       $http({
         method: 'POST',
         url: 'http://localhost:8080/authenticate',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         transformRequest: function(obj) {
           var str = [];
           for(var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
           return str.join("&");
         },
         data:{
           name: user.name,
           email: user.email
         }
     }).then(function successCallback(response) {
       $scope.token = response.data.token;
     }, function errorCallback(response) {
       $scope.signInErr = response;
     });

     }

  $scope.createThread = function ( user ) {
    console.log( user );
    console.log( $scope.token );
    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/thread',
      headers: {'x-access-token': $scope.token},
      // transformRequest: function(obj) {
      //   var str = [];
      //   for(var p in obj)
      //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      //   return str.join("&");
      // },
      data:{
        title: user.threadTitle
      }
  }).then(function successCallback(response) {
    $scope.threadSuccess = true;
    $scope.newThread = user.threadTitle;
    $scope.threadId = response.data.thread._id;
    console.log( $scope.threadId );
  }, function errorCallback(response) {
    $scope.threadResponse = response;
  });
  }

  $scope.createPost = function ( user ) {

    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/thread/'+ $scope.threadId + '/post',
      headers: {'x-access-token': $scope.token},
      // transformRequest: function(obj) {
      //   var str = [];
      //   for(var p in obj)
      //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      //   return str.join("&");
      // },
      data:{
        content: user.postContent
      }
  }).then(function successCallback(response) {
    $scope.postSuccess = true;
    $scope.newPost = user.postContent;
    $scope.postId = response.data.post._id;
    console.log( $scope.threadId );
  }, function errorCallback(response) {
    $scope.postResponse = response;
  });
  }

  $scope.getThread = function ( user ) {

    $http({
      method: 'GET',
      url: 'http://localhost:8080/api/post/thread/'+ $scope.threadId,
      headers: {'x-access-token': $scope.token}
      // transformRequest: function(obj) {
      //   var str = [];
      //   for(var p in obj)
      //   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      //   return str.join("&");
      // },

  }).then(function successCallback(response) {
    $scope.thread = response.data;

  }, function errorCallback(response) {
    $scope.grandThreadErr = response;
  });
  }


}]);
