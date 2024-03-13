'use strict';
'use client'

import Platform from './Platform';
const { isIosMobileApp, isAndroidApp, getNative, window } = Platform;

// Define the extended console.
const func = getNative('console'), f = s => `${s}`, map = msg => msg.map(f).join(' ');
const _console = {...window.console, ...(isAndroidApp && {
  log(...msg) { func('log', map(msg)); },
  warn(...msg) { func('warn', map(msg)); },
  err(...msg) { func('err', map(msg)); },
  error(...msg) { func('error', map(msg)); },
  success(...msg) { func('success', map(msg)); },
  debug(...msg) { func('debug', map(msg)); },
  info(...msg) { func('info', map(msg)); }
} || (isIosMobileApp && {
  log(...msg) { func({type: '🪵 LOG:', msg: map(msg) }); },
  warn(...msg) { func({type: '⚠️ WARNING:', msg: map(msg) }); },
  err(...msg) { func({type: '⛔️ ERROR:', msg: map(msg) }); },
  error(...msg) { func({type: '⛔️ ERROR:', msg: map(msg) }); },
  success(...msg) { func({type: '✅ SUCCESS:', msg: map(msg) }); },
  debug(...msg) { func({type: '🐞 DEBUG:', msg: map(msg) }); },
  info(...msg) { func({type: 'ℹ️ INFO:', msg: map(msg) }); }
}) || {
  err(...args) { console.error(...args) },
  success(...msg) { console.log('Success:', map(msg)) }
})};

// Define console styles.
_console.getStyle = isIosMobileApp && (_console.resetStyle = x => '') || (
  (_console.styles = Object.freeze({
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    cursive: '\x1b[3m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    foregroundBlack: '\x1b[30m',
    foregroundRed: '\x1b[31m',
    foregroundGreen: '\x1b[32m',
    foregroundYellow: '\x1b[33m',
    foregroundBlue: '\x1b[34m',
    foregroundMagenta: '\x1b[35m',
    foregroundCyan: '\x1b[36m',
    foregroundWhite: '\x1b[37m',
    backgroundBlack: '\x1b[40m',
    backgroundRed: '\x1b[41m',
    backgroundGreen: '\x1b[42m',
    backgroundYellow: '\x1b[43m',
    backgroundBlue: '\x1b[44m',
    backgroundMagenta: '\x1b[45m',
    backgroundCyan: '\x1b[46m',
    backgroundWhite: '\x1b[47m'
  })) && (_console.resetStyle = () => _console.styles.reset) && (str => {
    let isbg, col, s, x = (str || (str = '')).toLowerCase();
    ((x = x.toLowerCase()).includes('fg') && (x = x.slice(x, 2)))
      || (x.includes('foreground') && (x = x.slice(x, 10)))
      || ((
        (x.includes('bg') && (x = x.slice(x, 2)))
        || (x.includes('background') && (x = x.slice(x, 10)))
      ) && (isbg = true)
    );

    s = x.includes('res') && 'reset'
      || ((x.includes('bol') || x.includes('bri')) && 'bold')
      || ((x.includes('cur') || x.includes('ita')) && 'cursive')
      || (x.includes('dim') && 'dim')
      || (x.includes('und') && 'underscore')
      || (x.includes('bli') && 'blink')
      || (x.includes('rev') && 'reverse')
      || (x.includes('hid') && 'hidden');

    col = x.includes('bla') && 'Black'
      || (x.includes('red') && 'Red')
      || (x.includes('yel') && 'Yellow')
      || (x.includes('blu') && 'Blue')
      || (x.includes('mag') && 'Magenta')
      || (x.includes('cya') && 'Cyan')
      || (x.includes('whi') && 'White');
    
    return `${s && _console.styles[s] || ''}${col && _console.styles[`${(isbg && 'background' || 'foreground')}${col}`] || ''}${!(s || col) && str}`;
}));

// Exports.
(isAndroidApp || isIosMobileApp) && navigator && Object.defineProperty(window, 'console', {
  value: _console,
  enumerable: true
}) || (
  console.log('#####', window, window && window.console),
  window.console.err || (window.console.err = window.console.error),
  window.console.success || (window.console.success = (...msg) => console.log('Success:', map(msg)))
);
export const console = _console;
export default console;