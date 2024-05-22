// Imports.
import styles from './chat-text-loader.module.css';

// Main component.
export const ChatTextLoader = props => {
  let {
    className,
    xsmall,
    small,
    large,
    type = xsmall && 'xsmall' || (small && 'small') || (large && 'large'),
    size = type
  } = props || {},
  baseClassName = `chat-text-loader ${styles[`container${size && `-${size}` || ''}`]}`;
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