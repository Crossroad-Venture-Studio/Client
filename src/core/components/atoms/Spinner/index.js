// Imports.
import styles from './spinner.module.css';

// Main component.
export const Spinner = () => <div className={`${styles['lds-ring']}`}><div></div><div></div><div></div><div></div></div>;

// Exports.
export default Spinner;