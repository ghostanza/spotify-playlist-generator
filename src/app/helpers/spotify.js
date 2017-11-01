var axios = require('axios'),
    version = 'v1';

module.exports.getOrSetToken = () => {
  var token = document.cookie.match(/.*token=([^;]*).*$/) ? document.cookie.replace(/.*token=([^;]*).*$/,"$1") : '',
      refresh = document.cookie.match(/.*refresh=([^;]*).*$/) ? document.cookie.replace(/.*refresh=([^;]*).*$/,"$1") : '';
  if(token){
    return Promise.resolve({data: {token, type: 'same'}});
  }
  else if(refresh){
    return axios.get(`/s/token?refresh=${refresh}`);
  }
  else{
    return Promise.resolve({data:{ token: '', type: 'none'}});
  }
}

/***************  USER RELATED ENDPOINTS ***************************/
module.exports.getUserInfo = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me`, config);
  }
  else{ return Promise.resolve(''); }
}


module.exports.getPlaylists = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`}};
    return axios.get(`https://api.spotify.com/${version}/me/playlists`, config);
  }
  else{
    return Promise.resolve('');
  }
}

module.exports.getAllTrackInfo = (token, track_id) => {
  if(token && track_id){
    return axios.all([
      module.exports.getTrackInfo(token, track_id),
      module.exports.getAudioFeatures(token, track_id),
      module.exports.getAudioAnalysis(token, track_id)
    ]);
  }
}


// top tracks / artists
module.exports.getTop = (token, type, options) => {
  if(token && type){
    var config = { headers: {'Authorization': `Bearer ${token}`} },
        query='';
    if(options){
      query+="?"
      var count = 1;
      for(var item in options){
        query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
        count++
      }
    }
    return axios.get(`https://api.spotify.com/${version}/me/top/${type}${query}`, config);
  }
  else{ return Promise.resolve(''); }
}

module.exports.getAllTop = ( token, type ) => {
  if(token && type){
    return axios.all([
      module.exports.getTop(token, type, {time_range: 'long_term'}),
      module.exports.getTop(token, type),
      module.exports.getTop(token, type, {time_range: 'short_term'})
    ])
  }
}

module.exports.getAllUserData = ( token ) => {
  if(token){
    return axios.all([
      module.exports.getUserInfo(token),
      module.exports.getAllTop(token, 'artists'),
      module.exports.getPlaylists(token)
    ])
  }
}

// returns information about the spotify player -- currently playing track, device, etc.
module.exports.getPlayerInfo = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me/player`, config);
  }
  else{ return Promise.resolve(''); }
}

module.exports.getCurrentlyPlaying = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me/player/currently-playing`, config);
  }
  else{ return Promise.resolve(''); }
}

module.exports.getRecentlyPlayed = (token, options) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} },
        query='';
    if(options){
      query+="?"
      var count = 1;
      for(var item in options){
        query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
        count++
      }
    }
    return axios.get(`https://api.spotify.com/${version}/me/player/recently-played${query}`, config);
  }
  else { return Promise.resolve(''); }
}


/********* TRACK RELATED ENDPOINTS *******************/
// returns detailed information about a given track ID
/* link to old EchoNest docs on interpreting the output of this call, the spotify docs don't have this explained yet:
https://web.archive.org/web/20160528174915/http://developer.echonest.com/docs/v4/_static/AnalyzeDocumentation.pdf
*/
module.exports.getAudioAnalysis = (token, track_id) => {
  if(token && track_id){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/audio-analysis/${track_id}`, config);
  }
  else{ return Promise.resolve(''); }
}

// returns primary features (energy, danceability, etc.) of a given track ID or array of track IDs
module.exports.getAudioFeatures = (token, track_ids) => {
  if(token && track_ids){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/audio-features/${typeof track_ids === 'object' ? `?ids=${track_ids.join(',')}`: track_ids}`, config);
  }
  else{  return Promise.resolve(''); }
}

module.exports.getTrackInfo = (token, track_id) => {
  if(token && track_id){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/tracks/${track_id}`, config);
  }
}

module.exports.getAllTrackInfo = (token, track_id) => {
  if(token && track_id){
    return axios.all([module.exports.getTrackInfo(token, track_id), module.exports.getAudioFeatures(token, track_id), module.exports.getAudioAnalysis(token, track_id)]);
  }
}

/***** ALBUM *****/

module.exports.getAlbumInfo = (token, album_id) => {
  if(token && album_id){
    var config = { headers : {'Authorization' : `Bearer ${token}`}};
    return axios.get(`https://api.spotify.com/${version}/albums/${album_id}`, config);
  }
}


