// Imports.
import styles from './spinner.module.css';

// Main component.
export const Spinner = props => {
  let {
    className,
    large,
    size,
    light,
    dark,
    white,
    black,
    red,
    blue,
    orange,
    yellow,
    green,
    gray,
    color
  } = props || {}, baseClassName = `${styles.spinner}`;
  className = className && `${baseClassName} ${className}` || baseClassName;
  (color
    || (dark && (color = 'dark'))
    || (light && (color = 'light'))
    || (white && (color = 'white'))
    || (black && (color = 'black'))
    || (blue && (color = 'blue'))
    || (orange && (color = 'orange'))
    || (yellow && (color = 'yellow'))
    || (red && (color = 'red'))
    || (green && (color = 'green'))
    || (gray && (color = 'gray'))
  ) && (className += ` ${styles[color]}`);
  (size || (large && (size = 'large'))) && (className += ` ${styles[size]}`);

  return <div className={className}>
    <div/>
    <div/>
    <div/>
    <div/>
  </div>;
}

// Exports.
export default Spinner;