import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

const eventHandler = throttle(() => {
  // We execute the same script as before.
  const w = window.innerWidth, h = window.innerHeight;
  document.documentElement.style.setProperty('--vw', w && `${w * 0.01}px` || '1dvw');
  document.documentElement.style.setProperty('--vh', h && `${h * 0.01}px` || '1dvh');
}, 10);

export const setDynamicViewPortSize = () => (
  // We listen to the resize event
  Platform.isMounted && (
    console.log('#######'),
    window.removeEventListener('resize', eventHandler),
    window.addEventListener('resize', eventHandler)
  )
);

export default setDynamicViewPortSize;