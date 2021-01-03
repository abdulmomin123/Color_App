import { Component } from 'react';
import * as Interfaces from './Interfaces';

export default class ColorBox extends Component<{
  color: Interfaces.Color;
}> {
  render() {
    const { color, name } = this.props.color;

    return (
      <div style={{ background: color }} className="ColorBox">
        {name}
        <span>More</span>
      </div>
    );
  }
}
