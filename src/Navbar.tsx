import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as Interfaces from './Interfaces';
import './Navbar.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class Navbar extends Component<{
  level: number;
  changeLevel: (level: number) => void;
  changeColorFormat: (colorFormat: Interfaces.ColorFormats) => void;
}> {
  state: { colorFormat: Interfaces.ColorFormats } = {
    colorFormat: 'hex',
  };

  handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const colorFormat = e.target.value as Interfaces.ColorFormats;
    this.setState({ colorFormat });
    this.props.changeColorFormat(colorFormat);
  };

  render() {
    const { changeLevel, level } = this.props;
    const { colorFormat } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="/">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>

        <div className="select-container">
          <Select onChange={this.handleChange} value={colorFormat}>
            <MenuItem value="hex">HEX - #fff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGB - rgba(255,255,255, 1)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
