import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const setWindowSizeProperties = input => {
  const { width: w, height: h } = Object.assign({}, Platform.windowSize, input || {});
  document.documentElement.style.setProperty('--vw', w && `${w * 0.01}px` || '1dvw');
  document.documentElement.style.setProperty('--vh', h && `${h * 0.01}px` || '1dvh');
  document.documentElement.style.setProperty('--viewport-surface', Math.max(w * h, 1));
  document.documentElement.style.setProperty('--viewport-w', Math.max(w, 1));
  document.documentElement.style.setProperty('--viewport-h', Math.max(h, 1));
}

const windowResizeEventHandler = throttle(() => {
  // We execute the same script as before.
  setWindowSizeProperties();
  document.body.dataset.resizing = true;
}, 10);

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const visualViewportResizeHandler = throttle(() => {
  const vv = window.visualViewport,
  { width: w, height: h } = Platform.windowSize,
    vvw = vv.width || w,
    vvh = vv.height || h,
    vvl = clamp(vv.pageLeft, 0, document.body.offsetWidth - vvw),
    vvt = clamp(vv.pageTop, 0, document.body.offsetHeight - vvh),
    vvs = vv.scale || 1,
    lvh = h * vvs,
    lvl = w * vvs,
    vvot = clamp(vv.offsetTop, 0, lvh - vvh),
    vvol = clamp(vv.offsetLeft, 0, lvl - vvw);

    document.documentElement.style.setProperty('--vsx', `${(vvw || 0) / w}`);
    document.documentElement.style.setProperty('--vsy', `${(vvh || 0) / h}`);
    document.documentElement.style.setProperty('--visual-viewport-w', `${vvw || 0}`);
    document.documentElement.style.setProperty('--visual-viewport-h', `${vvh || 0}`);
    document.documentElement.style.setProperty('--visual-viewport-scale', `${vvs || 1}`);
    document.documentElement.style.setProperty('--visual-viewport-width', `${vvw || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-height', `${vvw || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-page-top', `${vvt || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-page-left', `${vvl || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-offset-top', `${vvot || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-offset-left', `${vvol || 0}px`);
    document.documentElement.style.setProperty('--visual-viewport-offset-left', `${vvol || 0}px`);
    document.documentElement.style.setProperty('--viewport-width-scaled', `${vvw || 0}px`);
    document.documentElement.style.setProperty('--viewport-height-scaled', `${vvh || 0}px`);
    document.body.dataset.viewportScrolledUp = (vvt || vvot) && true || null;
    // const els = document.getElementsByClassName('chat-bubble-container'), el = els[els.length - 1];
    // el.innerHTML = Platform.userAgent;
    // document.getElementById('chat-input').setAttribute('placeholder', `${Platform.isMobile} ${window.webkit} ${Platform.isAndroidMobile
    //   || Platform.isWindowsMobile
    //   || Platform.isOtherMobile}`);
}, 10);

export const setDynamicViewPortSize = () => (
  // We listen to the resize event.
  Platform.isMounted && (
    setWindowSizeProperties(),
    visualViewportResizeHandler(),
    window.removeEventListener('resize', windowResizeEventHandler),
    window.addEventListener('resize', windowResizeEventHandler),
    window.visualViewport && (
      window.visualViewport.removeEventListener('resize', visualViewportResizeHandler),
      window.visualViewport.addEventListener('resize', visualViewportResizeHandler)
    )
  )
);

export default setDynamicViewPortSize;