import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  palette: Interfaces.Palette;
  classes: {
    [key: string]: string;
  };
}

interface State {
  colorFormat: Interfaces.ColorFormats;
  level: number;
}

class Palette extends Component<Props, State> {
  state: { colorFormat: Interfaces.ColorFormats; level: number } = {
    level: 500,
    colorFormat: 'hex',
  };

  changeLevel = (level: number) => this.setState({ level });

  changeColorFormat = (colorFormat: Interfaces.ColorFormats) =>
    this.setState({ colorFormat });

  render() {
    const { palette, classes } = this.props;
    const { paletteName, emoji } = palette;
    const { level } = this.state;
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox
        showFullPalette={true}
        color={color}
        format={this.state.colorFormat}
        key={color.name}
      />
    ));

    return (
      <div className={classes.Palette}>
        {/* Navbar */}
        <Navbar
          level={this.state.level}
          changeLevel={this.changeLevel}
          changeColorFormat={this.changeColorFormat}
        />

        {/* Color boxes */}
        <div className={classes.PaletteColors}>{colorBoxes}</div>

        {/* Footer */}
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
