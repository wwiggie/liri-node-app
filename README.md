https://wneek018.github.io/liri-node-app/

# liri-node-app using Spotify, OMDB and BandsinTown

## What it does:
This app allows the user to access movie, song and concert information based on the command given and song/movie/band name.

## List of Commands
`concert-this` searches the Bands in Town Artist Events API and will return the following information:
* Name of the venue
* Venue location
* Date of the event

`spotify-this-song` searches the Spotify API and returns:
* Artist(s)
* Song name
* Preview link of the song
* Album name

`movie-this` searches the OMDB API and returns:
* Movie title
* Year the movie came out
* IMDB Rating
* Rotten Tomatoes rating
* Country where movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

`do-what-it-says` reads the text saved inside of random.txt and then uses it to call one of LIRI's commands

## How to use:
Run node liri.js in your terminal, followed by one of these four commands: concert-this, spotify-this-song, movie-this, do-what-it-says. Your command line also needs to include a song name, movie title, or band name. This app does allow you to omit a song name or movie title, but will instead supply you with information about the movie Mr. Nobody, or the song "The Sign" by Ace of Base.

## Create your own LIRI app:
In node, run npm install --save node-spotify-api.
You will need to save your own Spotify ID and Client secret in a .env file and add the following to it (replacing the values with your API keys without quotes):

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
You will also need your own API key to access the OMDB API. Add your own API key into the code in liri.js here (line 49):
```
axios.get("http://www.omdbapi.com/?t=" + titleString + "&y=&plot=short&apikey=trilogy")
```

## Demo video:
https://drive.google.com/file/d/1Up8AUtcnd-TyfM-lauJYC2aS4RmMf6tw/view