import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Interfaces from './Interfaces';
import Navbar from './Navbar';
import Footer from './Footer';
import ColorBox from './ColorBox';

interface Props {
  palette: Interfaces.Palette;
  colorId: string;
}

interface State {
  colorFormat: Interfaces.ColorFormats;
  shades: Interfaces.Color[];
}

export default class SingleColorPalette extends Component<Props, State> {
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

    const colorBoxes = shades.map(color => (
      <ColorBox
        showFullPalette={false}
        color={color}
        format={colorFormat}
        key={color[colorFormat]}
      />
    ));

    return (
      <div className="Palette SingleColorPalette">
        <Navbar changeColorFormat={this.changeColorFormat} />

        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              Go Back
            </Link>
          </div>
        </div>

        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
