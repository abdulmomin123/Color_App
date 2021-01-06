export interface StarterPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

export interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [key: string]: Color[];
  };
}

export interface Color {
  paletteId: string;
  colorId: string;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
}

export type ColorFormats = 'hex' | 'rgb' | 'rgba';
