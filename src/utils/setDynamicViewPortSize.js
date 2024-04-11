import Platform from '../core/native/Platform';

const eventHandler = () => {
  // We execute the same script as before.
  document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

export const setDynamicViewPortSize = () => (
  // We listen to the resize event
  Platform.isMounted && (
    window.removeEventListener('resize', eventHandler),
    window.addEventListener('resize', eventHandler)
  )
);

export default setDynamicViewPortSize;