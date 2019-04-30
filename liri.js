// this reads and sets any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// following node-spotify-api documentation format
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// change "I saw the sign" to process.argv[3]
spotify.search({ type: 'track', query: "sin wagon" }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // to check the full response:
    //console.log(data.tracks.items[0]);
     
    // return the artist
    console.log(data.tracks.items[0].artists[0].name);
    // return the song's name
    console.log(data.tracks.items[0].name);
    // return a preview link of the song from spotify
    console.log(data.tracks.items[0].preview_url);
    // return the album that the song is from
    console.log(data.tracks.items[0].album.name);
});