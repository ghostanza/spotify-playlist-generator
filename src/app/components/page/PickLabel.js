import React from 'react';
import Selections from 'page_elements/Selections';
import Search from 'page_elements/Search';
import {getFilteredArtists} from 'spotify';

export default class PickLabel extends React.Component {
  render() {
    return(
      <div>
        <h2 className='view-heading'>Label</h2>
      </div>
    )
  }
}
