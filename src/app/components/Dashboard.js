import React from 'react';
import TopArtists from './TopArtists';
import MyPlaylists from './MyPlaylists';
import SelectionMeter from './SelectionMeter';

export default class Dashboard extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      selected: []
    }
    this.updateSelected = this.updateSelected.bind(this);
  }
  updateSelected(id){
    let newSelected = Array.from(this.state.selected);
    // the max number of items we can send is 5
    if(newSelected.length <= 4){
      if(newSelected.includes(id)){
        newSelected.splice(newSelected.indexOf(id), 1);
      } else{
        newSelected.push(id);
      }
      this.setState((prev) => {
        return { ...prev, selected: newSelected }
      });
    }
    // if there are more than 4 items in the selection list
    // allow for items to be removed but not added
    else if(newSelected.includes(id)){
        newSelected.splice(newSelected.indexOf(id), 1);
        this.setState((prev) => {
          return { ...prev, selected: newSelected }
        });
    }
  }
  render() {
    return(
      <div>
        <TopArtists artists={this.props.topArtists} updateSelected={this.updateSelected} selected={this.state.selected}/>
        <SelectionMeter selected={this.state.selected}/>
      </div>
    )
  }
}
