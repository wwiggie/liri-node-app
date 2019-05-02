// this reads and sets any environment variables with the dotenv package
require("dotenv").config();
// Add the code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// following node-spotify-api documentation format
var Spotify = require('node-spotify-api');
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
// We grab the fs package to handle read/write.
var fs = require("fs");
// including moment
var moment = require('moment');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to specify the database and search title
var database = inputString[2];
var title = inputString.slice(3);

function runSpotify(title) {
    // turning inputString array into single string for spotify search
    var titleString = title.join(" ");
    spotify.search({ type: 'track', query: "" + titleString + "" }, function (err, data) {
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

function runOMDB(title) {
    // turning inputString array into single string for OMDB search
    var titleString = title.join("+");
    axios.get("http://www.omdbapi.com/?t=" + titleString + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            //console.log(response.data);
            // return title of the movie
            console.log("Title: " + response.data.Title);
            // return year the movie came out.
            console.log("Released: " + response.data.Released.slice(7));
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


function runBandsInTown(title) {
    // turning inputString array into single string for BandsInTown search
    var titleString = title.join("%20");
    axios.get("https://rest.bandsintown.com/artists/" + titleString + "/events?app_id=codingbootcamp").then(
        function (response) {
            //console.log(response.data[0]);
            // name of venue
            console.log("Venue: " + response.data[0].venue.name);
            // venue location
            console.log("Venue Location: " + response.data[0].venue.city + " " + response.data[0].venue.region);
            // date of the event - TODO: use moment.js to format this as MM/DD/YYYY
            var date =  moment(response.data[0].datetime).format("MM/DD/YYYY");
            //console.log(date);
            console.log("Event Date: " + date);
        }
    )
}

function runReadFile() {
    // reading from random.txt file.
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };
        //console.log(data);
        // splitting data into an array
        var dataArr = data.split(",");
        if (dataArr[0] === "spotify-this-song") {
            runSpotify(dataArr[1].split(" "));
        } else if (dataArr[0] === "movie-this") {
            runOMDB(dataArr[1].split(" "));
        } else if (dataArr[0] === "concert-this") {
            runBandsInTown(dataArr[1].split(" "));
        }
    });
}

// to figure out what category the user wants to search
if (database === "do-what-it-says") {
    runReadFile();
} else if (database === "concert-this") {
    if (title.length === 0) {
        console.log("Please enter a band name.");
    } else {
        runBandsInTown(title);
    }
} else if (database === "spotify-this-song") {
    if (title.length === 0) {
        runSpotify(["The", "Sign", "Ace", "of", "base"]);
    } else {
        runSpotify(title);
    }
} else if (database === "movie-this") {
    if (title.length === 0) {
        runOMDB(["Mr.", "Nobody"]);
    } else {
        runOMDB(title);
    }
} else {
    console.log("Try typing in one of the following commands before your search term: concert-this, spotify-this-song, movie-this, or do-what-it-says. Thanks!")
}