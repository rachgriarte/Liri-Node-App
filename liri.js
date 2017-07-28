//Introduction
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
console.log("\nHi Stephen, welcome to Liri!");
console.log("\nSome helpful tips:");
console.log("To see your tweets, use 'my-tweets' as your third node argument");
console.log("To learn more information about a song, use 'spotify-this-song' as your third node argument");
console.log("To learn more information about a movie, use 'movie-this' as your third node argument");
console.log("Use 'do-what-it-says' as your third node argument and see what it does!");
console.log("\nHAVE FUN! :)");
console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
// Grabs the Twitter & Spotify API Key
var theKeys = require ("./keys.js");
//Grabbing the File Set 
var fs = require("fs");
//Grabbing Twitter, Spotify, and Request nmp
var Twitter = require("twitter"); 
var Spotify = require('node-spotify-api');
var request = require("request");
//Setting the third and fourth node argument 
var command = process.argv[2];
var command2 = process.argv.slice(3).join(' ');
//---------- Switch commands ----------- 
switch (command) {
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		song();
		break;
	case "movie-this":
		movie();
		break;
	case "do-what-it-says":
		says();
		break;
};
//---------- If tweets function is called ---------
function tweets(){
	var client = new Twitter(theKeys.twitterKeys);
	var params = {screen_name: 'rachgriarte',
				limit: 20
			};
	//Retrieving tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i=0; i<tweets.length; i++){
	  		console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	  		console.log(" ");
	  		console.log(tweets[i].created_at)
			console.log(tweets[i].text);
			console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	   		}
	   	}
	});
}
//---------- If song function is called ----------
function song() {
	var client = new Spotify(theKeys.spotifyKeys);
	var playSong = process.argv[3];
	//retrieving Spotify song
	client.search({ type: 'track', query: playSong, limit: 1}, function(error, data) {
  		if (error) {
    		return console.log('Error occurred: ' + error);
  			} else {
				var artistNames = function (artist) {  
				return artist.name;				
  			}
  			var tracks=data.tracks.items;
  			for (var i=0; i<tracks.length; i++){
			console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	    	console.log('\nArtist(s): ' + tracks[i].artists.map(artistNames));
	    	console.log('Song Name: ' + tracks[i].name);
	    	console.log('Preview Song: ' + tracks[i].preview_url);
	    	console.log('Album: ' + tracks[i].album.name);
	    	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
			}	
		}
	});
}
//---------- If movie function is called ----------
function movie() {
	// Then run a request to the OMDB API with the movie specified
	var queryURL = "http://www.omdbapi.com/?t=" + command2 + "&y=&plot=short&apikey=40e9cece";
	request(queryURL, function (error, response, body) {
		// if the request is successful, run this
		if (!error && response.statusCode === 200) {
			console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
			console.log(" ");
			console.log(queryURL);
			console.log("\nMovie Title: " +command2);
			console.log("Actors in the movie: " + JSON.parse(body).Actors);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("Country where the movie is produced: " + JSON.parse(body).Country);
			console.log("Language of the movie: " + JSON.parse(body).Language);
			console.log("\nPlot of the movie: " + JSON.parse(body).Plot);
			console.log("\nThe IMDB rating is: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[2].Value);
			console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
		}
	});
}
//---------- if says function is called ---------
function says() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error) {
			return console.log(error);
		}
			console.log(data);
	var dataArr = data.split(",");
	console.log(dataArr);
	command2 = dataArr[1];
		//Switch command data
		switch (dataArr[0]) {
		case "my-tweets":
			tweets();
			break;
		case "spotify-this-song":
			song();
			break;
		case "movie-this":
			movie();
			break;
		case "do-what-it-says":
			says();
			break;
		}
	})
};