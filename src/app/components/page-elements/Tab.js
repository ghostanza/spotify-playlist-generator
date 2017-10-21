import React from 'react';

export default class Tab extends React.Component {
  toggleOpen(e){
    let tabs = document.querySelectorAll('.tab-label'),
        selectionsList = document.querySelector('.selections-toggle');
    tabs.forEach((tab)=>{
      if(tab != e.target){
        !tab.classList.contains('closed') ? tab.classList.add('closed') : '';
      }
    })
    selectionsList.classList.contains('open') ? selectionsList.classList.remove('open') : '';
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
