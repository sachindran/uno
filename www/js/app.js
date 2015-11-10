// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('uno', ['ionic','uno.controllers','uno.services','uno.directives','ngStorage',"ngTouch", "angucomplete"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //Parse initilization
    Parse.initialize("8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB", "TJhMjuUMNTqxrHnEz6gOcx82lkTpFMKfvxIlnLEs");
    console.log("Parse initialized");

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
    templateUrl:'templates/login.html',
    controller:'loginCtrl'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller:'signupCtrl'
    })
  .state('tab',{
      url:'/tab',
      abstract:true,
      templateUrl:'templates/tabs.html'
  })
  //Teachers Review Routes
  .state('tab.teaReview',{
      url:'/teaReview',
      views:{
        'teaReview-tab':{
          templateUrl:'templates/teaReview.html',
          controller:'teaReviewCtrl'
        }
      }
  })
  .state('tab.teaReview-particTeaReview', {
      url: '/teaReview/:profData',
      views: {
        'teaReview-tab': {
          templateUrl: 'templates/particTeaReview.html',
          controller: 'particTeaReviewCtrl'
        }
      }
    })
  .state('tab.teaReview-addReview-proSelected', {
      url: '/teaReview/addReview/:profData',
      views: {
        'teaReview-tab': {
          templateUrl: 'templates/addReviews.html',
          controller: 'addReviewCtrl'
        }
      }
    })
  .state('tab.teaReview-addReview', {
      url: '/teaReview/addReview',
      views: {
        'teaReview-tab': {
          templateUrl: 'templates/addReviews.html',
          controller: 'addReviewCtrl'
        }
      }
    })


  //Courses Review Routes
  .state('tab.couReview',{
      url:'/couReview',
      views:{
        'couReview-tab':{
          templateUrl:'templates/couReview.html',
          controller:'couReviewCtrl'
        }
      }
  })
  .state('tab.couReview-particCouReview', {
      url: '/couReview/:couData',
      views: {
        'couReview-tab': {
          templateUrl: 'templates/particCouReview.html',
          controller: 'particCouReviewCtrl'
        }
      }
    })

  //Navigate Routes
  .state('tab.navigate',{
      url:'/navigate',
      views:{
        'navigate-tab':{
          templateUrl:'templates/navigate.html',
          controller:'navigateCtrl'
        }
      }
  });
  
  $urlRouterProvider.otherwise('/login');

})
