angular.module('uno.controllers', ['ionic','ionic-ratings']).
    controller('loginCtrl', function ($scope, $http, $filter,$state,$localStorage, $sessionStorage,userFactory,CredentialsValidationService) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {};
        $scope.validate = CredentialsValidationService;
        $scope.logOut = function()
		{
			LoginOutService.loginOutUser();
			$state.go('login');
		}
        $scope.signIn = function(user)
        {
        	if($scope.validate.loginCredValidate(user))
        	{
        		message={title:'Login failed!',template:"Invalid credentials"};
        		$scope.validate.loginFaliedAlert(message);
        	}
        	else
        	{
        		userFactory.logIn(user.username,user.password).success(function(data) {
        			$sessionStorage.user = data;
			        $state.go('tab.teaReview');
			    })
			    .error(function(data) {
		            message={title:'Login failed!',template:"Invalid credentials"};
	        		$scope.validate.loginFaliedAlert(message);
		        });	
	    	}
        }
    })

    .controller('signupCtrl', function ($scope, $http, $filter,$state,$localStorage, $sessionStorage,userFactory,$ionicPopup,CredentialsValidationService) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {
        	type:"student"
        };
        $scope.validate = CredentialsValidationService
        $scope.signUp = function(user)
        {
	        var cred = $scope.validate.signUpCredValidate(user);
	        if(cred=="valid")
        	{
            	userFactory.signUp(user).success(function(data) {
            		$sessionStorage.user = data;
	            	$state.go('tab.teaReview');
		        })
		        .error(function(data) {
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
		    	$scope.validate.loginFaliedAlert(message);
		    }
		}
		$scope.logOut = function()
		{
			LoginOutService.loginOutUser();
			$state.go('login');
		}
    })

	//Teachers Review Controllers
    .controller('teaReviewCtrl', function ($scope,$state, $http, $filter,$localStorage, $sessionStorage,ProfessorRatingsList) {

		
        //$scope.myService = MyService; // found in services.js
        $scope.user = {};
        $scope.profList = ProfessorRatingsList.getProfessorRatingList();
        $scope.rate = 3;
  		$scope.max = 5;

		$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}


    })
    .controller('particTeaReviewCtrl', function ($scope,$state,$stateParams, $http, $filter,$localStorage, $sessionStorage,ProfessorReviews,ProfessorRatingsList) {

        $scope.profData = JSON.parse($stateParams.profData); // found in services.js
        $scope.user = {};
        $scope.profList = ProfessorRatingsList.getProfessorRatingList();
        $scope.profReviewsList = ProfessorReviews.getProfessorReviewsList($scope.profData.profId);
        $scope.rate = 3;
  		$scope.max = 5;

		$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}

    })



    //Courses Review Controllers
    .controller('couReviewCtrl', function ($scope,$state, $http, $filter,$localStorage, $sessionStorage,CoursesRatingsList) {

        //$scope.myService = MyService; // found in services.js
        $scope.user = {};
        $scope.couList = CoursesRatingsList.getCoursesRatingList();
        $scope.rate = 3;
  		$scope.max = 5;

		$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}


    })
    .controller('particCouReviewCtrl', function ($scope,$state,$stateParams, $http, $filter, $localStorage, $sessionStorage,CoursesReviews,CoursesRatingsList) {

        $scope.couData = JSON.parse($stateParams.couData); // found in services.js
        $scope.user = {};
        $scope.couList = CoursesRatingsList.getCoursesRatingList();
        $scope.couReviewsList = CoursesReviews.getCoursesReviewsList($scope.couData.couId);
        $scope.rate = 3;
  		$scope.max = 5;

		$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}

    })


    //Navigate Countrollers
    .controller('navigateCtrl', function ($scope,$state,$stateParams, $http, $filter, $ionicLoading,$localStorage, $sessionStorage) {

        $scope.user = {};
        
		$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}
		$scope.initMap = function() {
		  var origin_place_id = null;
		  var destination_place_id = null;
		  var travel_mode = google.maps.TravelMode.WALKING;
		  var map = new google.maps.Map(document.getElementById('map'), {
		    mapTypeControl: false,
		    center: {lat: -33.8688, lng: 151.2195},
		    zoom: 13
		  });
		  var directionsService = new google.maps.DirectionsService;
		  var directionsDisplay = new google.maps.DirectionsRenderer;
		  directionsDisplay.setMap(map);

		  //var origin_input = document.getElementById('origin-input');
		  var destination_input = document.getElementById('destination-input');
		  //var modes = document.getElementById('mode-selector');

		  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
		  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
		  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

		  //var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
		  //origin_autocomplete.bindTo('bounds', map);
		  //var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
		  //destination_autocomplete.bindTo('bounds', map);

		  // Sets a listener on a radio button to change the filter type on Places
		  // Autocomplete.
		  
		  $scope.expandViewportToFitPlace = function(map, place) {
		    if (place.geometry.viewport) {
		      map.fitBounds(place.geometry.viewport);
		    } else {
		      map.setCenter(place.geometry.location);
		      map.setZoom(17);
		    }
		  }

		  /*origin_autocomplete.addListener('place_changed', function() {
		    var place = origin_autocomplete.getPlace();
		    if (!place.geometry) {
		      window.alert("Autocomplete's returned place contains no geometry");
		      return;
		    }
		    $scope.expandViewportToFitPlace(map, place);

		    // If the place has a geometry, store its place ID and route if we have
		    // the other place ID
		    origin_place_id = place.place_id;
		    $scope.route(origin_place_id, destination_place_id, travel_mode,
		          directionsService, directionsDisplay);
		  });

		  destination_autocomplete.addListener('place_changed', function() {
		    var place = destination_autocomplete.getPlace();
		    if (!place.geometry) {
		      window.alert("Autocomplete's returned place contains no geometry");
		      return;
		    }
		    $scope.expandViewportToFitPlace(map, place);

		    // If the place has a geometry, store its place ID and route if we have
		    // the other place ID
		    destination_place_id = place.place_id;
		    $scope.route(origin_place_id, destination_place_id, travel_mode,
		          directionsService, directionsDisplay);
		  });*/
			
		  $scope.route = function(origin_place_id, destination_place_id, travel_mode,
		                 directionsService, directionsDisplay) {
		    if (!origin_place_id || !destination_place_id) {
		      return;
		    }
		    directionsService.route({
		      origin: {'placeId': origin_place_id},
		      destination: {'placeId': destination_place_id},
		      travelMode: travel_mode
		    }, function(response, status) {
		      if (status === google.maps.DirectionsStatus.OK) {
		        directionsDisplay.setDirections(response);
		      } else {
		        window.alert('Directions request failed due to ' + status);
		      }
		    });
		  }
		}

		$scope.mapCreated = function(map) {
	    $scope.map = map;
	  	};

		  $scope.centerOnMe = function () {
		    console.log("Centering");
		    if (!$scope.map) {
		      return;
		    }

		    $scope.loading = $ionicLoading.show({
		      content: 'Getting current location...',
		      showBackdrop: false
		    });

		    navigator.geolocation.getCurrentPosition(function (pos) {
		      console.log('Got pos', pos);
		      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		      $scope.loading.hide();
		    }, function (error) {
		      alert('Unable to get location: ' + error.message);
		    });
		  };
	})

	//Add Review Countrollers
	.controller('addReviewCtrl', function ($scope,$state,$stateParams, $http, $filter, $ionicLoading,$localStorage, $sessionStorage,professorFactory) {
		$scope.selected = "";
		$scope.reviewRating = 2;
		$scope.reviewText={};
		professorFactory.getProfList().success(function(data) {
			$scope.profList = data.results;
	    })
	    .error(function(data) {
            message={title:'Load Data Failed',template:"Professor Details not available"};
    		$scope.validate.loginFaliedAlert(message);
        });
        
        $scope.submitReview = function(profSelected)
        {
        	$scope.review = {
	        	user:$sessionStorage.user,
	        	type:"prof",
	        	rating:$scope.reviewRating,
	        	comments:$scope.reviewText.text,
	        	course_name:"",
	        	course_id:"",
	        	prof_name:profSelected.ProfName,
	        	prof_id:profSelected.objectId
        	}
         	professorFactory.submitProfReview($scope.review)
         	.success(function(data) {
				$scope.reviewText.text = "";
				$scope.ratingsObject.rating = 2;
				window.history.back()
			})
		    .error(function(data) {
	            message={title:'Review Failed',template:"Professor Review not submitted"};
	    		$scope.validate.loginFaliedAlert(message);
	        });   

        }
		$scope.ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  2,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    };
        $scope.ratingsCallback = function(rating) {
        	$scope.reviewRating = rating
        	console.log('Selected rating is : ', rating);
      	};

      	$scope.logOut = function()
		{
			$sessionStorage.user = "";
			$state.go('login');
		}

	});