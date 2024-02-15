"use strict";

let WINDOW = {}, NAVIGATOR = {}, DOCUMENT = {}, IS_CLIENT = false, MQ, IS_APPLE;
try {
  IS_CLIENT = !!window;
  WINDOW = window || {};
  NAVIGATOR = WINDOW.navigator || navigator || {};
  DOCUMENT = WINDOW.document || document || {};
} catch {};
const VENDOR = NAVIGATOR.vendor || '',
  USER_AGENT = NAVIGATOR.userAgent || '',
  IS_ANDROID_MOBILE = /Android|Opera Mini/.test(USER_AGENT) || WINDOW.Android || false,
  IS_WINDOWS_MOBILE = /Windows Phone|IEMobile/.test(USER_AGENT),
  IS_OTHER_MOBILE = /webOS|BlackBerry/.test(USER_AGENT),
  IS_IOS_MOBILE = /iP(hone|ad|od)/.test(USER_AGENT)
  && WINDOW.webkit
  && !(IS_ANDROID_MOBILE || IS_WINDOWS_MOBILE || IS_OTHER_MOBILE),
  MOBILE = (IS_IOS_MOBILE && 'ios')
  || (IS_ANDROID_MOBILE && 'android')
  || (IS_WINDOWS_MOBILE && 'windows')
  || (IS_OTHER_MOBILE && 'other'),
  HAS_TOUCH_SCREEN = !!MOBILE
  || 'ontouchstart' in (DOCUMENT.documentElement || {})
  || NAVIGATOR.maxTouchPoints > 0
  || NAVIGATOR.msMaxTouchPoints > 0
  || (
    (MQ = ((WINDOW.matchMedia || (() => {}))('(pointer:coarse)') || {}))
    && MQ.media === '(pointer:coarse)'
    && !!MQ.matches
  ) || !!WINDOW.orientation;

IS_APPLE = /Apple/.test(VENDOR);
const IS_SAFARI = /Safari/.test(USER_AGENT) && IS_APPLE;
IS_APPLE || (IS_APPLE = /Mac/.test(USER_AGENT));
const IS_GOOGLE = /Google/.test(VENDOR),
  IS_CHROMIUM = /Chromium/.test(USER_AGENT) && IS_GOOGLE,
  IS_CHROME = ((/Chrome/.test(USER_AGENT) && IS_GOOGLE) || (!!WINDOW.chrome && (!!WINDOW.chrome.webstore || !!WINDOW.chrome.runtime))) && !IS_CHROMIUM,
  IS_SEAMONKEY = /Seamonkey/.test(USER_AGENT),
  IS_FIREFOX = (/Firefox/.test(USER_AGENT) || typeof InstallTrigger !== 'undefined') && !IS_SEAMONKEY,
  IS_OPERA = /OPR|Opera/.test(USER_AGENT),
  IS_IE = /MSIE|Trident.*rv\:11\./.test(USER_AGENT) || /*@cc_on!@*/false || !!DOCUMENT.documentMode,
  BROWSER = (IS_SAFARI && 'safari')
  || (IS_CHROME && 'chrome')
  || (IS_CHROMIUM && 'chromium')
  || (IS_SEAMONKEY && 'seamonkey')
  || (IS_FIREFOX && 'firefox')
  || (IS_OPERA && 'opera')
  || (IS_IE && 'ie'),
  IS_GECKO = /Mobile|Tablet/.test(USER_AGENT) && /Gecko|Firefox/.test(USER_AGENT) && /Mozilla/.test(USER_AGENT) || IS_FIREFOX,
  IS_EDGE = (!IS_IE && !!WINDOW.StyleMedia) || (IS_CHROME && /Edg/.test(USER_AGENT)),
  IS_BLINK = (IS_CHROME || IS_OPERA) && !!WINDOW.CSS,
  IS_WEBKIT = /KHTML/.test(USER_AGENT) && /AppleWebKit/.test(USER_AGENT),
  RENDERING_ENGINE = (IS_EDGE && 'edge')
  || (IS_BLINK && 'blink')
  || (IS_GECKO && 'gecko')
  || (IS_WEBKIT && 'webkit'),
  IS_IOS_MOBILE_APP = IS_IOS_MOBILE && WINDOW.webkit.messageHandlers && WINDOW.webkit.messageHandlers.console;

// Platform.
const Platform = {
  // Macro variables.
  userAgent: USER_AGENT,
  referrer: DOCUMENT.referrer,
  // Flags.
  isClient: IS_CLIENT,
  isMobileOrTablet: !!MOBILE,
  isApple: IS_APPLE,
  isAndroidApp: IS_ANDROID_MOBILE,
  isIosMobileApp: IS_IOS_MOBILE_APP,
  isSafariMobile: MOBILE && IS_SAFARI && !IS_IOS_MOBILE_APP,
  hasTouchScreen: HAS_TOUCH_SCREEN,
  // Browser info.
  browserVendor: VENDOR,
  browser: BROWSER,
  renderingEngine: RENDERING_ENGINE,
  // Touch vs click handlers.
  onpressName: HAS_TOUCH_SCREEN && 'ontouchstart' || 'onmousedown',
  onPressName: HAS_TOUCH_SCREEN && 'onTouchStart' || 'onMouseDown',
  onpressEvent: HAS_TOUCH_SCREEN && 'touchstart' || 'mousedown',
  onreleaseName: HAS_TOUCH_SCREEN && 'ontouchend' || 'onmouseup',
  onReleaseName: HAS_TOUCH_SCREEN && 'onTouchEnd' || 'onMouseUp',
  onreleaseEvent: HAS_TOUCH_SCREEN && 'touchend' || 'mouseup',
  // Local storage.
  defaultStorage: WINDOW.localStorage, // Where to store persisting data
  defaultStorageEncode: 'stringify', // Default storage data encoding function
  defaultStorageDecode: 'stringify' // Default storage data decoding function
};
MOBILE && (Platform.mobileOrTablet = MOBILE);

NAVIGATOR
  && (NAVIGATOR.online || NAVIGATOR.onLine) !== undefined
  && Object.defineProperty(Platform, 'online', {
  get() {return (NAVIGATOR.online || NAVIGATOR.onLine) || false; },
  enumerable: true
});

// Non enumarable properties.
Object.defineProperty(Platform, 'window', {
  value: WINDOW
});
Object.defineProperty(Platform, 'navigator', {
  value: NAVIGATOR
});
Object.defineProperty(Platform, 'document', {
  value: DOCUMENT
});

// Helper function to get mobile native functionalities.
Object.defineProperty(Platform, 'getNative', {
  value: (funcName, fallback = WINDOW) => IS_ANDROID_MOBILE && WINDOW.Android && ((...args) => WINDOW.Android[funcName](...args))
    || (IS_IOS_MOBILE && ((...args) => WINDOW.webkit.messageHandlers[funcName].postMessage(...args)))
    || (fallback && typeof fallback === 'object' && typeof fallback[funcName] === 'function' && ((...args) => fallback[funcName](...args)))
    || (typeof fallback === 'function' && fallback)
    || (() => {})
});

// String conversion, for display.
Object.defineProperty(Platform, 'toString', {
  value: function () {
    return Object.entries(this).reduce((v, [key, val]) => {
      return val !== this
        && typeof val !== 'function'
        && `${v && v + '\n' || v}${key}: ${typeof val === 'object' && JSON.stringify(val) || val}`
        || v;
    }, '');
  }
});

// Exports.
Object.defineProperty(Platform, 'Platform', {
  value: Platform
});
export default Object.freeze(Platform);