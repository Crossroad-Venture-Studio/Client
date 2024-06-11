import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const setWindowSizeProperties = () => {
  const { width: w, height: h } = Platform.windowSize;
  document.documentElement.style.setProperty('--vw', w && `${w * 0.01}px` || '1dvw');
  document.documentElement.style.setProperty('--vh', h && `${h * 0.01}px` || '1dvh');
  console.log('hello', w, h);
}

const windowResizeEventHandler = throttle(() => {
  // We execute the same script as before.
  console.log('resizing');
  setWindowSizeProperties();
  document.body.dataset.resizing = true;
}, 10);

const visualViewportResizeHandler = () => {
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