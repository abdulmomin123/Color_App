import chroma from 'chroma-js';
import * as Interfaces from './Interfaces';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// Returns an array of 3 colors from lightest to darkest of
// the given color
const getRange = (hexColor: string) => [
  // 1.4 time darker version of the given color
  chroma(hexColor).darken(1.4).hex(),

  // The givn color
  hexColor,

  // Lightest version of the color
  '#fff',
];

// Returns 10 shades of a given color
const getScale = (hexColor: string, numOfColors: number) =>
  chroma.scale(getRange(hexColor)).mode('lab').colors(numOfColors);

export const generatePalette = (palette: Interfaces.StarterPalette) => {
  const colors: {
    [key: string]: Interfaces.Color[];
  } = {};
  levels.forEach(level => (colors[level] = []));

  for (let color of palette.colors) {
    let scale = getScale(color.color, 10).reverse();

    for (let i in scale) {
      const Color: Interfaces.Color = {
        paletteId: palette.id,
        colorId: color.name.toLowerCase().replace(/ /g, '-'),
        name: `${color.name} ${levels[i]}`,
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1)'),
      };

      colors[levels[i]].push(Color);
    }
  }

  const completePalette: Interfaces.Palette = {
    paletteName: palette.paletteName,
    id: palette.id,
    emoji: palette.emoji,
    colors,
  };

  return completePalette;
};
