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

const visualViewportResizeHandler = () => {
  const vv = window.visualViewport, vl = vv.pageLeft, vt = vv.pageTop;
  console.log('page', vl, vt);
  document.documentElement.style.setProperty('--vt', vt && `${vt}px` || '0');
  document.documentElement.style.setProperty('--vl', vl && `${vl}px` || '0');
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