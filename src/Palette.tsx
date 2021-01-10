import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './styles/PaletteStyles';

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
    const { level, colorFormat } = this.state;
    const { paletteName, emoji } = palette;
    const colorBoxes = palette.colors[level].map(color => (
      <ColorBox
        showFullPalette={true}
        color={color}
        format={colorFormat}
        key={color.name}
      />
    ));

    return (
      <div className={classes.Palette}>
        {/* Navbar */}
        <Navbar
          level={level}
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
