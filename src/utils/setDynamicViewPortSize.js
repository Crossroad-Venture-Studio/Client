import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const eventHandler = throttle(() => {
  // We execute the same script as before.
  document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}, 10);

export const setDynamicViewPortSize = () => (
  // We listen to the resize event
  Platform.isMounted && (
    window.removeEventListener('resize', eventHandler),
    window.addEventListener('resize', eventHandler)
  )
);

export default setDynamicViewPortSize;