import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles, createStyles } from '@material-ui/styles';
import * as Interfaces from './Interfaces';
import DeleteIcon from '@material-ui/icons/Delete';

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

    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
});

interface Props {
  color: Interfaces.NewColor;
  deleteColorBox: (name: string) => void;
  classes: {
    [key: string]: string;
  };
}

const DraggableColorBox: React.FC<Props> = props => {
  const { classes, color } = props;

  const deleteColorBox = () => {
    props.deleteColorBox(color.name);
  };

  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span> {color.name}</span>
        <DeleteIcon onClick={deleteColorBox} className={classes.deleteIcon} />
      </div>
    </div>
  );
};

export default SortableElement(withStyles(styles)(DraggableColorBox as any));
