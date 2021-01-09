import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import * as Interfaces from './Interfaces';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  palette: Interfaces.StarterPalette;
  deletePalette: (id: string) => void;
  classes: Record<string, string>;
}

class MiniPalette extends Component<Props> {
  deletePalette = () => this.props.deletePalette(this.props.palette.id);

  render = () => {
    const {
      classes,
      palette: { id, paletteName, emoji, colors },
    } = this.props;

    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ background: color.color }}
        key={color.name}
      />
    ));

    return (
      <div className={classes.root}>
        {/* Delete icon */}
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: 'all 0.3s ease-in-out' }}
          onClick={this.deletePalette}
        />

        <Link to={`/palette/${id}`}>
          {/* The mini color boxes */}
          <div className={classes.colors}>{miniColorBoxes}</div>
          <h5 className={classes.title}>
            {paletteName} <span className={classes.emoji}>{emoji}</span>{' '}
          </h5>
        </Link>
      </div>
    );
  };
}

export default withStyles(styles)(MiniPalette);
