import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Interfaces from './Interfaces';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

export default class PletteFormNav extends Component<Props, State> {
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

  savePalette = () => {
    //
  };

  handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    this.setState({ paletteName: target.value });
  };

  render() {
    const { open, classes, savePalette, handleDrawerOpen } = this.props;
    const { paletteName } = this.state;

    return (
      <div>
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
              Persistent drawer
            </Typography>

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

              {/* Go Back */}
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
