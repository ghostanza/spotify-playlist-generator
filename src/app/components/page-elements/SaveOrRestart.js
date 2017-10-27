import React from 'react';

export default class SaveOrRestart extends React.Component {
  render() {
    return(
      <div className='save-or-restart'>
        {!this.props.errorSaving && this.props.tracks.length ? (
          <div className='heading'>
            We built you a {this.props.tracks.length}-track mix!
            <div className='based-on'>
              Based on:&nbsp;
              {this.props.selections.all.map((v,i)=>{
                return (
                  <span key={v.id}>
                    {
                      i+2 == this.props.selections.all.length ? `${v.name} & `
                      : i==0 && i==this.props.selections.all.length-1 ? `${v.name}`
                      : i > 0 && i==this.props.selections.all.length-1 ? `${v.name}`
                      : `${v.name}, `
                    }
                  </span>
                )
              })}
            </div>
            <div className='playlist-artists'>Featuring:&nbsp;
              {Array.apply(null, {length: this.props.tracks.length > 4 ? 4 : this.props.tracks.length}).map((v,i) => {
                return (
                  i == this.props.tracks.length-1 ? (<span key={this.props.tracks[i].id}>and {this.props.tracks[i].artists[0].name}. </span>)
                  : (<span key={this.props.tracks[i].id}>{this.props.tracks[i].artists[0].name}, </span>)
                )
              })}
              {this.props.tracks.length > 4 ? ('and more!') : ''}
            </div>
          </div>
        ) : !this.props.tracks.length ? (<div className='heading'>We're sorry. We were unable to find tracks that met your criteria. <div onClick={this.props.restart} className='restart'>Try Again</div></div>)
        : ( <div className='heading'>There was an error saving the mix. Try again?</div>)
      }
      {
        !this.props.isSaving && this.props.tracks.length ? (
          <div>
            <div onClick={this.props.save} className='save'>Save</div>
            <div onClick={this.props.restart} className='restart'>Start Over</div>
          </div>
        ) : this.props.isSaving ? (<div className='is-saving'></div>) : ''
      }
      </div>
    )
  }
}
