/**
 * Created by Eugene on 15/12/10.
 */
'use strict';

var msFilters = angular.module('ms.filters', []);
msFilters.filter('add', ['version', function(version) {
    return function(text) {
        return text+ " "+ "'addFilter'"
    };
}]);