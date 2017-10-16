import React from 'react';

export default class Dashboard extends React.Component {
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
      <div>
        {this.props.topArtists && Object.keys(this.props.topArtists).length > 0 ? (
          <div className="top-artists">
            <h3>My Top Artists</h3>
              <select value={this.state.topTime} onChange={this.handleTimeChange}>
                {this.state.timeOptions.map((i)=>{
                  return <option value={i.type} key={i.type}>{i.label}</option>
                })}
              </select>
              <ul>
                {this.props.topArtists[this.state.topTime].map((i) => {
                  return <li key={`${this.state.topTime}${i.id}`}>{i.name}</li>
                })}
              </ul>
          </div>
          ) : ''}
          { this.props.playlists.length > 0 ? (
            <div className="playlists">
              <h3>My Playlists</h3>
                <ul>
                  {this.props.playlists.map((i) => {
                    return <li key={`${i.uri}${i.id}`}><p style={{fontWeight: 'bold', margin: '0'}}>{i.name} <span style={{fontSize: '12px', margin: '0'}}>({i.tracks.total} Tracks)</span></p></li>
                  })}
                </ul>
            </div>
          ) : ''}
      </div>
    )
  }
}
