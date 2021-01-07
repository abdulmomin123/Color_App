import { createStyles } from '@material-ui/styles';

export default createStyles({
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
    padding: '1rem 0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
  link: {
    textDecoration: 'none',
  },
  newPalette: {
    textDecoration: 'none',
    color: 'white',
    padding: '.4rem .9rem',
    background: '#45c932',
    borderRadius: '6px',
    transition: 'box-shadow .2s',

    '&:hover': {
      boxShadow: '0 5px 10px rgba(0,0,0, 0.4)',
    },
  },
});
