angular.module('myApp.jokes', [])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('jokes', {
                url: '/jokes',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'auth'
                    }
                },
                views: {
                    'jokesContent': {
                        templateUrl: "view_jokes/jokes.html",
                        controller: 'JokesCtrl as jokes'
                    }
                }
            })
    }])

    .controller('JokesCtrl', ['$http', '$auth', '$rootScope','$state', '$q' , function($http, $auth, $rootScope, $state, $q) {

        var vm = this;

        vm.jokes = [];
        vm.error;
        vm.joke;

        $http.get('http://jokes.proj/api/v1/jokes').success(function(jokes){
            console.log(jokes);
            vm.jokes = jokes.data;
        }).error(function(error){
            vm.error = error;
        })


        vm.addJoke = function() {

            $http.post('http://jokes.proj/api/v1/jokes', {
                body: vm.joke,
                user_id: $rootScope.currentUser.id
            }).success(function(response) {
                // console.log(vm.jokes);
                // vm.jokes.push(response.data);
                vm.jokes.unshift(response.data);
                console.log(vm.jokes);
                vm.joke = '';
                // alert(data.message);
                // alert("Joke Created Successfully");
            }).error(function(){
                console.log("error");
            });
        };

        vm.updateJoke = function(joke){
            console.log(joke);
            $http.put('http://jokes.proj/api/v1/jokes/' + joke.joke_id, {
                body: joke.joke,
                user_id: $rootScope.currentUser.id
            }).success(function(response) {
                // alert("Joke Updated Successfully");
            }).error(function(){
                console.log("error");
            });
        }


        vm.deleteJoke = function(index, jokeId){
            console.log(index, jokeId);

            $http.delete('http://jokes.proj/api/v1/jokes/' + jokeId)
                .success(function() {
                    vm.jokes.splice(index, 1);
                });;
        }


    }]);