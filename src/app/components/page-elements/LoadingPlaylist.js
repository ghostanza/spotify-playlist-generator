import React from 'react';
import Logo from '../Logo';
export default class LoadingPlaylist extends React.Component {
  render() {
      return(
        <div className="loading-playlist">
          <Logo size="large"/>
        </div>
      )
  }
}
