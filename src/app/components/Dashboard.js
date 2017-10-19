import React from 'react';
import TopArtists from './TopArtists';
import MyPlaylists from './MyPlaylists';
import List from './List';
import Search from './Search';
import SelectionMeter from './SelectionMeter';
import Tab from './Tab';
import {getRecommendations} from '../helpers/spotify';

export default class Dashboard extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      selections: []
    }
    this.updateSelected = this.updateSelected.bind(this);
  }
  updateSelected(id){
    let newSelected = Array.from(this.state.selections);
    // the max number of items we can send is 5
    if(newSelected.length <= 4){
      if(newSelected.includes(id)){
        newSelected.splice(newSelected.indexOf(id), 1);
      } else{
        newSelected.push(id);
      }
      this.setState((prev) => {
        return { ...prev, selections: newSelected }
      });
    }
    // if there are more than 4 items in the selection list
    // allow for items to be removed but not added
    else if(newSelected.includes(id)){
        newSelected.splice(newSelected.indexOf(id), 1);
        this.setState((prev) => {
          return { ...prev, selections: newSelected }
        });
    }
  }
  // TODO:  Handle the recommendations received
  // Right now it only fetches artist seeds
  fetchRecommendations(){
    if(this.props.token && this.state.selections.length > 0){
      getRecommendations(this.props.token, { seed_artists: this.state.selections })
        .then((res)=>{
          if(res.data && res.data.tracks.length){
            let tracks = [],
                artistCount = {};
            for(let i = 0; i < res.data.tracks.length; i++){
              let artist = res.data.tracks[i].artists[0].name,
                  track = res.data.tracks[i].name,
                  album = res.data.tracks[i].album.name;
              tracks.push({artist, track, album});
              artistCount[artist] = artistCount[artist]+1 || 1;
            }
            console.log(artistCount);
            console.log(tracks);
          }
        });
    }
  }
  render() {
    return(
      <div>
        <Tab label="Search For Artists">
          <Search selections={this.state.selections} updateSelected={this.updateSelected} token={this.props.token}/>
        </Tab>
        <Tab label="My Top Artists">
          <TopArtists artists={this.props.topArtists} updateSelected={this.updateSelected} selections={this.state.selections}/>
        </Tab>
        <Tab label="Genre Options">
          <List items={this.props.genres} type='genres' toggleSelected={this.updateSelected} selections={this.state.selections}/>
        </Tab>
        <div onClick={this.fetchRecommendations.bind(this)}><h3>GET RECS</h3></div>
        <SelectionMeter selections={this.state.selections}/>
      </div>
    )
  }
}
