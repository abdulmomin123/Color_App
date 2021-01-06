import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import { palettes } from './seedColor';
import { generatePalette } from './colorHelpers';

class App extends Component {
  findPalette = (id: string) => palettes.find(palette => palette.id === id);

  render = () => {
    return (
      <div>
        <Switch>
          {/* Home route */}
          <Route
            exact
            path="/"
            render={rProps => (
              <PaletteList rProps={rProps} palettes={palettes} />
            )}
          />

          {/* Single color palette route */}
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

          {/* Shades of a color route */}
          <Route
            exact
            path="/palette/:id/:color"
            render={({ match }) => (
              <SingleColorPalette
                colorId={match.params.color}
                palette={generatePalette(this.findPalette(match.params.id)!)}
              />
            )}
          />

          {/* 404 Route */}
          <Route render={() => '404'} />
        </Switch>
      </div>
    );
  };
}

export default App;
