import { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import * as Interfacaes from './Interfaces';
import MiniPalette from './MiniPalette';

const styles = createStyles({
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
});

interface Props {
  palettes: Interfacaes.StarterPalette[];
  classes: Record<string, string>;
}

class PaletteList extends Component<Props> {
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette palette={palette} key={palette.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);