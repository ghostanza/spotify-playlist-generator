import React from 'react';

export default class MyPlaylists extends React.Component {
  render() {
    return(
      <div className="my-playlists-wrapper">
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
