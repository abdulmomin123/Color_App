import { Component } from 'react';
import './Palette.css';
import { withStyles, createStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';

const styles = createStyles({
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  PaletteColors: {
    height: '90vh',
  },

  PaletteFooter: {
    height: '5vh',
    fontWeight: 500,
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
});

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
