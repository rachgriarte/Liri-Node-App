//Introduction
console.log("Hi, welcome to Liri!");
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
	  		console.log(tweets[i].created_at)
			console.log(tweets[i].text);
			console.log("------------------------------------------------------");
	   		}
	   	}
	});
}
//---------- If song function is called ----------
function song() {
	var pullSong = new Spotify(theKeys.spotifyKeys);
	var playSong = process.argv[3];
	//retrieving Spotify song
	pullSong.search({ type: 'track', query: playSong, limit: 1}, function(error, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  			} else {
				var artistNames = function (artist) {  
				return artist.name;				
  			}
  			var tracks=data.tracks.items;
  			for (var i=0; i<tracks.length; i++){
			console.log('-----------------------------------------------------------');
	    	console.log('Artist(s): ' + tracks[i].artists.map(artistNames));
	    	console.log('song name: ' + tracks[i].name);
	    	console.log('preview song: ' + tracks[i].preview_url);
	    	console.log('album: ' + tracks[i].album.name);
	    	console.log('-----------------------------------------------------------');
			}	
		}
	});
}
//---------- If movie function is called ----------
function movie() {
	// Then run a request to the OMDB API with the movie specified
	var queryURL = "http://www.omdbapi.com/?t=" + command2 + "&y=&plot=short&apikey=40e9cece";
	// This line will help us debug against the actual queryURL
	console.log(queryURL);

	request(queryURL, function (error, response, body) {
		// if the request is successful, run this
		if (!error && response.statusCode === 200) {
			console.log('-----------------------------------------------------------');
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[2].Value);
			console.log("Country where the movie is produced: " + JSON.parse(body).Country);
			console.log("Language of the movie: " + JSON.parse(body).Language);
			console.log("Plot of the movie: " + JSON.parse(body).Plot);
			console.log("Actors in the movie: " + JSON.parse(body).Actors);
			console.log('-----------------------------------------------------------');
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