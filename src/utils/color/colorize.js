import Color from './Color';
import Solver from './Solver';
import hexToRgb from './hexToRgb';

const colorize = (color, isNotBlack) => {
  const rgb = typeof color === 'string' && (
    color.startsWith('#') && hexToRgb(color)
    || color.match(/[0-9\.]+/g).filter(x => x)
  );

  if (!Array.isArray(rgb) || rgb.length < 3) {
    return null;
  }

  const color = new Color(rgb[0], rgb[1], rgb[2]),
    solver = new Solver(color);

  return solver.solve(isNotBlack);
}

// Exports.
export default Object.freeze(Object.defineProperty(hexToRgb, 'hexToRgb', {
  value: hexToRgb
}));