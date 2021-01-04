import { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component<{
  level: number;
  changeLevel: (level: number) => void;
}> {
  render() {
    const { changeLevel, level } = this.props;

    return (
      <header>
        <div className="logo">
          <a href="/">React Color Picker</a>
        </div>

        <div className="slider-container">
          <div className="span">Level: {level} </div>
          <Slider
            className="slider"
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
      </header>
    );
  }
}
