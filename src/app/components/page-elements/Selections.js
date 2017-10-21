import React from 'react';
import List from 'page_elements/List';

export default class Selections extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      prevRemovedSelections: []
    }
  }
  undo(){
    let newUndoArray = Array.from(this.state.prevRemovedSelections);
    this.props.toggleSelected(newUndoArray.pop());
    this.setState({prevRemovedSelections: newUndoArray});
  }
  toggleSelected(e){
    let info = JSON.parse(e.currentTarget.dataset.info);
    this.props.toggleSelected(info);
    this.setState((p) => {
      return { prevRemovedSelections: [...p.prevRemovedSelections, info]}
    })
  }
  toggleList(e){
    let tabs = document.querySelectorAll('.tab-label');
    if(this.props.selections.all.length){
      tabs.forEach((i) => {
        !i.classList.contains('closed') ? i.classList.add('closed') : '';
      })
      if(e.currentTarget.classList.contains('open')){
        this.setState({ prevRemovedSelections: []});
      }
      e.currentTarget.classList.toggle('open');
    } else if( e.target.classList.contains('open')){
      e.currentTarget.classList.remove('open');
      this.setState({ prevRemovedSelections: []})
    }
  }
  render() {
    return(
      <div className="selections">
        <div className="selections-toggle" onClick={this.toggleList.bind(this)}>My Selections
          {Array.apply(null,{length: 5}).map((v,i)=>{
              return(
                <span className={`indicator ${this.props.selections.all.length >= (i+1) ? 'filled' : ''}`} key={i}></span>
              )
            })
          }
          {this.props.selections.all.length == 5 ? (<span className="maximum">Max Reached</span>) : ''}
        </div>
        <div className="selections-list">
          <ul>
            { this.state.prevRemovedSelections.length ? (<li className="undo" onClick={this.undo.bind(this)}>Undo Previous Removal</li>) : '' }
            {this.props.selections.all.map((i)=>{
              return(
                <li key={i.id} data-type={i.type} data-info={JSON.stringify(i)} onClick={this.toggleSelected.bind(this)}>
                  <span className='selection-name'>{i.name}</span>
                  <span className='selection-remove'>X</span>
                </li>
              )
            })}
            <li className="build" onClick={this.props.fetchRecommendations}>Build Playlist</li>
          </ul>
        </div>
      </div>
    )
  }
}
