// Imports.
import styles from './chat-text-loader.module.css';

// Main component.
export const ChatTextLoader = props => {
  let {
    className,
    type,
    size = type
  } = props || {},
  baseClassName = styles[`container${size && `-${size}` || ''}`];
  className = className && `${baseClassName} ${className}` || baseClassName;
  // size && (className += ` ${size}`);

  return <div className={className}>
    <div className={styles['b1']}/>
    <div className={styles['b2']}/>
    <div className={styles['b3']}/>
  </div>;
}

// Exports.
export default ChatTextLoader;