import React from 'react';

export default class TopArtists extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      topTime: 'short_term',
      timeOptions: [{type: 'short_term', label: 'Recent'}, {type: 'medium_term', label: '6 Months'},{type: 'long_term', label: 'All Time'} ]
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
  }
  handleTimeChange(e){
    let val = e.target.value;
    this.setState((p) => {
      return { ...p, topTime: val}
    });
  }
  toggleSelected(e){
    let id = e.currentTarget.dataset.id;
    this.props.updateSelected(id);
  }
  render() {
    console.log(this.state);
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
                return (
                  <li key={`${this.state.topTime}${i.id}`}
                    data-id={i.id}
                    onClick={this.toggleSelected}
                    className={this.props.selected.indexOf(i.id) >= 0 ? "selected" : ""}>
                    {i.images && i.images.length > 2 ? (<div className='artist-img' style={{'backgroundImage': `url(${i.images[2].url})`}}></div>) : ''}
                    <span className='artist-name'>{i.name}</span>
                  </li>
                )
              })}
            </ul>
        </div>
        ) : ''}
        </div>
    )
  }
}
