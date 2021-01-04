export interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

export interface CompletePalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [key: string]: CompleteColor[];
  };
}

export interface Color {
  name: string;
  color: string;
}

export interface CompleteColor {
  color: string;
  hex: string;
  id: string;
  name: string;
  rgb: string;
  rgba: string;
}
