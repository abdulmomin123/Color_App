import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import { palettes } from './seedColor';
import { generatePalette } from './colorHelpers';

class App extends Component {
  findPalette = (id: string) => palettes.find(palette => palette.id === id);

  render = () => {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PaletteList palettes={palettes} />}
          />

          <Route
            exact
            path="/palette/:id"
            render={rProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(rProps.match.params.id)!
                )}
              />
            )}
          />
        </Switch>
      </div>
    );
  };
}

export default App;
