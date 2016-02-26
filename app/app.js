'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    // 'ngRoute',
    'ui.router',
    'myApp.jokes',
    'myApp.view2',
    'myApp.auth',
    'myApp.version',
    'satellizer'
])

    .run(function ($rootScope, $state, $auth) {

        $rootScope.logout = function() {
            $auth.logout().then(function() {
                localStorage.removeItem('user');
                $rootScope.currentUser = null;
                $state.go('auth');
            });
        }
        $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));
    })

    .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {
        $authProvider.loginUrl = 'http://jokes.proj/api/v1/authenticate';
        // $urlRouterProvider.otherwise('/view1');
        $urlRouterProvider.otherwise('/auth');
    }]);
