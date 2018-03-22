import React from 'react';

export default class Logo extends React.Component {
  render() {
    return(
      <div className={`logo ${this.props.size ? this.props.size : ''}`} onClick={this.props.onClick}><span>A</span>C</div>
    )
  }
}
