import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles, createStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import './ColorBox.css';

const styles = createStyles<any, any>({
  dynamicTextColor: {
    color: ({ color: { hex } }: { color: { hex: string } }) =>
      chroma(hex).luminance() >= 0.1 ? '#000' : '#fff',
  },
  colorBox: {
    width: '20%',
    height: ({ showFullPalette }: { showFullPalette: string }) =>
      showFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',

    '&:hover button': {
      opacity: 1,
      transition: 'opacity 0.5s',
    },
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    color: 'white',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
    opacity: '0',
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  copyMsg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',

    '& h1': {
      fontWeight: 400,
      textShadow: '1px 2px black',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',
    },

    '& p': {
      fontsize: '2rem',
      fontWeight: '100',
    },
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: 10,
    position: 'absolute',
  },
  showMsg: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: 25,
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
  },
});

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
