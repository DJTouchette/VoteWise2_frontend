'use strict'; // This allows helpfull errors to be thrown, and doesn't allow you to get away with not assigning variables
angular.module('myApp.view1', ['ngRoute']) // This is using the route provider, and passing in the static partial in this case myApp.view1

.config(['$routeProvider', function($routeProvider) { // Here were configuering the route. Were passing $routeProvider, and a function.
  $routeProvider.when('/view1', { // Were telling $routeProvider when it sees '/view1' (http://localhost:8000/view1)
    templateUrl: 'view1/view1.html', // To load this partial
    controller: 'View1Ctrl' // And this is the controller for '/view1'
  });
}])
//           parameter1   parameter2
.controller('View1Ctrl', ['$scope','$http', function ($scope, $http) { // We are making a controller specific to this view anything you attach to $scope ( $scope.zip = data ) you can use in the view ( view1.html )
                                                                      // The first parameter is the name of the controller, the second is an array. The array says hey, here from angular were gonna need to use $http ( server request )
                                                                      // ans $scope, wich data we can presist to the view
    $http.get('http://localhost:8080/geodivpa/zip/15012') // We're using the $http service from angular to call the API
                        //param1 param2   param3  param4
        .success(function( data, status, headers, config ) { // This is saying if you come back with a success ( https://en.wikipedia.org/wiki/List_of_HTTP_status_codes ) anything thats 2xx ( 200-299 )
                                                            // Also take a look at our API errors ( http://djtouchette.github.io/slate/?angular#errors )

          console.log( data );                             // Here im just printing these values out so you can see
          console.log( status );                          //there value. ( Go to the webpage in Chrome, hit cmd + alt + i ) Click console tab.
          console.log( headers );
          console.log( config );

          $scope.zip = data;                               // Make the data availible for the view
        })
        .error(function(data, status, headers, config) { // Here were saying on error
          console.log( data );                          // for now were just gonna log it to the console
    });
}]);



// param1
// The data that has come back from the request
// param2
// status ( 2xx, 3xx, 4xx, 5xx )
// param3
// Headers are sent with every request and usually contains info about the content or authorization. Check out our API ( http://djtouchette.github.io/slate/?angular#admin ) 
