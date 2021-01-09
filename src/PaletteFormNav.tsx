import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Interfaces from './Interfaces';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 350;

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

interface Props {
  open: boolean;
  classes: Record<any, any>;
  palettes: Interfaces.StarterPalette[];
  savePalette: (paletteName: string) => void;
  handleDrawerOpen: () => void;
}

interface State {
  paletteName: string;
  isFormShowing: boolean;
}

class PaletteFormNav extends Component<Props, State> {
  state = {
    paletteName: '',
    isFormShowing: false,
  };

  toggleForm = () =>
    this.setState({ isFormShowing: !this.state.isFormShowing });

  render() {
    const {
      open,
      classes,
      palettes,
      savePalette,
      handleDrawerOpen,
    } = this.props;

    const { isFormShowing } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            {/* Go Back */}
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>

            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleForm}
            >
              Save
            </Button>
          </div>
          {isFormShowing && (
            <PaletteMetaForm
              isFormShowing={isFormShowing}
              toggleForm={this.toggleForm}
              palettes={palettes}
              savePalette={savePalette}
            />
          )}
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
