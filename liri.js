// this reads and sets any environment variables with the dotenv package
require("dotenv").config();
// Add the code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// following node-spotify-api documentation format
var Spotify = require('node-spotify-api');
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
// As always, we grab the fs package to handle read/write.
var fs = require("fs");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to specify the database and search title
var database = inputString[2];
var title = inputString.slice(3);
// console.log(title);
// var titleArray = title.join(" ");
// console.log(titleArray);

function runSpotify() {
    // turning inputString array into single string for spotify search
    var titleArray = title.join(" ");
    spotify.search({ type: 'track', query: "" + titleArray + "" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // to check the full response:
        //console.log(data.tracks.items[0]);
        // return the artist
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        // return the song's name
        console.log("Song Name: " + data.tracks.items[0].name);
        // return a preview link of the song from spotify
        console.log("Preview: " + data.tracks.items[0].preview_url);
        // return the album that the song is from
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

function runOMDB() {
    // turning inputString array into single string for OMDB search
    var titleArray = title.join("+");
    axios.get("http://www.omdbapi.com/?t=" + titleArray + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            //console.log(response.data);
            // return title of the movie
            console.log("Title: " + response.data.Title);
            // return year the movie came out. TODO: convert to show year only with moment.js
            console.log("Released: " + response.data.Released);
            // return IMDB rating of the movie
            console.log("IMDB rating: " + response.data.Ratings[0].Value);
            // return rotten tomatoes rating of the movie
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            // return country where the movie was produced
            console.log("Country: " + response.data.Country);
            // return language of the movie
            console.log("Language: " + response.data.Language);
            // return plot of the movie
            console.log("Plot: " + response.data.Plot);
            // return actors in the movie
            console.log("Actors: " + response.data.Actors);
        }
    );
}

function runReadFile() {
    // reading from random.txt file.
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });
}

// to figure out what category the user wants to search
//if (database === "do-what-it-says") {
    //runReadFile();
    //} else if (database === "concert-this") {
    //TODO: run the bandsintown function
//} else if (database === "spotify-this-song") {
    //runSpotify();
//} else if (database === "movie-this") {
    //runOMDB();
//} else {
    //console.log("Try typing in one of the following commands before your search term: concert-this, spotify-this-song, movie-this, or do-what-it-says. Thanks!")
//}