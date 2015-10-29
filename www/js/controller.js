angular.module('uno.controllers', []).
    controller('loginCtrl', function ($scope, $http, $filter,$state,LoginService,$ionicPopup,CredentialsValidationService) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {};
        $scope.validate = CredentialsValidationService;
        $scope.signIn = function(user)
        {
        	if($scope.validate.loginCredValidate(user))
        	{
        		message={title:'Login failed!',template:"Invalid credentials"};
        		$scope.validate.loginFaliedAlert(message);
        	}
        	LoginService.loginUser(user.username, user.password).success(function(data) {
            $state.go('tabs.home');
	        }).error(function(data) {
	            message={title:'Login failed!',template:"Invalid credentials"};
        		$scope.validate.loginFaliedAlert(message);
	        });	
        }
    })

    .controller('signupCtrl', function ($scope, $http, $filter,$state,SignUpService,$ionicPopup,CredentialsValidationService) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {};
        $scope.validate = CredentialsValidationService
        $scope.signUp = function(user)
        {
	        var cred = $scope.validate.signUpCredValidate(user);
	        if(cred=="valid")
        	{
            	SignUpService.signUpUser(user).success(function(data) {
	            $state.go('tabs.home');
		        }).error(function(data) {
		            message={title:'Sign Up failed!',template:"Invalid Credentials"};	
		    		$scope.validate.loginFaliedAlert(message);
		        });	
		    }
		    else if(cred=="missmatch")
		    {
		    	var message={title:'Sign Up failed!',template:"Passwords dont match"};
		    	$scope.validate.loginFaliedAlert(message);
		    }
		    else
		    {
		    	message={title:'Sign Up failed!',template:"Invalid Credentials"};	
		    	loginFaliedAlert(message);
		    }
		}
    })
    .controller('homeTabCtrl', function ($scope, $http, $filter) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {};

        $scope.signUp = function(user)
        {

        }
    });