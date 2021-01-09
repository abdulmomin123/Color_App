import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import * as Interfaces from './Interfaces';
import DraggableColorBox from './DraggableColorBox';

interface Props {
  colors: Interfaces.NewColor[];
  delteColorBox: (name: string) => void;
}

const DraggableColorList: React.FC<Props> = props => {
  const { colors, delteColorBox } = props;

  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          deleteColorBox={delteColorBox}
          key={color.name}
          color={color}
        />
      ))}
    </div>
  );
};

export default SortableContainer(DraggableColorList);
