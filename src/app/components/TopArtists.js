import React from 'react';
import ArtistList from './ArtistList';

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
  toggleOpen(e){
    e.target.classList.toggle('closed');
  }
  render() {
    return(
      <div className="top-artist-wrapper tab">
      {this.props.artists && Object.keys(this.props.artists).length > 0 ? (
        <div className="top-artists">
          <span className="tab-label closed" onClick={this.toggleOpen}>My Top Artists</span>
          <div className="top-artists-list">
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
            <ArtistList
              artists={this.props.artists[this.state.topTime]}
              selected={this.props.selected}
              toggleSelected={this.toggleSelected}/>
          </div>
        </div>
        ) : ''}
        </div>
    )
  }
}
