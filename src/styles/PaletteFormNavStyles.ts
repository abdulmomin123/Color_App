import { createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constantnts';

const drawerWidth = DRAWER_WIDTH;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    navBtns: {
      marginRight: '1rem',
      '& a': {
        textDecoration: 'none',
        margin: '.5rem',
      },
    },
    button: {
      margin: '0 0.5rem',
    },
  });

export default styles;
