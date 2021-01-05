import { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Interfaces from './Interfaces';
import './ColorBox.css';

interface Props {
  color: Interfaces.Color;
  format: Interfaces.ColorFormats;
}

export default class ColorBox extends Component<Props> {
  state = {
    copied: false,
  };

  handleCopy = () => {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 1000)
    );
  };

  render() {
    const { format, color } = this.props;
    const { name } = color;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={color[format]} onCopy={this.handleCopy}>
        <div style={{ background: color[format] }} className="ColorBox">
          <div
            style={{ background: color[format] }}
            className={`copy-overlay ${copied ? 'show' : ''}`}
          />
          <div className={`copy-msg ${copied ? 'show' : ''}`}>
            <h1>copied!</h1>
            <p>{color[format]}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>

            <button className="copy-button">Copy</button>
          </div>

          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}
