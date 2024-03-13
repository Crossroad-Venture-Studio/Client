'use strict';
'use client';

import Platform from './Platform';
import '../../../utils/src/functionUtils';

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
export const vibrate = style => {
  if (Platform.isIosMobileApp) {
    try {
      Platform.window.webkit.messageHandlers.vibrate.postMessage(`${style || ''}`.toLowerCase());
    } catch {}
  } else if (Platform.navigator && Platform.navigator.vibrate) {
    Platform.navigator.vibrate(typeof style === 'string' && (style && styles[style.toLowerCase()] || styles.default) || style);
  }
}

// Export.
export default vibrate;