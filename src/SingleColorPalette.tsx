import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import styles from './styles/SingleColorPalette';
import Navbar from './Navbar';
import Footer from './Footer';
import ColorBox from './ColorBox';

interface Props {
  palette: Interfaces.Palette;
  colorId: string;
  classes: {
    [key: string]: string;
  };
}

interface State {
  colorFormat: Interfaces.ColorFormats;
  shades: Interfaces.Color[];
}

class SingleColorPalette extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      colorFormat: 'hex',
      shades: this.gatherShades(),
    };
  }

  changeColorFormat = (colorFormat: Interfaces.ColorFormats) =>
    this.setState({ colorFormat });

  gatherShades = () => {
    const {
      palette: { colors },
      colorId,
    } = this.props;

    let shades: Interfaces.Color[] = [];

    for (let color in colors)
      shades.push(colors[color].find(color => color.colorId === colorId)!);

    return shades.slice(1);
  };

  render() {
    const { shades, colorFormat } = this.state;
    const { emoji, paletteName, id } = this.props.palette;
    const { classes } = this.props;

    const colorBoxes = shades.map(color => (
      <ColorBox
        showFullPalette={false}
        color={color}
        format={colorFormat}
        key={color[colorFormat]}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar changeColorFormat={this.changeColorFormat} />

        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>

        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
