"use strict";

import { navigator, isIosMobileApp } from './Platform';
import '../../../utils/functionUtils';

// Vibrating styles.
const styles = {
  'success': 50,
  'warning': [40, 40],
  'error': [30, 30, 30],
  'buzz': 150,
  'peek': 30,
  'pop': 75,
  'nope': [20, 20, 40],
  'default': 40,
};

styles['1'] = styles.success;
styles['2'] = styles.warn = styles.warning;
styles['3'] = styles.err = styles.error;

// Main function.
const v = navigator && Navigator.prototype.vibrate;
const vibrate = isIosMobileApp && (
  style => window.webkit.messageHandlers.vibrate.postMessage(`${style || ''}`.toLowerCase())
) || (
  v && (
    function(style = '', _navigator = navigator) { 
      return v.apply(_navigator, [typeof style === 'string' && (style && styles[style.toLowerCase()] || styles.default) || style])
    }
  )
) || Function.void;

// Export.
Object.defineProperty(vibrate, 'vibrate', {
  value: vibrate
});
navigator && (Navigator.prototype.vibrate = function(style = '') {
  return vibrate(style, this);
});
export default Object.freeze(vibrate);