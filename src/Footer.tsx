import React from 'react';

interface Props {
  paletteName: string;
  emoji: string;
}

const Footer: React.FC<Props> = props => {
  const { emoji, paletteName } = props;

  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default Footer;
