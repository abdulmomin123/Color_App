import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import * as Interfaces from './Interfaces';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

interface Props {
  open: boolean;
  classes: Record<any, any>;
  palettes: Interfaces.StarterPalette[];
  savePalette: (palette: Interfaces.NewPalette) => void;
  handleDrawerOpen: () => void;
}

interface State {
  paletteName: string;
  stage: string;
}

class PaletteFormNav extends Component<Props, State> {
  state = {
    paletteName: '',
    stage: '',
  };

  toggleForm = () =>
    this.setState({
      stage:
        this.state.stage === ''
          ? 'form'
          : this.state.stage === 'form'
          ? 'emoji'
          : '',
    });

  render() {
    const {
      open,
      classes,
      palettes,
      savePalette,
      handleDrawerOpen,
    } = this.props;

    const { stage } = this.state;

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
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Go Back
              </Button>
            </Link>

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.toggleForm}
            >
              Save
            </Button>
          </div>

          {stage && (
            <PaletteMetaForm
              stage={stage}
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

export default withStyles(styles)(PaletteFormNav);
