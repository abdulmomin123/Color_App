import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';

const styles = createStyles({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: '20%',
    height: '25%',
    background: ({ color: { color } }: { color: { color: string } }) => color,
    margin: '0 auto',
    cursor: 'pointer',
    marginBottom: '-6.1px',
  },
});

interface Props {
  color: Interfaces.NewColor;
  classes: {
    [key: string]: string;
  };
}

const DraggableColorBox: React.FC<Props> = props => {
  const { classes } = props;

  return <div className={classes.root}></div>;
};

export default withStyles(styles)(DraggableColorBox as any);
