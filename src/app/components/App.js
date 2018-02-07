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
      genreOptions: [],
      recentlyPlayedArtists: [],
      type: ''
    }
  }
  changeType(e){
    //e.preventDefault();
    console.log(e.target.value);
    this.setState({type: e.target.value});
    /*
    this.setState((p) => {
      return {...p, type: e.target.value}
    });
    */
  }
  componentWillMount(){
    if(this.state.token && this.state.token != 'undefined'){
      getAllUserData(this.state.token).then((res) => {
        let topArtists = {
          long_term: res[1][0].data && res[1][0].data.items ? res[1][0].data.items : [],
          medium_term: res[1][1].data && res[1][1].data.items ? res[1][1].data.items : [],
          short_term: res[1][2].data && res[1][2].data.items ? res[1][2].data.items : []
        }
        let recentlyPlayed =  res[3],
            recentlyPlayedArtists = [];
        if(res[3].data && res[3].data.items.length){
          let used = [];
          res[3].data.items.forEach((i) => {
            if(!used.includes(i.track.artists[0].id)){
              used.push(i.track.artists[0].id);
              i.track.artists[0].images = i.track.album.images;
              recentlyPlayedArtists.push(i.track.artists[0]);
            }
          });
        }

        this.setState((p) => (
          {...p, userInfo: res[0].data, topArtists, playlists: res[2].data.items, recentlyPlayedArtists}
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
    return(
      <div>
        {this.state.token ? (
            this.state.type.length ? (
              <Main token={this.state.token}
                user={this.state.userInfo}
                recentArtists={this.state.recentlyPlayedArtists}
                topArtists={this.state.topArtists}
                playlists={this.state.playlists}
                genres={this.state.genreOptions}
                appName={this.state.appName}
                type={this.state.type}
                />
            ) : (
                <div className="pick-type">
                  <select className="pick-type-select" value={this.state.type} onChange={this.changeType.bind(this)}>
                    <option value=''>Select One</option>
                    <option value="artist">Artist</option>
                    <option value="label">Record Label</option>
                    <option value="genre">Genre</option>
                  </select>
                </div>
              )
            ) : (<Login appName={this.state.appName}/>)}
      </div>
     );
  }
}
