import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: '20%',
    height: '25%',
    background: ({ background }: { background: string }) => background,
    margin: '0 auto',
    cursor: 'pointer',
    marginBottom: '-3.5px',
  },
});

interface Props {
  background: string;
  classes: {
    [key: string]: string;
  };
}

const DraggableColorBox: React.FC<Props> = props => {
  const { classes } = props;

  return <div className={classes.root}></div>;
};

export default withStyles(styles)(DraggableColorBox);
