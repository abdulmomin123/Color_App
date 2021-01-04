import { Component } from 'react';
import * as Interfaces from './Interfaces';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ColorBox from './ColorBox';

export default class Palette extends Component<{
  palette: Interfaces.Palette;
}> {
  state = {
    level: 500,
  };

  changeLevel = (level: number) => {
    this.setState({ level });
  };

  render() {
    const { palette } = this.props;
    const { level } = this.state;
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox key={color.name} color={color} />
    ));

    return (
      <div className="Palette">
        {/* Navbar */}
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={this.changeLevel}
        />

        {/* Color boxes */}
        <div className="Palette-colors">{colorBoxes}</div>

        {/* Footer */}
        <p>Palette</p>
      </div>
    );
  }
}
