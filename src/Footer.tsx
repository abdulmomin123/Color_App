import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/FooterStyles';

interface Props {
  paletteName: string;
  emoji: string;
  classes: {
    [key: string]: string;
  };
}

const Footer: React.FC<Props> = props => {
  const { emoji, paletteName, classes } = props;

  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(Footer);
