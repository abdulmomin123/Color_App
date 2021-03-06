import chroma from 'chroma-js';
import { createStyles } from '@material-ui/styles';
import * as Interfaces from '../Interfaces';
import sizes from './sizes';

interface Props {
  color: Interfaces.NewColor;
}

export default createStyles<any, Props>({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: '20%',
    height: '25%',
    background: ({ color: { color } }: { color: { color: string } }) => color,
    margin: '0 auto',
    cursor: 'pointer',
    marginBottom: '-6.1px',

    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },

    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: ({ color: { color } }) =>
      chroma(color).luminance() >= 0.1
        ? 'rgba(0,0,0,.8)'
        : 'rgba(255,255,255,.8)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
});
