import { Component } from 'react';
import './Palette.css';
import * as Interfaces from './Interfaces';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

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
        <Navbar level={this.state.level} changeLevel={this.changeLevel} />

        {/* Color boxes */}
        <div className="Palette-colors">{colorBoxes}</div>

        {/* Footer */}
        <p>Palette</p>
      </div>
    );
  }
}
