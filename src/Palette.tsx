import { Component } from 'react';
import * as Interfaces from './Interfaces';
import './Palette.css';
import ColorBox from './ColorBox';

export default class Palette extends Component<{
  palette: Interfaces.Palette;
}> {
  render() {
    const { palette } = this.props;
    const colorBoxes = palette.colors.map(color => (
      <ColorBox key={color.name} color={color} />
    ));

    return (
      <div className="Palette">
        {/* Navbar */}

        {/* Color boxes */}
        <div className="Palette-colors">{colorBoxes}</div>

        {/* Footer */}
        <p>Palette</p>
      </div>
    );
  }
}
