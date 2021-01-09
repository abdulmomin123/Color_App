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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
    navBtns: {},
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
}

class PaletteFormNav extends Component<Props, State> {
  state = {
    paletteName: '',
  };

  componentDidMount = () => {
    // Rule for the palette name
    ValidatorForm.addValidationRule('isPaletteNameUnique', paletteName =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLowerCase()
      )
    );
  };

  handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    this.setState({ paletteName: target.value });
  };

  render() {
    const { open, classes, savePalette, handleDrawerOpen } = this.props;
    const { paletteName } = this.state;

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
            <ValidatorForm onSubmit={() => savePalette(paletteName)}>
              <TextValidator
                name="paletteName"
                value={paletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter Palette Name',
                  'Palette name must be unique!',
                ]}
              />

              {/* Save Button */}
              <Button type="submit" variant="contained" color="secondary">
                Save Palette
              </Button>
            </ValidatorForm>

            {/* Go Back */}
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
