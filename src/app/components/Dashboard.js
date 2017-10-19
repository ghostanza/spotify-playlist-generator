import React from 'react';
import TopArtists from './TopArtists';
import MyPlaylists from './MyPlaylists';
import List from './List';
import Search from './Search';
import SelectionMeter from './SelectionMeter';
import Tab from './Tab';

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
          <List items={this.props.genres} toggleSelected={this.updateSelected} selections={this.state.selections}/>
        </Tab>
        <SelectionMeter selections={this.state.selections}/>
      </div>
    )
  }
}
