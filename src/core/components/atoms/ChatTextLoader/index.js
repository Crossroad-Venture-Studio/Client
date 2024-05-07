// Imports.
import styles from './chat-text-loader.module.css';

// Main component.
export const ChatTextLoader = props => {
  let {
    className,
    type,
    size = type
  } = props || {},
  baseClassName = styles['container'];
  className = className && `${baseClassName} ${className}` || baseClassName;
  size && (className += ` ${size}`);

  return <div className={className}><span className={styles['loader']}></span></div>;
}

// Exports.
export default ChatTextLoader;