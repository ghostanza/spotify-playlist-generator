import React from 'react';

export default class Tab extends React.Component {
  toggleOpen(e){
    e.target.classList.toggle('closed');
  }
  render() {
    return(
      <div className='tab'>
        {this.props.label ? (<span className='tab-label closed' onClick={this.toggleOpen}>{this.props.label}</span>) : ''}
        <div className='tab-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
