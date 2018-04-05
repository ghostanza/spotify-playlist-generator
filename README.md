# spotify-playlist-generator
A music discovery tool that builds playlists using the Spotify recommendations API.

## Artists
Create a playlist based on up to 5 artists.

### Picking Artists:
#### Search
Search for an artist to select as a seed

#### Top Artists
A menu containing your top artists. Time ranges include "Recent", "6 Months", and "All Time".

#### Recently Played
A list of your recently played artists for quick selection

### Building The Playlist
- At the bottom of the screen there is a "My Selections" menu displaying how many artists you have currently selected.
- Opening this menu will allow you to look at your selections before committing to building a playlist.
- If you are happy with your selections, click "Build Playlist"
#### Deduplication
Since the point of the application is to discover new music, I did not want the resulting playlist to contain any duplicate artists or any of the original seed artists. When building the playlist, I filter out any duplicates so that the resulting playlist is all unique artists.

#### Playlist Size
Currently, the _maximum_ number of songs that will be in a playlist is 50.

## Coming Soon: Genres
Create playlists based on seed genres and audio characteristics (energy, positivity, etc.)

## Coming Soon: Labels
Create playlists based on artists within a given record label
