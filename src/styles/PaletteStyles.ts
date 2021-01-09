import { createStyles } from '@material-ui/styles';
import sizes from './sizes';

export default createStyles({
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  PaletteColors: {
    height: '90vh',
  },
  PaletteFooter: {
    height: '5vh',
    fontWeight: 500,
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
  [sizes.down('lg')]: {
    width: '25%',
    height: '33.3333%',
  },
  [sizes.down('md')]: {
    width: '50%',
    height: '20%',
  },
  [sizes.down('xs')]: {
    width: '100%',
    height: '10%',
  },
});
