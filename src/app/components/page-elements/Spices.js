import React from 'react';

export default class Spices extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      spiceOptions: [
        {name: 'instrumentalness', label: 'instrumental'},
        {name: 'danceability', label: 'dancey'},
        {name: 'energy', label: 'energy'},
        {name: 'popularity', label: 'popularity'},
        {name: 'valence', label: 'positivity'}
      ],
      spiceSelections: {},
      defaultVals: {
        danceability: 0.5,
        energy: 0.5,
        instrumentalness: 0.5,
        popularity: 0.5,
        valence: 0.5
      }
    }
  }
  handleChange(e){
    let name = e.target.dataset.name,
        val = e.target.value,
        newState = Object.assign({}, this.state);
    newState.spiceSelections[name] = val;
    this.setState(newState);
    this.props.updateSpices(newState.spiceSelections);
  }
  render() {
    return(
      <div className="spices">
        <h3>Adjust for more specific selections.</h3>
        <p>Note: This may affect our ability to find matches</p>
        {this.state.spiceOptions.map((i) => {
          return (
            <div className="spice-selector" key={i.label}>
              <p className="spice-label">
                {i.label}
                <span className={`value ${this.state.spiceSelections[i.name] && this.state.spiceSelections[i.name] != this.state.defaultVals[i.name] ? 'adjusted' : ''}`}>
                  { this.state.spiceSelections[i.name]
                  && this.state.spiceSelections[i.name] != this.state.defaultVals[i.name]
                  ? ` ${this.state.spiceSelections[i.name]}/1.0`
                  : ` (default)` }
                </span>
              </p>
              <input
                data-name={i.name}
                type="range"
                value={this.state.spiceSelections[i.name] || this.state.defaultVals[i.name]}
                step='0.025' min='0' max='1'
                onChange={this.handleChange.bind(this)}
                />
            </div>
          )
        })}
      </div>
    )
  }
}
