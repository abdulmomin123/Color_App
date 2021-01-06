import { createStyles } from '@material-ui/styles';

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
});
