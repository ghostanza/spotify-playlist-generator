import React from 'react';

export default class SelectionMeter extends React.Component {
  render() {
    return(
      <div className="selection-meter">
        {
            Array.apply(null, {length: 5}).map((v,i)=>{
              return (
                <div
                  key={i}
                  className={`meter-item ${this.props.selections.length >= (i+1) ? 'active' : ''}`}>
                </div>
              )
            })
        }
      </div>
    )
  }
}
