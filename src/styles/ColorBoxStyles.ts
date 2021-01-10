import chroma from 'chroma-js';
import { createStyles } from '@material-ui/styles';
import * as Interfaces from '../Interfaces';
import sizes from './sizes';

interface Props {
  color: Interfaces.Color;
  showFullPalette: boolean;
}

export default createStyles<any, Props>({
  dynamicTextColor: {
    color: ({ color: { hex } }: { color: { hex: string } }) =>
      chroma(hex).luminance() >= 0.1
        ? 'rgba(0,0,0,.8)'
        : 'rgba(255,255,255,.8)',
  },
  colorBox: {
    width: '20%',
    height: ({ showFullPalette }) => (showFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-6.1px',

    '&:hover button': {
      opacity: 1,
      transition: 'opacity 0.5s',
    },

    // Media Queries
    [sizes.down('lg')]: {
      width: '25%',
      height: ({ showFullPalette }) => (showFullPalette ? '20%' : '33.3333%'),
    },
    [sizes.down('md')]: {
      width: '50%',
      height: ({ showFullPalette }) => (showFullPalette ? '10%' : '20%'),
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: ({ showFullPalette }) => (showFullPalette ? '5%' : '10%'),
    },
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    color: 'white',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
    opacity: '0',
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  copyMsg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',

    '& h1': {
      fontWeight: 400,
      textShadow: '1px 2px black',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',

      [sizes.down('xs')]: {
        fontSize: '6rem',
      },
    },

    '& p': {
      fontsize: '2rem',
      fontWeight: '100',
    },
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: 10,
    position: 'absolute',
  },
  showMsg: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: 25,
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
  },
});
