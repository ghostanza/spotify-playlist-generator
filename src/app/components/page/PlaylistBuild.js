import React from 'react';

export default class PlaylistBuild extends React.Component {
  render() {
    return(
      <div>
        {this.props.isFetching ? (<h2>Building...</h2>)
          : !this.props.isFetching && !this.props.errorFetching ? (<div>Built!<div onClick={this.props.reset}>Reset</div></div>) 
          : (<div>Errors...</div>) }
      </div>
    )
  }
}
