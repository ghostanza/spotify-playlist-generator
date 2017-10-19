import React from 'react';

export default class List extends React.Component {
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
      <ul className={`list ${this.props.type ? this.props.type : ''}`}>
        {this.props.items.map((i) => {
          return (
            <li key={typeof(i)=='object' ? i.id : i }
              data-id={typeof(i)=='object' ? i.id : i }
              onClick={this.triggerSelection}
              className={
                (this.props.selections.includes(i.id) || this.props.selections.includes(i))
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