/******* ARTIST RELATED ENDPOINTS **********/
module.exports.getArtists = (token, artist_ids) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${typeof artist_ids === 'object' ? `?ids=${artist_ids.join(',')}`: artist_ids}`, config);
}

module.exports.getRelatedArtists = (token, artist_id) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/related-artists?limit=15`, config);
}
module.exports.getArtistTopTracks = (token, artist_id, country = 'US') => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/top-tracks?country=${country}`, config);
}

module.exports.getArtistAlbums = (token, artist_id, options) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  var query='';
  if(options){
    query+="?"
    var count = 1;
    for(var item in options){
      query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
      count++
    }
  }
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/albums/${query}`, config);
}

module.exports.getAllArtistInfo = (token, artist_id, country, options) => {
  return axios.all([module.exports.getArtists(token, artist_id), module.exports.getRelatedArtists(token, artist_id), module.exports.getArtistTopTracks(token, artist_id, country), module.exports.getArtistAlbums(token, artist_id, {"album_type" : "album", "limit" : 30}), module.exports.getArtistAlbums(token, artist_id, {'album_type' : 'single', 'limit' : 30})]);
}

/*** SEARCH RELATED ENDPOINTS ***/

module.exports.getFilteredArtists = (token, filter, value, limit=30) => {
  var value = encodeURIComponent(value),
      config = { headers : {'Authorization': `Bearer ${token}`}},
      allowed = {
        'genre': 1,
        'label': 1
      };
  if(allowed[filter]){
    return axios.get(`https://api.spotify.com/${version}/search?q=${filter}:%22${value}%22&type=artist&limit=${limit}`, config);
  }
}

module.exports.getSearchResults = (token, searchType, query) => {
  var query = encodeURIComponent(query),
      config = { headers: {'Authorization': `Bearer ${token}`} },
      // TODO:  Change the hard-coded limit to an object so you can pass offsets too for multiple pages
      limit = 50;
  return axios.get(`https://api.spotify.com/${version}/search?q=${query}&type=${searchType}&limit=50`, config);
}


module.exports.getRecommendations = (token, options) => {
  var config = { headers: {'Authorization' : `Bearer ${token}`}},
      seed_artists = options.seed_artists && options.seed_artists.length ? options.seed_artists.join(',') : '',
      seed_genres = options.seed_genres && options.seed_genres.length ? options.seed_genres.join(',') : '',
      fine_tune = options.tune_track || {},
      limit = 100,
      track_attrs = Object.keys(fine_tune).map((k) => {
        return (
          fine_tune[k] == 0.5 ? `min_${k}=0`
          : fine_tune[k] > 0.5 ? `min_${k}=${fine_tune[k]}`
          : `max_${k}=${fine_tune[k]}`
        );
      });

  return axios.get(`https://api.spotify.com/${version}/recommendations?seed_artists=${seed_artists}&seed_genres=${seed_genres}&limit=${limit}&${track_attrs.join('&')}`, config);
}

// Make four of the same recommendations call
// The front-end will filter through the results and compile only unique artists
module.exports.getRecommendationsMultipleAttempts = (token, options) => {
  return axios.all([
    module.exports.getRecommendations(token, options),
    module.exports.getRecommendations(token, options),
    module.exports.getRecommendations(token, options)
  ]);
}

module.exports.getRecommendationSeedGenres = (token) => {
  var config = { headers: {'Authorization' : `Bearer ${token}`}};

  return axios.get(`https://api.spotify.com/${version}/recommendations/available-genre-seeds`, config);
}


/* PLAYLIST */
module.exports.createPlaylist = (token, userID, name) => {
  var config = { headers: {'Authorization' : `Bearer ${token}`, 'Content-Type' : 'application/json'}};
  return axios.post(`https://api.spotify.com/${version}/users/${userID}/playlists`, {name}, config);
}
module.exports.addPlaylistTracks = (token, userID, playlistID, trackURIs) => {
  var config = { headers: {'Authorization' : `Bearer ${token}`, 'Content-Type' : 'application/json'}};
  return axios.post(`https://api.spotify.com/${version}/users/${userID}/playlists/${playlistID}/tracks`, {uris: trackURIs}, config);
}

/***** TODO *****

  - add searching
  - move related endpoints into classes
  so you can do import { artistEndpoints } from 'spotify' and do artistEndpoints.getArtist
  rather than import * as spotify from 'spotify' and calling spotify.getArtist.
  It will make it easier to only import the endpoint functions necessary for the components

***/
