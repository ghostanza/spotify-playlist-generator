import React from 'react';
import PickSeeds from 'page/PickSeeds';
import PickLabel from 'page/PickLabel';
import PickGenre from 'page/PickGenre';
import PlaylistBuild from 'page/PlaylistBuild';
import {getRecommendationsMultipleAttempts} from 'spotify';
import {arrayOfObjectsContains} from '../helpers/functions';

export default class Main extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      selections: {
        all: [],
        genres: [],
        artists: [],
        spices:{}
      },
      isFetching: false,
      hasFetched: false,
      errorFetching: false,
      playlist: {
        name: '',
        tracks: []
      }
    }
    this.updateSelected = this.updateSelected.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(){
    this.setState({
      selections: {
        all: [],
        genres: [],
        artists: [],
        spices:{}
      },
      isFetching: false,
      hasFetched: false,
      errorFetching: false,
      playlist: {
        name: '',
        tracks: []
      }
    });
  }
  updateSelected(info, fetchImmediately){
    let newSelected = Object.assign({}, this.state.selections),
        [isAlreadySelected, index] = arrayOfObjectsContains(newSelected.all, 'id', info.id);
    // the max number of items we can send is 5
    if(newSelected.all.length <= 4){
      if(isAlreadySelected){
        newSelected.all.splice(index, 1);
        newSelected[info.type].splice(newSelected[info.type].indexOf(info.id),1);
      } else{
        newSelected.all.push(info);
        newSelected[info.type].push(info.id);
      }
      this.setState((prev) => {
        return { ...prev, selections: newSelected }
      });
      if(fetchImmediately){
        this.fetchRecommendations();
      }
    }
    // if there are more than 4 items in the selection list
    // allow for items to be removed but not added
    else if(isAlreadySelected){
        newSelected.all.splice(index, 1);
        newSelected[info.type].splice(newSelected[info.type].indexOf(info.id),1);
        this.setState((prev) => {
          return { ...prev, selections: newSelected }
        });
    }
  }
  updateSpices(spiceObject){
    let newSelections = Object.assign({}, this.state.selections);
    newSelections.spices = spiceObject;
    this.setState((prev) => {
      return { ...prev, selections: newSelections }
    })
  }
  fetchRecommendations(type){
    const TOTAL_RECOMMENDATIONS_ALLOWED = 50;
    let fetchType = type == 'more' ? type : 'initial';
    if(this.props.token && this.state.selections.all.length > 0){
      this.setState({isFetching: true});
      if(fetchType == 'initial'){
        // makes four of the same call to get recommendations
        // although slow, it increases the chances of you getting more unique artists
        getRecommendationsMultipleAttempts(
          this.props.token,
          {seed_artists: this.state.selections.artists, seed_genres: this.state.selections.genres, tune_track: this.state.selections.spices}
        ).then((res) => {
            let totalRecs = [],
                tracks = [],
                used = [];
            res.forEach((i) => {
              if(i.data && i.data.tracks.length){
                totalRecs.push(...i.data.tracks);
              }
            });
            if(totalRecs.length){
              for(let i = 0; i < totalRecs.length; i++){
                let rec = totalRecs[i];
                if(rec.artists.length && rec.artists[0].id){
                  // filter out the seed artists and any duplicate artists
                  // ensure that the returned track list is all different artists
                  if(!used.includes(rec.artists[0].id) && !this.state.selections.artists.includes(rec.artists[0].id)){
                    used.push(rec.artists[0].id);
                    tracks.push(rec);
                  }
                }
                // only allow up to 100 tracks to be returned in the final list
                if(tracks.length == TOTAL_RECOMMENDATIONS_ALLOWED){
                  break;
                }
              }
            }
            this.setState((p) => ({
              ...p,
              isFetching: false,
              hasFetched: true,
              errorFetching: false,
              playlist: { name: p.playlist.name, tracks }
            }));
          }).catch((err) => {
            this.setState({isFetching: false, hasFetched: true, errorFetching: true});
          });
      }
      else{

      }
    }
  }
  render() {
    return(
      <div className="main">
        {!this.state.isFetching && !this.state.hasFetched ? (
          this.props.type == 'label' ? (
            <PickLabel
              selections={this.state.selections}
              updateSelected={this.updateSelected}
              token={this.props.token}
              fetchRecommendations={this.fetchRecommendations.bind(this)}
              />
          ) : this.props.type == 'genre' ? (
            <PickGenre
              selections={this.state.selections}
              updateSelected={this.updateSelected}
              token={this.props.token}
              fetchRecommendations={this.fetchRecommendations.bind(this)}
              options={this.props.genres}
              />
          ) :
          (
          <PickSeeds
            selections={this.state.selections}
            updateSelected={this.updateSelected}
            token={this.props.token}
            topArtists={this.props.topArtists}
            recentArtists={this.props.recentArtists}
            genreOptions={this.props.genres}
            fetchRecommendations={this.fetchRecommendations.bind(this)}
            updateSpices={this.updateSpices.bind(this)}
            />
          )
        ) : (
          <PlaylistBuild
            isFetching={this.state.isFetching}
            hasFetched={this.state.hasFetched}
            errorFetching={this.state.errorFetching}
            token={this.props.token}
            playlist={this.state.playlist}
            reset={this.reset.bind(this)}
            selections={this.state.selections}
            user={this.props.user}
            />
        )}
      </div>
    )
  }
}
