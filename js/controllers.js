/**
 * Created by Eugene on 15/12/10.
 */
var msControllers = angular.module('ms.controllers', ['ngCookies']);
msControllers.controller('MainCtrl', ['$scope', 'userName', '$cookies', function($scope, userName, $cookies){
    console.log('this MainCtrl');
    console.log(userName);
    $cookies.put('a', 1);
    console.log($cookies.get('a'))
}]);