'use strict';
'use client';

export const Platform = {
  // Basic properties.
  get isMounted() {
    try {
      return window;
    } catch {
      return null;
    }
  },
  get window() { return this.isMounted || {}; },
  get document() { return this.window.document || {}; },
  get documentElement() { return this.document.documentElement || {}; },
  get navigator() { return this.window.navigator || this.document.navigator || {}; },
  get vendor() { return this.navigator.vendor || ''; },
  get userAgent() { return this.navigator.userAgent || ''; },
  get referrer() { return this.document.referrer || ''; },
  get screen() { return this.window.screen || {}; },
  get orientation() { return this.screen.orientation || this.window.orientation; },
  get online() { return (this.navigator.online || this.navigator.onLine); },
  matchMedia(...args) { return (this.window.matchMedia || (() => {}))(...args); },
  get windowSize() { return this.isMounted && {
    width: Math.max(this.documentElement.clientWidth || 0, this.window.innerWidth || 0),
    height: Math.max(this.documentElement.clientHeight || 0, this.window.innerHeight || 0)
  } || {}; },
  get visualViewport() { return this.window.visualViewport || {} },
  // Mobile.
  get isAndroidMobile() { return /Android|Opera Mini/.test(this.userAgent) || this.window.Android; },
  get isWindowsMobile() { return /Windows Phone|IEMobile/.test(this.userAgent); },
  get isOtherMobile() { return /webOS|BlackBerry/.test(this.userAgent); },
  get isIosMobile() { return (
    /iP(hone|ad|od)/.test(this.userAgent)
    && this.window.webkit
    && !(
      this.isAndroidMobile
      || this.isWindowsMobile
      || this.isOtherMobile
    )
  ); },
  get isMobile() {
    return this.isAndroidMobile || this.isWindowsMobile || this.isOtherMobile || this.isIosMobile;
  },
  get isIosMobileApp() {
    return this.isIosMobile && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.console;
  },
  get isAndroidApp() { return this.isAndroidMobile && this.window.Android; },
  // Touch screen.
  get hasTouchScreen() {
    let mq;
    return 'ontouchstart' in this.document
    || 'ontouchstart' in this.documentElement
    || this.navigator.maxTouchPoints > 0
    || this.navigator.msMaxTouchPoints > 0
    || (
      (mq = this.matchMedia('(pointer:coarse)') || {})
      && mq.media === '(pointer:coarse)'
      && !!mq.matches
    );
  },
  // Vendors.
  get isApple() {
    return /Apple/.test(this.vendor) || /Mac/.test(this.userAgent);
  },
  get isGoogle() {
    return /Google/.test(this.vendor);
  },
  // Browsers.
  get isSafari() {
    return /Safari/.test(this.userAgent) && /Apple/.test(this.vendor);
  },
  get isChromium() { return /Chromium/.test(this.userAgent) && this.isGoogle },
  get isChrome() {
    return (
      (/Chrome/.test(this.userAgent) && this.isGoogle)
      || (!!this.window.chrome && (!!this.window.chrome.webstore || !!this.window.chrome.runtime))
    ) && !this.isChromium;
  },
  get isSeamonkey() { return /Seamonkey/.test(this.userAgent); },
  get isFirefox() { return (/Firefox/.test(this.userAgent) || this.window.InstallTrigger !== undefined) && !this.isSeamonkey; },
  get isOpera() { return /OPR|Opera/.test(this.userAgent); },
  get isIE() { return /MSIE|Trident.*rv\:11\./.test(this.userAgent) || /*@cc_on!@*/false || !!this.document.documentMode; },
  get browser() {
    return this.isSafari && 'safari'
    || (this.isChrome && 'chrome')
    || (this.isChromium && 'chromium')
    || (this.isSeamonkey && 'seamonkey')
    || (this.isFirefox && 'firefox')
    || (this.isOpera && 'opera')
    || (this.isIE && 'ie')
    || '';
  },
  get isSafariMobile() { return this.isMobile && this.isSafari && !this.isIosMobileApp; },
  // Rendering engine.
  get isGecko() { return /Mobile|Tablet/.test(this.userAgent) && /Gecko|Firefox/.test(this.userAgent) && /Mozilla/.test(this.userAgent) || this.isFirefox; },
  get isEdge() { return (!this.isIE && !!this.window.StyleMedia) || (this.isChrome && /Edg/.test(this.userAgent)); },
  get isBlink() { return (this.isChrome || this.isOpera) && !!this.window.CSS; },
  get isWebkit() { return this.window.webkit && /KHTML/.test(this.userAgent) && /AppleWebKit/.test(this.userAgent); },
  get renderingEngine() {
    return this.isEdge && 'edge'
    || (this.isBlink && 'blink')
    || (this.isGecko && 'gecko')
    || (this.isWebkit && 'webkit')
    || '';
  },
  // Touch vs click handlers.
  get onpressName() { return this.hasTouchScreen && 'ontouchstart' || 'onmousedown'; },
  get onPressName() { return this.hasTouchScreen && 'onTouchStart' || 'onMouseDown'; },
  get onpressEvent() { return this.hasTouchScreen && 'touchstart' || 'mousedown'; },
  get onreleaseName() { return this.hasTouchScreen && 'ontouchend' || 'onmouseup'; },
  get onReleaseName() { return this.hasTouchScreen && 'onTouchEnd' || 'onMouseUp'; },
  get onreleaseEvent() { return this.hasTouchScreen && 'touchend' || 'mouseup'; },
  get onmoveName() { return this.hasTouchScreen && 'ontouchmove' || 'onmousemove'; },
  get onMoveName() { return this.hasTouchScreen && 'onTouchMove' || 'onMouseMove'; },
  get onmoveEvent() { return this.hasTouchScreen && 'touchmove' || 'mousemove'; },
  // Local storage.
  get defaultStorage() { return this.window.localStorage; }, // Where to store persisting data
  get defaultStorageEncode() { return 'stringify'; }, // Default storage data encoding function
  get defaultStorageDecode() { return 'stringify'; }, // Default storage data decoding function
  // Helper function to get mobile native functionalities.
  getNative(funcName, fallback = this.window) {
    return this.isAndroidApp && ((...args) => this.window.Android[funcName](...args))
      || (this.isIosMobileApp && ((...args) => this.window.webkit.messageHandlers[funcName].postMessage(...args)))
      || (fallback && typeof fallback === 'object' && typeof fallback[funcName] === 'function' && ((...args) => fallback[funcName](...args)))
      || (typeof fallback === 'function' && fallback)
      || (() => {});
  }
}

// Exports.
export default Platform;