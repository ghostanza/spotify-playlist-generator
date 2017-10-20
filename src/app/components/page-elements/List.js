import React from 'react';

export default class List extends React.Component {
  constructor(p){
    super(p);
    this.triggerSelection = this.triggerSelection.bind(this);
  }
  triggerSelection(e){
    let info = JSON.parse(e.currentTarget.dataset.info);
    this.props.toggleSelected(info);
  }
  render() {
    let selected = this.props.selections.all.map((i) => { return i.id });
    return(
      <ul className={`list ${this.props.type ? this.props.type : ''}`}>
        {this.props.items.map((i) => {
          return (
            <li key={i.id || i}
              data-info={`{"id":"${i.id || i}","name":"${i.name || i}","type":"${typeof(i)=='object' ? 'artists' : 'genres'}"}`}
              onClick={this.triggerSelection}
              className={
                (this.props.selections.artists.includes(i.id) || this.props.selections.genres.includes(i))
                ? "selected" : ""}
            >
              {
                i.images && i.images.length > 2 ?
                (<div className='select-img' style={{'backgroundImage': `url(${i.images[2].url})`}}></div>)
                : (<div className='select-img no-img'></div>)
              }
              <span className='name'>{i.name || i}</span>
            </li>
          )
        })}
        {this.props.items.length == 0 ? (<li>No Results</li>) : ''}
      </ul>
    )
  }
}
