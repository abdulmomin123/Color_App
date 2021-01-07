import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import { withStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as Interfaces from './Interfaces';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  level?: number;
  changeLevel?: (level: number) => void;
  changeColorFormat: (colorFormat: Interfaces.ColorFormats) => void;
  classes: {
    [key: string]: string;
  };
}

interface State {
  colorFormat: Interfaces.ColorFormats;
  open: boolean;
}

class Navbar extends Component<Props, State> {
  state: { colorFormat: Interfaces.ColorFormats; open: boolean } = {
    colorFormat: 'hex',
    open: false,
  };

  handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const colorFormat = e.target.value as Interfaces.ColorFormats;
    this.setState({ colorFormat, open: true });
    this.props.changeColorFormat(colorFormat);
  };

  closeSnackbar = () => this.setState({ open: false });

  render() {
    const { changeLevel, level, classes } = this.props;
    const { colorFormat, open } = this.state;

    return (
      <header className={`${classes.Navbar}`}>
        <Link className={`${classes.logo}`} to="/">
          React Color Picker
        </Link>

        {level ? (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        ) : null}

        <div className={classes.selectContainer}>
          <Select onChange={this.handleChange} value={colorFormat}>
            <MenuItem value="hex">HEX - #fff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGB - rgba(255,255,255, 1)</MenuItem>
          </Select>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={2500}
          message={
            <span id="message-id">
              Format Changed To {colorFormat.toUpperCase()}
            </span>
          }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} key="close">
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
