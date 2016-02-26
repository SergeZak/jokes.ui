angular.module('myApp.auth', [])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth',
                views: {
                    'jokesContent': {
                        templateUrl: "view_auth/auth.html",
                        controller: 'AuthCtrl as auth'
                    }
                }
            })
    }])

    .controller('AuthCtrl', ['$auth', '$state', '$http', '$rootScope', function($auth, $state, $http, $rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function(data) {
                $http.get('http://jokes.proj/api/v1/authenticate/user')
                    .success(function(response){
                        var user = JSON.stringify(response.user);
                        localStorage.setItem('user', user);
                        $rootScope.currentUser = response.user;
                        $state.go('jokes');
                    })
                    .error(function(){
                        vm.loginError = true;
                        vm.loginErrorText = error.data.error;
                        console.log(vm.loginErrorText);
                    })
            });
        }

    }]);