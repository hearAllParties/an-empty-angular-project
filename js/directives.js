/**
 * Created by Eugene on 15/12/10.
 */
'use strict';

var msDirectives = angular.module('ms.directives', []);

msDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, element, attrs, ngModel) {
        element.text(version);
    };
}]);
msDirectives.directive('test',function(version) {
    return {
        restrict: "AE",
        template: "<h1>test</h1>",
        replace: true
    }
});