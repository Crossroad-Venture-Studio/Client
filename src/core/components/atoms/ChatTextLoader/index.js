// Imports.
import styles from './chat-text-loader.module.css';

// Main component.
export const ChatTextLoader = props => {
  let props = {
    className,
    type,
    size = type
  } = props || {},
  baseClassName = styles['loader'];
  className = className && `${baseClassName} ${className}` || baseClassName;
  size && (className += ` ${size}`);

  return <span className={className}></span>;
}

// Exports.
export default ChatTextLoader;