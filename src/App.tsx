import { Component } from 'react';
import Palette from './Palette';
import { palettes } from './seedColor';

class App extends Component {
  render = () => {
    return (
      <div>
        <Palette palette={palettes[1]} />
      </div>
    );
  };
}

export default App;
