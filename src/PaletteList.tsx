import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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
    const miniPalettes = palettes.map(palette => (
      <MiniPalette deletePalette={deletePalette} palette={palette} />
    ));

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link className={classes.newPalette} to="palette/new">
              Create Palette
            </Link>
          </nav>
          <div className={classes.palettes}>{miniPalettes}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
