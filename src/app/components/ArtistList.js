import React from 'react';

export default class ArtistList extends React.Component {
  constructor(p){
    super(p);
    this.triggerSelection = this.triggerSelection.bind(this);
  }
  triggerSelection(e){
    let id = e.currentTarget.dataset.id;
    this.props.toggleSelected(id);
  }
  render() {
    return(
      <ul>
        {this.props.artists.map((i) => {
          return (
            <li key={i.id}
              data-id={i.id}
              onClick={this.triggerSelection}
              className={this.props.selected.includes(i.id) ? "selected" : ""}>
              {i.images && i.images.length > 2 ? (<div className='artist-img' style={{'backgroundImage': `url(${i.images[2].url})`}}></div>) : ''}
              <span className='artist-name'>{i.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
