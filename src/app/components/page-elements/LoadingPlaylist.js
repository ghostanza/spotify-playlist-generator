import React from 'react';
export default class LoadingPlaylist extends React.Component {
  render() {
      return(
        <div className="loading-playlist">
          {this.props.label || "Brewing Your Mix..."}
        </div>
      )
  }
}
