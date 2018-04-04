//import dotenv that pulls env info into keys
require('dotenv').config();

// require dependency variables
var fs = require('fs');
var Twitter = require('twitter');
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');

// get keys from .env file
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// user command to tell program what to do
var command = process.argv[2];
// captures secondary command
var secondCommand = process.argv[3];

function callTwitter() {
	twitter.get('search/tweets' , { q: '_kvnsmith'}, function(error, tweets, response){
		if (!error){
			console.log("\n---------------------------")
			console.log("\n Searching tweets for @_kvnsmith\n")
			for (var i = 0; i < 19; i++){
				console.log("\n--------------------------")
				console.log("\nTweet #" + (i+1))
				console.log("\n" + tweets.statuses[i].text)
				console.log("\nTweeted at: " + tweets.statuses[i].created_at)
			}
			return console.log("Completed Twitter Pull")
		}
		console.log("Something Happened, Please Try Again")
	})
}