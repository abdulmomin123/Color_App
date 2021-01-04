import { Component } from 'react';
import './Palette.css';
import * as Interfaces from './Interfaces';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

export default class Palette extends Component<{
  palette: Interfaces.Palette;
}> {
  state: { colorFormat: Interfaces.ColorFormats; level: number } = {
    level: 500,
    colorFormat: 'hex',
  };

  changeLevel = (level: number) => {
    this.setState({ level });
  };

  changeColorFormat = (colorFormat: Interfaces.ColorFormats) => {
    this.setState({ colorFormat });
  };

  render() {
    const { palette } = this.props;
    const { level } = this.state;
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox
        key={color.name}
        color={color}
        format={this.state.colorFormat}
      />
    ));

    return (
      <div className="Palette">
        {/* Navbar */}
        <Navbar
          level={this.state.level}
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />

        {/* Color boxes */}
        <div className="Palette-colors">{colorBoxes}</div>

        {/* Footer */}
        <p>Palette</p>
      </div>
    );
  }
}
