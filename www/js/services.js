angular.module('uno.services', [])
.service('LoginService', function($q) {
    return {
        loginUser: function(user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
           
            Parse.User.logIn(user.username, user.password, {
              success: function(user) {
                deferred.resolve('Welcome ' +  + '!');
              },
              error: function(user, error) {
                deferred.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              }
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('LoginOutService', function($q) {
    return {
        loginOutUser: function() {
            var currentUser = Parse.User.current();
                if (currentUser) {
                    // do stuff with the user
                    Parse.User.logOut();
                } 
        }
    }
})
.service('SignUpService', function($q) {
    return {
        signUpUser: function(userData) {
            var currentUser = Parse.User.current();
                if (currentUser) {
                    // do stuff with the user
                    Parse.User.logOut();
                } 

        //$q.preventDefault();
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            var user = new Parse.User();
            user.set("username",userData.username );
            user.set("password", userData.password);
            user.set("email", userData.email);
            user.set("name",userData.name);
            //user.set("type",userData.type);

            user.signUp(null, {
              success: function(user) {
                deferred.resolve('Welcome ' +  + '!');
              },
              error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                deferred.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              }
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }   
})
.service('CredentialsValidationService', function($ionicPopup){
    this.loginCredValidate = function(user)
    {
        if(user.name=="" || user.password=="")
        {
            return false;
        }
    }
    this.signUpCredValidate = function(user)
    {
        if(user.username=="" || user.password=="" || user.email == "" || user.username== null || user.password==null || user.email == null)
        {
            return "empty";
        }
        else if(user.password != user.confPassword)
        {
            return "missmatch";
        }
        return "valid";
    }
    this.loginFaliedAlert = function(message)
    {
        var alertPopup = $ionicPopup.alert({
            title: message.title,
            template: message.template
        });
    }
})

//Professor Review Services
.service('ProfessorRatingsList', function($q,$http) {
    return {
        getProfessorRatingList: function() {
            var config = {
                headers: {
                    'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                    'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
                    'Content-Type': 'application/json'
                },
            }
            $http.post('https://api.parse.com/1/functions/getProfessorsWithReviews',{}, config)
            .success(function(data) {
                var profData = data;
              })
              .error(function(user, error){
                //def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            var professors = 
            [   {
                    "Name":"Prof 1",
                    "ProfId":1,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  2,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',

                },
                {
                    "Name":"Prof 2",
                    "ProfId":2,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                },
                {
                    "Name":"Prof 3",
                    "ProfId":3,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  5,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                },
                {
                    "Name":"Prof 4",
                    "ProfId":4,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                },
                {
                    "Name":"Prof 5",
                    "ProfId":5,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  3,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                },
                {
                    "Name":"Prof 6",
                    "ProfId":6,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                },
                {
                    "Name":"Prof 7",
                    "ProfId":7,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    "Contact":'1234567890',
                }

            ]
            return professors;
        }
    }
})
.service('ProfessorReviews', function($q) {
    return {
        getProfessorReviewsList: function(profId) {
            var professorsReviews = 
            [   {
                    "Comments":"The professor is a very good Professor",
                    "User":"User A",
                    "Name":"Prof 1",
                    "ProfId":1,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  2,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }

                },
                {
                    "User":"User B",
                    "Comments":"The professor is a very good Professor",
                    "Name":"Prof 1",
                    "ProfId":2,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User C",
                    "Name":"Prof 1",
                    "Comments":"The professor is a very good Professor",
                    "ProfId":3,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  5,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User D",
                    "Name":"Prof 1",
                    "ProfId":4,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User E",
                    "Name":"Prof 1",
                    "Comments":"The professor is a very good Professor",
                    "ProfId":5,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  3,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User F",
                    "Name":"Prof 1",
                    "Comments":"The professor is a very good Professor",
                    "Dept":'A',
                    
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                    
                },
                {
                    "User":"User G",
                    "Name":"Prof 1",
                    "Comments":"The professor is a very good Professor",
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                }

            ];
            return professorsReviews;
        }
    }
    
})

//Courses Review Services
.service('CoursesRatingsList', function($q) {
    return {
        getCoursesRatingList: function() {
            var courses = 
            [   {
                    "Name":"Cou 1",
                    "CouId":1,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  2,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                   

                },
                {
                    "Name":"Cou 2",
                    "CouId":2,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                   
                },
                {
                    "Name":"Cou 3",
                    "CouId":3,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  5,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    
                },
                {
                    "Name":"Cou 4",
                    "CouId":4,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    
                },
                {
                    "Name":"Cou 5",
                    "CouId":5,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  3,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    
                },
                {
                    "Name":"Cou 6",
                    "CouId":6,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                  
                },
                {
                    "Name":"Cou 7",
                    "CouId":7,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    },
                    
                }

            ]
            return courses;
        }
    }
})
.service('CoursesReviews', function($q) {
    return {
        getCoursesReviewsList: function(profId) {
            var coursesReviews = 
            [   {
                    "Comments":"The professor is a very good Professor",
                    "User":"User A",
                    "Name":"Cou 1",
                    "CouId":1,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  2,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }

                },
                {
                    "User":"User B",
                    "Comments":"The professor is a very good Professor",
                    "Name":"Cou 1",
                    "CouId":2,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User C",
                    "Name":"Cou 1",
                    "Comments":"The professor is a very good Professor",
                    "CouId":3,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  5,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User D",
                    "Name":"Cou 1",
                    "CouId":4,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User E",
                    "Name":"Cou 1",
                    "Comments":"The professor is a very good Professor",
                    "CouId":5,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  3,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                },
                {
                    "User":"User F",
                    "Name":"Cou 1",
                    "Comments":"The professor is a very good Professor",
                    "CouId":6,
                    "Dept":'A',
                    
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  4,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                    
                },
                {
                    "User":"User G",
                    "Name":"Prof 1",
                    "Comments":"The professor is a very good Professor",
                    "CouId":7,
                    "Dept":'A',
                    "Rating":ratingsObject = {
                        iconOn : 'ion-ios-star',
                        iconOff : 'ion-ios-star-outline',
                        iconOnColor: 'rgb(200, 200, 100)',
                        iconOffColor:  'rgb(200, 100, 100)',
                        rating:  1,
                        minRating:1,
                        callback: function(rating) {
                          $scope.ratingsCallback(rating);
                        }
                    }
                }

            ];
            return coursesReviews;
        }
    }
})
.factory('userFactory', function($http,$q){
    return {
        signUp: function(user) {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
                headers: {
                    'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                    'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
                    'Content-Type': 'application/json'
                },
            }
            return $http.post('https://api.parse.com/1/users', {'username': user.username, 'password': user.password,"email": user.email,"name":user.name,type:"student"}, config)
            .success(function(user) {
                def.resolve(user);
              })
              .error(function(user, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        logIn: function(username, password) {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
             headers: {
                'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
             },
             params: { 
                username: username ,
                password: password
              }
            }
            $http.get('https://api.parse.com/1/login', config)
              .success(function(user) {
                def.resolve(user);
              })
              .error(function(user, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
})
.factory('professorFactory', function($http,$q){
    return {
        getProfList: function() {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
                headers: {
                    'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                    'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
                    'Content-Type': 'application/json'
                },
            }
            return $http.get('https://api.parse.com/1/classes/Professors', config)
            .success(function(profData) {
                def.resolve(profData);
              })
              .error(function(profData, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        submitProfReview: function(data) {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
                headers: {
                    'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                    'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
                    'Content-Type': 'application/json'
                },
            }

            return $http.post('https://api.parse.com/1/classes/Reviews',{'user': data.user, 'type': data.type,"rating": data.rating,"comments":data.comments,"course_name":data.course_name,"course_id":data.course_id,"prof_name":data.prof_name,"prof_id":data.prof_id,"reviewSubmittype":"fromClient"}, config)
            .success(function(profData) {
                def.resolve(profData);
              })
              .error(function(profData, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
})
.factory('reviewsFactory', function($http,$q){
    return {
        addReviews: function(review) {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
                headers: {
                    'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                    'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
                    'Content-Type': 'application/json'
                },
            }
            return $http.post('https://api.parse.com/1/users', {'user': review.user, 'type': review.type,"rating": review.rating,"comments":review.comments,prof:review.prof}, config)
            .success(function(user) {
                def.resolve(user);
              })
              .error(function(user, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        logIn: function(username, password) {
            var def = $q.defer();
            var promise = def.promise;
            var config = {
             headers: {
                'X-Parse-Application-Id': '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
                'X-Parse-REST-API-Key': 'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS',
             },
             params: { 
                username: username ,
                password: password
              }
            }
            $http.get('https://api.parse.com/1/login', config)
              .success(function(user) {
                def.resolve(user);
              })
              .error(function(user, error){
                def.reject('Wrong credentials.');
                console.log("Error: " + error.code + " " + error.message);
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
})
.value('PARSE_CREDENTIALS',{
    APP_ID: '8HQ1HtctC84oTRwbKdBFCpYXsUb3NFs51c0hFLMB',
    REST_API_KEY:'ibUrZrzAMol9DH7O3X8qlgnBQW7Jv7mt1DQAGQuS'
});;