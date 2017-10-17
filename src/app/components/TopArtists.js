import React from 'react';

export default class TopArtists extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      topTime: 'short_term',
      timeOptions: [{type: 'short_term', label: 'Recent'}, {type: 'medium_term', label: '6 Months'},{type: 'long_term', label: 'All Time'} ]
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }
  handleTimeChange(e){
    let val = e.target.value;
    this.setState((p) => {
      return { ...p, topTime: val}
    });
  }
  render() {
    return(
      <div className="top-artist-wrapper">
      {this.props.artists && Object.keys(this.props.artists).length > 0 ? (
        <div className="top-artists">
          <h3>My Top Artists</h3>
            <select value={this.state.topTime} onChange={this.handleTimeChange}>
              {this.state.timeOptions.map((i)=>{
                return <option value={i.type} key={i.type}>{i.label}</option>
              })}
            </select>
            <ul>
              {this.props.artists[this.state.topTime].map((i) => {
                return <li key={`${this.state.topTime}${i.id}`}>{i.name}</li>
              })}
            </ul>
        </div>
        ) : ''}
        </div>
    )
  }
}
