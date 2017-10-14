import React from 'react';

export default class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <h2>{this.props.token != 'undefined' ? "HAS TOKEN" : "UNDEFINED TOKEN"}</h2>
      </div>
    )
  }
}
