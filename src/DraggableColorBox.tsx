import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Interfaces from './Interfaces';
import styles from './styles/DraggableColorBox';

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
