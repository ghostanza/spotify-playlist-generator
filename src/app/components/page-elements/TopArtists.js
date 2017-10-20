import React from 'react';
import List from './List';

export default class TopArtists extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      topTime: 'short_term',
      timeOptions: [
        {type: 'short_term', label: 'Recent'},
        {type: 'medium_term', label: '6 Months'},
        {type: 'long_term', label: 'All Time'}
      ]
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
  }
  handleTimeChange(e){
    let val = e.target.dataset.range;
    this.setState((p) => {
      return { ...p, topTime: val}
    });
  }
  toggleSelected(id){
    this.props.updateSelected(id);
  }
  render() {
    return(
      <div className="top-artists">
      {this.props.artists && Object.keys(this.props.artists).length > 0 ? (
        <div className="top-artists-content">
            <div className="time-range-container">
              {this.state.timeOptions.map((i)=>{
                return (
                  <span
                    className={`time-range ${i.type === this.state.topTime ? 'active' : ''}`}
                    data-range={i.type}
                    key={i.type}
                    onClick={this.handleTimeChange}>{i.label}</span>
                )
              })}
            </div>
            <List
              items={this.props.artists[this.state.topTime]}
              selections={this.props.selections}
              toggleSelected={this.toggleSelected}/>
        </div>
      ) : ('')}
      </div>
    )
  }
}
