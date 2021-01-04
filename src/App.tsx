import { Component } from 'react';
import Palette from './Palette';
import { palettes } from './seedColor';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render = () => {
    return (
      <div>
        <Palette palette={generatePalette(palettes[1])} />
      </div>
    );
  };
}

export default App;
