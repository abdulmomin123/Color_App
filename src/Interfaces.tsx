export interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

export interface Color {
  name: string;
  color: string;
}
