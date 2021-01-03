import { Component } from 'react';
import * as Interfaces from './Interfaces';

export default class Palette extends Component<
  {
    palette: Interfaces.Palette;
  },
  {}
> {
  render() {
    return (
      <div className="Palette">
        {/* Navbar */}

        {/* Color boxes */}
        <div className="Palette-colors"></div>

        {/* Footer */}
        <p>Palette</p>
      </div>
    );
  }
}
