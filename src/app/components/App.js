import React from 'react';
import Login from './Login';
import Main from './Main';
import { getAllUserData, getRecommendationSeedGenres } from 'spotify';

export default class App extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      token: document.cookie.match(/.*token=([^;]*).*$/) ? document.cookie.replace(/.*token=([^;]*).*$/,"$1") : '',
      userInfo: [],
      topArtists: {},
      playlists: [],
      genreOptions: []
    }
  }
  componentWillMount(){
    if(this.state.token && this.state.token != 'undefined'){
      console.log('getting data');
      getAllUserData(this.state.token).then((res) => {
        var topArtists = {
          long_term: res[1][0].data && res[1][0].data.items ? res[1][0].data.items : [],
          medium_term: res[1][1].data && res[1][1].data.items ? res[1][1].data.items : [],
          short_term: res[1][2].data && res[1][2].data.items ? res[1][2].data.items : []
        }
        this.setState((p) => (
          {...p, userInfo: res[0].data, topArtists, playlists: res[2].data.items}
        ));
      });

      getRecommendationSeedGenres(this.state.token).then((res) => {
        this.setState((p) => (
          { ...p, genreOptions: res.data.genres}
        ))
      })
    }
  }
  render() {
    console.log(this.state);
    return(
      <div>
        {this.state.token ? (<Main token={this.state.token} topArtists={this.state.topArtists} playlists={this.state.playlists} genres={this.state.genreOptions}/>) : (<Login />)}
      </div>
     );
  }
}
