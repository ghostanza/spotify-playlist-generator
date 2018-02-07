import React from 'react';
import Selections from 'page_elements/Selections';
import Search from 'page_elements/Search';
import List from 'page_elements/List';
import {getFilteredArtists, getRecommendations} from 'spotify';

export default class PickGenre extends React.Component {
  constructor(p){
    super(p);
    this.state={
      fetchMulti:false
    }
  }
  toggleMulti(){
    this.setState((p) => ({fetchMulti: !p.fetchMulti}));
  }
  render() {
    return(
      <div>
        Genre
        <p>Allow Multi: {this.state.fetchMulti ? "YES" : "NO"}</p>
        <label htmlFor='multi'>Allow multi?</label>
        <input id='multi' type="checkbox" checked={this.state.fetchMulti} onChange={this.toggleMulti.bind(this)}/>
        <List items={this.props.options} fetchImmediately={!this.state.fetchMulti} toggleSelected={this.props.updateSelected} selections={this.props.selections}/>
        <div onClick={this.props.fetchRecommendations}>Fetch</div>
      </div>
    )
  }
}
