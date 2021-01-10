import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as Interfacaes from './Interfaces';
import styles from './styles/PaletteListStyles';
import MiniPalette from './MiniPalette';

interface Props {
  palettes: Interfacaes.StarterPalette[];
  deletePalette: (id: string) => void;
  classes: Record<string, string>;
}

class PaletteList extends Component<Props> {
  render() {
    const { palettes, classes, deletePalette } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link className={classes.newPalette} to="palette/new">
              Create Palette
            </Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, i) => (
              <CSSTransition timeout={500} classNames="fades" key={i}>
                <MiniPalette deletePalette={deletePalette} palette={palette} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
