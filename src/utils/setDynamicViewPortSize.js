import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const windowResizeEventHandler = throttle(() => {
  // We execute the same script as before.
  const w = window.innerWidth, h = window.innerHeight;
  document.documentElement.style.setProperty('--vw', w && `${w * 0.01}px` || '1dvw');
  document.documentElement.style.setProperty('--vh', h && `${h * 0.01}px` || '1dvh');
  document.body.dataset.resizing = true;
}, 10);

const visualViewportResizeHandler = () => {
  document.body.dataset.viewportResizing = true;
}

// if (window.visualViewport) {
//   function resizeHandler() {
//       for (const sessionView of document.getElementsByClassName('chat-feed-container')) {
//           sessionView.style.height = window.visualViewport.height.toString() + 'px';
//           document.body.style.height = window.visualViewport.height.toString() + 'px';
//           document.getElementsByTagName('html')[0].style.height = window.visualViewport.height.toString() + 'px';
//       }
//   }
//   window.visualViewport.addEventListener('resize', resizeHandler);
// }

export const setDynamicViewPortSize = () => (
  // We listen to the resize event.
  Platform.isMounted && (
    window.removeEventListener('resize', windowResizeEventHandler),
    window.addEventListener('resize', windowResizeEventHandler),
    window.visualViewport && (
      window.visualViewport.removeEventListener('resize', visualViewportResizeHandler),
      window.visualViewport.addEventListener('resize', visualViewportResizeHandler)
    )
  )
);

export default setDynamicViewPortSize;