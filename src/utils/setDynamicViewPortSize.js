import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

let META_VIEWPORT_CONTENT, VVH;

const setWindowSizeProperties = ({ width: w, height: h } = Platform.windowSize) => {
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
  let vv = window.visualViewport,
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

  console.log('page', vvl, vvt);
  document.body.dataset.viewportResizing = (vvt || vvot) && true || null;
  document.documentElement.style.setProperty('--vvt', vvt && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvl', vvl && `${vvl}px` || '0');
  // document.documentElement.style.setProperty('--vvot', vvot && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvol', vvol && `${vvl}px` || '0');
  document.getElementById('chat-input').setAttribute('value', `${vvt} ${vvh} ${h} ${h - vvt}`);
  Platform.metaViewport.setAttribute('content', `${META_VIEWPORT_CONTENT} height=${vvh}px`);
  // document.body.style.top = `${vvt}px`;

}

export const setDynamicViewPortSize = () => (
  // We listen to the resize event.
  Platform.isMounted && (
    META_VIEWPORT_CONTENT = Platform.metaViewport.getAttribute && Platform.metaViewport.getAttribute('content') || '',
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