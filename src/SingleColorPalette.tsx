import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import sizes from './styles/sizes';
import Navbar from './Navbar';
import Footer from './Footer';
import ColorBox from './ColorBox';

const styles = createStyles({
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  PaletteColors: {
    height: '90vh',
  },
  goBack: {
    width: '20%',
    height: '50%',
    background: '#000',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-6.5px',
    opacity: 1,

    '& a': {
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: 'center',
      textDecoration: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      lineHeight: '30px',
      color: 'white',
      textTransform: 'uppercase',
    },

    [sizes.down('lg')]: {
      width: '25%',
      height: '33.3333%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%',
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '10%',
    },
  },
});

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
