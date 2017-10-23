import React from 'react';
import {createPlaylist, addPlaylistTracks} from 'spotify';
import LoadingPlaylist from 'page_elements/LoadingPlaylist';
import SaveOrRestart from 'page_elements/SaveOrRestart';
import ViewOrContinue from 'page_elements/ViewOrContinue';

export default class PlaylistBuild extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      customPlaylistName: '',
      hasSaved: false,
      playlistURL: '',
      errorSaving: false,
      isSaving: false
    }
  }
  buildPlaylist(){
    this.setState({ isSaving: true });
    let name = this.state.customPlaylistName || '';
    if(!name){
      let builtName = this.props.selections.all.map((i) => { return i.name });
      name = `MixIt - ${builtName.join(', ')}`;
    }
    createPlaylist(this.props.token, this.props.user.id, name).then((res) => {
      if(res.status == 201 || res.status == 200){
        let url = res.data.external_urls.spotify;
        if(url){
          this.setState({playlistURL: url});
        }
        let tracks = this.props.playlist.tracks.map((i) => { return i.uri });
        addPlaylistTracks(this.props.token, this.props.user.id, res.data.id, tracks).then((res) => {
          this.setState({hasSaved: true, isSaving:false});
        }).catch((err) => {
          this.setState({isSaving: false, errorSaving: true});
        })
      }
    }).catch((err) => {
      this.setState({isSaving: false, errorSaving: true});
    });
  }
  render() {
    return(
      <div className="playlist-build">
        {this.props.isFetching ? (<LoadingPlaylist />)
          : !this.props.isFetching && !this.props.errorFetching && !this.state.hasSaved ? (
              <SaveOrRestart
                tracks={this.props.playlist.tracks}
                save={this.buildPlaylist.bind(this)}
                restart={this.props.reset}
                isSaving={this.state.isSaving}
                hasSaved={this.state.hasSaved}
                errorSaving={this.state.errorSaving}
                selections={this.props.selections}
                />
            )
          : this.state.hasSaved && this.state.playlistURL ? (<ViewOrContinue url={this.state.playlistURL} restart={this.props.reset}/>)
          : (<div>We are currently having some issues. Please <span onClick={this.props.reset}>CLICK HERE</span> to start over</div>)
        }
      </div>
    )
  }
}
