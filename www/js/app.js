// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('uno', ['ionic','uno.controllers','uno.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //Parse initilization
    Parse.initialize("8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB", "TJhMjuUMNTqxrHnEz6gOcx82lkTpFMKfvxIlnLEs");

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();

    }
  });

})
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state('login',{
    url:'/login',
    templateUrl:'/templates/login.html',
    controller:'loginCtrl'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller:'signupCtrl'
    })
  .state('tabs',{
      url:'/tabs',
      abstract:true,
      templateUrl:'templates/tabs.html'
  })
  .state('tabs.home',{
      url:'home',
      views:{
        'home-tab':{
          templateUrl:'templates/home.html',
          controller:'homeTabCtrl'
        }
      }
  });
  $urlRouterProvider.otherwise('/login');

})
