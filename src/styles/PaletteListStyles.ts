import { createStyles } from '@material-ui/styles';
import sizes from './sizes';
import bg from './bg.svg';

export default createStyles({
  '@global': {
    '.fades-exit': {
      opacity: 1,
    },
    '.fades-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out',
    },
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out',
    },
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    backgroundColor: '#394bad',
    background: `url(${bg})`,
    overflowY: 'scroll',
  },
  heading: {
    fontSize: '2rem',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',

    [sizes.down('xl')]: {
      width: '80%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },
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
    gridGap: '2.5rem',

    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem',
    },
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
