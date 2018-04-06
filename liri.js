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

// capture all input for proccessing later
var thrdCmd = "";
// remove spaces if user didnt formate query right
for (var i = 3; i < process.argv.length; i++) {
	thrdCmd += process.argv[i] + "+";
}

// omdb Mr. Nobody default text
var mrNobody = "\n If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947\n\nIt's on Netflix!";

// twitter api call
function callTwitter() {
	twitter.get('search/tweets', { q: 'kdsbot', count: 20 }, function (error, tweets, response) {
		if (!error) {
			console.log("\n------------------------------------------")
			console.log("\n Searching tweets for @kdsbot\n")
			for (var i = 0; i < 20; i++) {
				console.log("\n------------------------------------------")
				console.log("\nTweet #" + (i + 1))
				console.log("\n" + tweets.statuses[i].text)
				console.log("\nTweeted at: " + tweets.statuses[i].created_at)
			}
			console.log("\n------------------------------------------")
			return console.log("Completed Twitter Pull")
		}
		// error checking and logging
		console.log("\n------------------------------------------")
		console.log(error)
		console.log("\n------------------------------------------")
		console.log("!!!Something Happened, Please Try Again!!!")

	})
};

// spotify api call
function callSpotify(object) {
	spotify.search({ type: 'track', query: object }, function (error, data) {
		if (error) {
			return console.log("There was an error of " + error)
		}
		// easy storage of our song
		var song = data.tracks.items[0];

		var printsong = {
			'Artist(s)': song.artists[0].name,
			'Name': song.name,
			'Preview Link': song.preview_url,
			'Album': song.album.name
		}
		console.log(JSON.stringify(printsong, null, 2));
	})
}

// OMDB Call
function callOmdb(object) {
	request("http://www.omdbapi.com/?apikey=f9b68db0&t=" + object, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var body = JSON.parse(body);
			var movieInfo = {
				"Title": body.Title,
				"Release Year": body.Year,
				"IMDB Rating": parseInt(body.imdbRating),
				"Rotten Tomatoes Rating": body.Ratings[1].Value,
				"Country of Production": body.Country,
				"Language(s)": body.Language,
				"Plot": body.Plot,
				"Actors ": body.Actors
			}
			// print the JSON object out
			return console.log(JSON.stringify(movieInfo, null, 2));
		}
		// error handling
		console.log(error);
	})
}

// do what i say
function doThis() {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log("There was an error with do-what-it-says...\n" + error)
		}
		var doArr = data.split(',');
		switch (doArr[0]) {
			case "spotify-this-song":
				callSpotify(doArr[1]);
				break;
			case "my-tweets":
				callTwitter();
				break;
			case "movie-this":
				callOmdb(doArr[1]);
				break;
			default:
				console.log("I couldn't read anything in the file");
		}
	})
}

switch (command) {
	case "my-tweets":
		return callTwitter();
		break;
	case "movie-this":
		if (secondCommand) {
			return callOmdb(thrdCmd)
		}
		// or it looks for my. nobody
		console.log(mrNobody)
		callOmdb("mr nobody");
		break;
	case "spotify-this-song":
		// if input then
		if (secondCommand) {
			console.log("\nYou've started the spotify search...");
			return callSpotify(thrdCmd)
		}
		console.log("\n------------------------------------------")
		console.log("\nNo song was provided, so here is 'The Sign' by Ace of Bass")
		console.log("\n------------------------------------------")
		callSpotify("The Sign Ace of Base");
		break;
	case "do-what-it-says":
	("\n------------------------------------------")
	console.log("\n..Reading The Random.txt File...")
		doThis();
		break;
	default: console.log("I Don't Understand!\n:-/\nSupported options are: \nmy-tweets\nmovie-this\nspotify-this-song")
}