
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("getProfessorsWithReviews", function(request, response) {
	//var professors = Parse.Object.extend("Professors");
	var query = new Parse.Query("Professors");
	query.greaterThan("no_reviews", 0);
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " professors");
	    response.success(results);
	  },
	  error: function(error) {
	    console.log("Professors retrieval failed");
	    response.error("Professors retrieval failed");
	  }
	})
});

Parse.Cloud.beforeSave("Reviews", function(request, response) {
	if(request.object.get("reviewSubmittype")=="fromClient" && request.object.get("reviewSubmittype")!=undefined)
	{
		//request.object.set("reviewSubmittype","");
		delete request.object.reviewSubmittype;
		console.log("Review Submit type"+request.object.reviewSubmittype);
		var user = request.object.get("user");
		var query = new Parse.Query("Reviews");
		query.equalTo("user", user);
		query.equalTo("prof_id", request.object.get("prof_id"));
		query.find({
		  success: function(results) {
		  	if(results.length>0)
		  	{
		  		query = new Parse.Query("Professors");
			  	query.get(request.object.get("prof_id"), {
			    success: function(prof) {
			      //prof.increment("no_reviews");
			      var rating_score = prof.get("rating_score");
			      console.log("Existing rating_score : "+ rating_score);

			      var old_rating = results[0].get("rating");
			      console.log("Old rating for the review : "+ old_rating);
			      console.log("Old comment for the review : "+ results[0].get("comments"));
			      console.log("New rating for the review : "+ request.object.get("rating"));
			      rating_score = rating_score + request.object.get("rating");
			      rating_score = rating_score - old_rating;
			      //console.log("New rating_score: "+ rating_score);
			      
			      prof.set("rating_score",rating_score); 
			      console.log("New rating_score : "+rating_score);
			      
			      var no_reviews = prof.get("no_reviews");
			      if(no_reviews>0)
			      {
			      	var Rating = prof.get("Rating");
			      	Rating = rating_score/no_reviews;	
			      	prof.set("Rating",Rating); 
			      }
			      prof.save();
			      results[0].set("rating",request.object.get("rating"));
			      results[0].set("comments",request.object.get("comments"));
			      results[0].save();
			      console.log("Upated existing review");
			      //response.success();
				  response.error("Upated existing review");

			    },
	    		error: function(error) {
			      console.error("Got an error " + error.code + " : " + error.message);
			      response.error("Unexpected error");
				    }
				  
				});
		  		
		  	}
		  	else
			{
				console.log("New review submitted");
				response.success();
		  	}
		  },
		  error: function(error) {
		    console.log("Professors retrieval failed");
		    response.error("Professors retrieval failed");
		  }
		})
	}
	else
	{
		console.log("Reviews nested update call catught");
	    response.error("Reviews nested update call catught");
	}
});

Parse.Cloud.afterSave("Reviews", function(request) {
  query = new Parse.Query("Professors");
  query.get(request.object.get("prof_id"), {
    success: function(prof) {
      prof.increment("no_reviews");
      var rating_score = prof.get("rating_score");
      console.log("Existing rating_score : "+ rating_score);

      rating_score = rating_score + request.object.get("rating");
      
      prof.set("rating_score",rating_score); 
      console.log("New rating_score : "+rating_score);
      
      var no_reviews = prof.get("no_reviews");
      if(no_reviews>0)
      {
      	var Rating = prof.get("Rating");
      	Rating = rating_score/no_reviews;	
      	prof.set("Rating",Rating); 
      }
      prof.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});
