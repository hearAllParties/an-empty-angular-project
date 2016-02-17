'use strict';

var ms = angular.module('ms', [
    'ngRoute',
    'ms.filters',
    'ms.services',
    'ms.directives',
    'ms.controllers'
]);

ms.value('userName', 'Eugene');//全局变量
/*ms.config(['$routeProvider', function($routeProvider) {
 //TemplateURl相对于index.html路径
 $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
 $routeProvider.when('/view', {templateUrl: 'views/view.html', controller: 'ViewCtrl'});
 $routeProvider.otherwise({redirectTo: '/home'});
 }]);*/

ms.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    ms.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    }
});

ms.constant('app', {}).run(['app', '$injector', '$rootScope', function (app, $injector, $rootScope) {
    angular.extend(app, {
        $rootScope: $rootScope,
        $timeout: $injector.get('$timeout'),
        post: $injector.get('http').post,
        get: $injector.get('http').get,
        msApi: $injector.get('msApi'),
        goToAnchor: $injector.get('goToAnchor')
    })
}]);

ms.config(function ($routeProvider, $locationProvider) {
    var pageNames = [
        'login',        //登录
        'home',         //主页
        'view'         //view
    ];
    angular.forEach(pageNames, function (pageName) {
        $routeProvider.when('/' + pageName, {
            templateUrl: 'view/' + pageName + '.html',
            controller: upFirstCharacter(pageName) + 'Ctrl',
            /* resolve: {
             load: function ($q, $route, $rootScope) {
             var deferred = $q.defer();
             var dependencies = [
             //'./js/controllers/home.js'
             './js/controllers/' + pageName + '.js'
             ];
             //动态加载js
             $script(dependencies, function () {
             $rootScope.$apply(function () {
             deferred.resolve();
             });
             });
             return deferred.promise;
             }
             }*/
            resolve: ['$q','$rootScope', function($q, $rootScope) {
                var deferred = $q.defer();
                var dependencies = [
                    './js/controllers/' + pageName + '.js'
                ];
                //动态加载js
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        });
    });
    $routeProvider.otherwise({redirectTo: '/home'});
});
function upFirstCharacter(pageName) {
    var firstChar = pageName.slice(0, 1).toLocaleUpperCase();
    return firstChar + pageName.slice(1);
}