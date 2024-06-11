import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const setWindowSizeProperties = () => {
  const { width: w, height: h } = Platform.windowSize;
  document.documentElement.style.setProperty('--vw', w && `${w * 0.01}px` || '1dvw');
  document.documentElement.style.setProperty('--vh', h && `${h * 0.01}px` || '1dvh');
}

const windowResizeEventHandler = throttle(() => {
  // We execute the same script as before.
  setWindowSizeProperties();
  document.body.dataset.resizing = true;
}, 10);

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const visualViewportResizeHandler = () => {
  let vv = window.visualViewport, vvl = vv.pageLeft, vvt = vv.pageTop, vvw = vv.width, vvh = vv.height;
  vvt = clamp(vvt, 0, document.body.offsetHeight - vvh);
  vvl = clamp(vvl, 0, document.body.offsetWidth - vvw);
  console.log('page', vvl, vvt);
  document.documentElement.style.setProperty('--vvt', vvt && `${vvt}px` || '0');
  document.documentElement.style.setProperty('--vvl', vvl && `${vvl}px` || '0');
  document.body.dataset.viewportResizing = true;
}

export const setDynamicViewPortSize = () => (
  // We listen to the resize event.
  Platform.isMounted && (
    setWindowSizeProperties(),
    window.removeEventListener('resize', windowResizeEventHandler),
    window.addEventListener('resize', windowResizeEventHandler),
    window.visualViewport && (
      window.visualViewport.removeEventListener('resize', visualViewportResizeHandler),
      window.visualViewport.addEventListener('resize', visualViewportResizeHandler)
    )
  )
);

export default setDynamicViewPortSize;