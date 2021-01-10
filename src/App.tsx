import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Interfaces from './Interfaces';
import { palettes } from './seedColor';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page';

interface State {
  palettes: Interfaces.StarterPalette[];
}

class App extends Component<{}, State> {
  state = {
    palettes: JSON.parse(localStorage.getItem('palettes')!) || palettes,
  };

  saveToLocalStorage = () =>
    localStorage.setItem('palettes', JSON.stringify(this.state.palettes));

  componentDidMount = () => this.saveToLocalStorage();
  componentDidUpdate = () => this.saveToLocalStorage();

  findPalette = (id: string) => {
    const palettes = this.state.palettes as Interfaces.StarterPalette[];
    return palettes.find(palette => palette.id === id);
  };

  savePalette = (newPalette: Interfaces.StarterPalette) =>
    this.setState({ palettes: [...this.state.palettes, newPalette] });

  deletePalette = (id: string) => {
    const palettes = this.state.palettes as Interfaces.StarterPalette[];
    this.setState({
      palettes: palettes.filter(palette => palette.id !== id),
    });
  };

  render = () => {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                {/* Home route or Palette list route */}
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )}
                />

                {/* Create new palette route */}
                <Route
                  exact
                  path="/palette/new"
                  render={rProps => (
                    <Page>
                      <NewPaletteForm
                        palettes={this.state.palettes}
                        savePalette={this.savePalette}
                        rProps={rProps}
                      />
                    </Page>
                  )}
                />

                {/* Single color palette route */}
                <Route
                  exact
                  path="/palette/:id"
                  render={rProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(rProps.match.params.id)!
                        )}
                      />
                    </Page>
                  )}
                />

                {/* Shades of a color route */}
                <Route
                  exact
                  path="/palette/:id/:color"
                  render={({ match }) => (
                    <Page>
                      <SingleColorPalette
                        colorId={match.params.color}
                        palette={generatePalette(
                          this.findPalette(match.params.id)!
                        )}
                      />
                    </Page>
                  )}
                />

                {/* 404 Route */}
                <Route render={() => '404'} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  };
}

export default App;
