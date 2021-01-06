import { withStyles } from '@material-ui/core/styles';
import * as Interfaces from './Interfaces';
import styles from './styles/MiniPaletteStyles';

interface Props {
  palette: Interfaces.StarterPalette;
  classes: Record<string, string>;
}

const MiniPalette = (props: Props) => {
  const {
    classes,
    palette: { paletteName, emoji, colors },
  } = props;

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ background: color.color }}
      key={color.name}
    />
  ));

  return (
    <div className={classes.root}>
      <div className={classes.colors}>
        {/* The mini color boxes */}
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>{' '}
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
