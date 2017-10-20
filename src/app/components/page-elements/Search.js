import React from 'react';
import List from './List';
import {getSearchResults} from 'spotify';

export default class Search extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      results: [],
      searchTerm: ''
    }
    this.toggleSelected = this.toggleSelected.bind(this);
  }
  toggleSelected(id){
    this.props.updateSelected(id);
  }
  updateSearchTerm(e){
    this.setState({ searchTerm: e.target.value });
  }
  handleSubmit(e){
    let textInput = e.currentTarget.children[0];
    e.preventDefault();
    if(this.props.token && this.state.searchTerm){
      getSearchResults(this.props.token, 'artist', this.state.searchTerm).then((res) => {
        if(res.data.artists && res.data.artists.items.length > 0){
          textInput.value='';
          textInput.blur();
          this.setState({results: res.data.artists.items, searchTerm: ''});
        } else{
          this.setState({results:[]});
        }
      });
    }
  }
  render() {
    return(
      <div className="search">
        <div className="search-form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Enter Artist Name" onChange={this.updateSearchTerm.bind(this)}/>
            <button type="submit">Search</button>
          </form>
        </div>
        <List items={this.state.results} toggleSelected={this.toggleSelected} selections={this.props.selections}/>
      </div>
    )
  }
}
