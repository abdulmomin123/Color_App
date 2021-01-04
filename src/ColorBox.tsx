import { Component } from 'react';
import * as Interfaces from './Interfaces';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class ColorBox extends Component<{
  color: Interfaces.Color;
}> {
  render() {
    const { color, name } = this.props.color;

    return (
      <CopyToClipboard text={color}>
        <div style={{ background: color }} className="ColorBox">
          <div className="copy-container">
            <div className="box-content">
              <span> {name} </span>
            </div>

            <button className="copy-button">Copy</button>
          </div>

          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}
