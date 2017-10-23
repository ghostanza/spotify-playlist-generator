import React from 'react';

export default class ViewOrContinue extends React.Component {
  render() {
    return(
      <div className='view-or-continue'>
        <div className='view-on-spotify'><a href={this.props.url} target="_blank">View On Spotify</a></div>
        <div className='make-more' onClick={this.props.restart}>Make More Mixes</div>
      </div>
    )
  }
}
