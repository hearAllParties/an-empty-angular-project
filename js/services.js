/**
 * Created by Eugene on 15/12/10.
 */
'use strict';

var msServices = angular.module('ms.services', []);

msServices.factory('msApi', ['$injector', function ($injector) {
    var $interpolate = $injector.get('$interpolate');
    var apiStore = {};
    return function msApi(name, id) {
        var api = apiStore[name];
        if (api) {
            var exp = $interpolate(api);
            api = exp({id: id});
        } else {
            api = '';
        }
        return api;
    }
}]);

/**
 * 服务器请求
 * */
msServices.factory('http', ['$http', '$timeout', function ($http, $timeout) {
    function httpFactory(type) {
        return function (api, data) {
            if (type == 'get') api = api + "?" + parseQuery(data);
            return $http({method: type, url: api, data: data, timeout: 20000, responseType: "json"})
                .error(function (res, errCode) {
                    console.log(res, errCode)
                }).success(function (data) {
                    if (data.auth == 0)alert("您没有该操作的权限")
                });
        }
    }

    return {
        httpFactory: httpFactory,
        get: httpFactory('get'),
        post: httpFactory('post')
    };
}]);
/**
 * 格式化查询条件
 * */
function parseQuery(query) {
    var ret = [], q = {};
    if (angular.isArray(query)) {
        angular.forEach(query, function (val) {
            angular.extend(q, val);
        })
    } else {
        q = query;
    }
    angular.forEach(q, function (value, key) {
        if (key != "silent" && key != "skip") {
            this.push(key + '=' + encodeURIComponent(value));
        }
    }, ret);
    return ret.join("&");
}

/**
 * 滚动到锚点 [jsgen anchorScroll](http://git.oschina.net/zensh/jsgen/blob/master/static/src/js/services.js)
 * */
msServices.factory('goToAnchor', ['$location', function ($location) {
    function toView(element, top, height) {
        var winHeight = $(window).height();

        element = $(element);
        if (element.length == 0) {
            return
        }
        height = height > 0 ? height : 0;
        $('html, body').animate({
            scrollTop: top ? (element.offset().top - height) : (element.offset().top + element.outerHeight() + height - winHeight)
        }, {
            duration: 200,
            easing: 'linear'
        });
    }

    return function goToAnchor(anchor) {
        $location.hash(anchor);
        toView($('#' + anchor), 'top', 0);
    }
}]);
