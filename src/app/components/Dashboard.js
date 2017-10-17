import React from 'react';
import TopArtists from './TopArtists';
import MyPlaylists from './MyPlaylists';

export default class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <TopArtists artists={this.props.topArtists}/>
        <MyPlaylists playlists={this.props.playlists}/>
      </div>
    )
  }
}
