import { Component } from 'react';
import './Palette.css';
import * as Interfaces from './Interfaces';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

interface Props {
  palette: Interfaces.Palette;
}

interface State {
  colorFormat: Interfaces.ColorFormats;
  level: number;
}

export default class Palette extends Component<Props, State> {
  state: { colorFormat: Interfaces.ColorFormats; level: number } = {
    level: 500,
    colorFormat: 'hex',
  };

  changeLevel = (level: number) => this.setState({ level });

  changeColorFormat = (colorFormat: Interfaces.ColorFormats) =>
    this.setState({ colorFormat });

  render() {
    const { palette } = this.props;
    const { paletteName, emoji } = palette;
    const { level } = this.state;
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox
        showLink={true}
        color={color}
        format={this.state.colorFormat}
        key={color.name}
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
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}
