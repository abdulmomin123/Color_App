import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import styles from './styles/ColorBoxStyles';

interface Props {
  color: Interfaces.Color;
  format: Interfaces.ColorFormats;
  showFullPalette: boolean;
  classes: Record<string, string>;
}

interface State {
  copied: boolean;
}

class ColorBox extends Component<Props, State> {
  state = {
    copied: false,
  };

  handleCopy = () => {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 2500)
    );
  };

  render() {
    const {
      format,
      color,
      showFullPalette,
      classes: {
        dynamicTextColor,
        copyOverlay,
        seeMore,
        boxContent,
        copyButton,
        colorBox,
        copyMsg,
        showOverlay,
        showMsg,
      },
    } = this.props;
    const { name, paletteId, colorId } = color;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={color[format]} onCopy={this.handleCopy}>
        <div style={{ background: color[format] }} className={colorBox}>
          <div
            style={{ background: color[format] }}
            className={`${copyOverlay} ${copied ? showOverlay : ''}`}
          />
          <div className={`${copyMsg} ${copied ? showMsg : ''}`}>
            <h1>copied!</h1>
            <p className={dynamicTextColor}>{color[format]}</p>
          </div>
          <div>
            <div className={boxContent}>
              <span className={dynamicTextColor}>{name}</span>
            </div>

            <button className={`${copyButton} ${dynamicTextColor}`}>
              Copy
            </button>
          </div>

          {showFullPalette ? (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <span className={`${seeMore} ${dynamicTextColor}`}>More</span>
            </Link>
          ) : null}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox as any);
