# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.
Use LIRI to get your latest tweets, find out about a song,
or a movie, or just choose a random action from your own random file.

## Installs

The [package.json](https://github.com/brainchomper/liri-node-app/blob/master/package.json)
lists dependent node packages, but for your convenvice, these are the ones to install.

To Install all Dependencies after clone or download of this repository simply:

`npm install`

You Must provide your own .env file for this repo to work properly. 

### Twitter

`npm install twitter`

### Spotify

`npm install node-spotify-api`

### Request

`npm install request`

### DotEnv

`npm install dotenv`

## Get Started

Here's a quick rundom of the commands you can use in LIRI.

### Get Tweets

Retrieves up to your latest 20 tweets:

`node liri.js my-tweets`

Screenshot of result:
![tweets](./images/tweets.jpg?raw=true)

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song American Girl`<br>
or<br>
`node liri.js spotify-this-song "American Girl"`
![tweets](./images/spotify.jpg?raw=true)

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this Star Wars`<br>
or<br>
`node liri.js movie-this "Star Wars"`
![tweets](./images/movie.jpg?raw=true)
### Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`
![tweets](./images/do-this.jpg?raw=true)