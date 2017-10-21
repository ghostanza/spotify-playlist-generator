import React from 'react';
import Tab from 'page_elements/Tab';
import Search from 'page_elements/Search';
import TopArtists from 'page_elements/TopArtists';
import List from 'page_elements/List';
import Selections from 'page_elements/Selections';

export default class PickSeeds extends React.Component {
  render() {
    return(
      <div>
        <Tab label="Search For Artists">
          <Search selections={this.props.selections} updateSelected={this.props.updateSelected} token={this.props.token}/>
        </Tab>
        <Tab label="My Top Artists">
          <TopArtists artists={this.props.topArtists} updateSelected={this.props.updateSelected} selections={this.props.selections}/>
        </Tab>
        <Tab label="Genre Options">
          <List items={this.props.genreOptions} type='genres' toggleSelected={this.props.updateSelected} selections={this.props.selections}/>
        </Tab>
        <Selections selections={this.props.selections} toggleSelected={this.props.updateSelected} fetchRecommendations={this.props.fetchRecommendations}/>
      </div>
    )
  }
}
