import React from 'react';

export default class SaveOrRestart extends React.Component {
  render() {
    return(
      <div className='save-or-restart'>
        {!this.props.errorSaving ? (
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
              {Array.apply(null, {length: 4}).map((v,i) => {
                return <span key={this.props.tracks[i].id}>{this.props.tracks[i].artists[0].name}, </span>
              })}
              and more!
            </div>
          </div>
        ) : ( <div className='heading'>There was an error saving the mix. Try again?</div>)
      }
      {
        !this.props.isSaving ? (
          <div>
            <div onClick={this.props.save} className='save'>Save</div>
            <div onClick={this.props.restart} className='restart'>Start Over</div>
          </div>
        ) : (<div className='is-saving'></div>)
      }
      </div>
    )
  }
}
