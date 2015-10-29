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
.service('SignUpService', function($q) {
    return {
        signUpUser: function(user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            var user = new Parse.User();
            user.set("username",user.username );
            user.set("password", user.password);
            user.set("email", user.email);

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
        if(user.name=="" || user.password=="" || user.email == "")
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
});