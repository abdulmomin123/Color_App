import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as Interfacaes from './Interfaces';
import styles from './styles/PaletteListStyles';
import MiniPalette from './MiniPalette';

interface Props {
  palettes: Interfacaes.StarterPalette[];
  classes: Record<string, string>;
}

class PaletteList extends Component<Props> {
  render() {
    const { palettes, classes } = this.props;
    const miniPalettes = palettes.map(palette => (
      <Link
        className={classes.link}
        key={palette.id}
        to={`/palette/${palette.id}`}
      >
        <MiniPalette palette={palette} />
      </Link>
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
