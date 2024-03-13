'use strict';
'use client';

import Platform from './Platform';

const f = s => `${s}`, map = msg => msg.map(f).join(' ');
export const console = {
  get native() { return Platform.getNative('console'); },
  log(...msg) {
    Platform.isAndroidApp ? native('log', map(msg))
    : Platform.isIosMobileApp ? native({type: '🪵 LOG:', msg: map(msg) })
    : native(...msg);
  },
  warn(...msg) {
    Platform.isAndroidApp ? native('warn', map(msg))
    : Platform.isIosMobileApp ? native({type: '⚠️ WARNING:', msg: map(msg) })
    : native(...msg);
  },
  error(...msg) {
    Platform.isAndroidApp ? native('error', map(msg))
    : Platform.isIosMobileApp ? native({type: '⛔️ ERROR:', msg: map(msg) })
    : native(...msg);
  },
  err(...msg) { this.error(...msg); },
  success(...msg) {
    Platform.isAndroidApp ? native('success', map(msg))
    : Platform.isIosMobileApp ? native({type: '✅ SUCCESS:', msg: map(msg) })
    : native(...msg);
  },
  debug(...msg) {
    Platform.isAndroidApp ? native('debug', map(msg))
    : Platform.isIosMobileApp ? native({type: '✅ SUCCESS:', msg: map(msg) })
    : native(...msg);
  },
  success(...msg) {
    Platform.isAndroidApp ? native('success', map(msg))
    : Platform.isIosMobileApp ? native({type: '🐞 DEBUG:', msg: map(msg) })
    : Platform.window.console.log('Success:', map(msg));
  },
  info(...msg) {
    Platform.isAndroidApp ? native('info', map(msg))
    : Platform.isIosMobileApp ? native({type: 'ℹ️ INFO:', msg: map(msg) })
    : native(...msg);
  },
};

// Exports.
export default console;