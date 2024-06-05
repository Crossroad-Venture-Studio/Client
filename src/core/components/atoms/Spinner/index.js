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
    color
  } = props || {}, baseClassName = `${styles.spinner}`;
  className = className && `${baseClassName} ${className}` || baseClassName;
  (color || (dark && (color = 'dark')) || (light && (color = 'light'))) && (className += ` ${styles[color]}`);
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