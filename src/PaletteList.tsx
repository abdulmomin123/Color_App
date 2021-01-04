import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Interfacaes from './Interfaces';

export default class PaletteList extends Component<{
  palettes: Interfacaes.StarterPalette[];
}> {
  render() {
    const { palettes } = this.props;

    return (
      <div>
        <h1>React Colors</h1>

        {palettes.map(palette => (
          <Link to={`/palette/${palette.id}`}>{palette.paletteName} </Link>
        ))}
      </div>
    );
  }
}
