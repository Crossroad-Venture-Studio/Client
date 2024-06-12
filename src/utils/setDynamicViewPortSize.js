import Platform from '../core/native/Platform';
import throttle from '../../utils/src/throttle';

let META_VIEWPORT_CONTENT, VVH;

const setWindowSizeProperties = input => {
  const { width: w, height: h } = Object.assign({}, Platform.windowSize, input || {});
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

  // console.log('page', vvl, vvt);
  // document.body.dataset.viewportResizing = (vvt || vvot) && true || null;
  // document.documentElement.style.setProperty('--vvt', vvt && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvl', vvl && `${vvl}px` || '0');
  // document.documentElement.style.setProperty('--vvot', vvot && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvol', vvol && `${vvl}px` || '0');
  // document.getElementById('chat-input').setAttribute('value', `${vvt} ${vvh} ${Platform.windowSize}`);
  // Platform.metaViewport.setAttribute('content', `height=${vvh}px${META_VIEWPORT_CONTENT && ', ' || ''}${META_VIEWPORT_CONTENT}`);
  // document.body.style.marginTop = `${vvt}px`;
  // setWindowSizeProperties({width: vvw, height: vvh});
  // document.getElementById('chat-input').setAttribute('value', `${vvt} ${vvh} | ${getComputedStyle(document.documentElement).getPropertyValue('--vh')}`);
  // document.body.style.marginTop = `${vvt}px`;

  document.getElementById('chat-input').setAttribute('value', window.scrollHeight, document.documentElement.scrollHeight);
  // const scrollEndEventHandler = event => {
  //   document.getElementById('chat-input').setAttribute('value', `${vvt} ${vvh} | ${getComputedStyle(document.documentElement).getPropertyValue('--vh')} | ${vv.pageTop}`);
  //   window.removeEventListener('scrollend', scrollEndEventHandler);
  // }
  // window.addEventListener('scrollend', scrollEndEventHandler);
  // document.documentElement.scrollTo(0,document.documentElement.scrollHeight || 0);
  // window.scrollTop = window.scrollHeight;
}

let CNT = 0;
const visualViewportScrollHandler = event => {
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

  document.body.dataset.viewportResizing = true;
  // document.documentElement.style.setProperty('--vvt', vvt && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvl', vvl && `${vvl}px` || '0');
  // document.documentElement.style.setProperty('--vvot', vvot && `${vvt}px` || '0');
  // document.documentElement.style.setProperty('--vvol', vvol && `${vvl}px` || '0');
  document.getElementById('chat-input').setAttribute('value', `scrolling: ${vvt} ${vvh} ${h} ${h - vvt} ${window.scrollY} ${event.target.offsetTop} ${++CNT}`);
  // Platform.metaViewport.setAttribute('content', `${META_VIEWPORT_CONTENT} height=${vvh}px`);
  // document.body.style.marginTop = `${vvt}px`;

}

const windowScrollEventHandler = event => {
  document.getElementById('chat-input').setAttribute('value', `scrolling: ${event.target.offsetTop} ${++CNT}`);
}

export const setDynamicViewPortSize = () => (
  // We listen to the resize event.
  Platform.isMounted && (
    META_VIEWPORT_CONTENT = Platform.metaViewport.getAttribute && Platform.metaViewport.getAttribute('content') || '',
    setWindowSizeProperties(),
    window.removeEventListener('resize', windowResizeEventHandler),
    window.addEventListener('resize', windowResizeEventHandler),
    // window.removeEventListener('scroll', windowScrollEventHandler),
    // window.addEventListener('scroll', windowScrollEventHandler)
    window.visualViewport && (
      window.visualViewport.removeEventListener('resize', visualViewportResizeHandler),
      window.visualViewport.addEventListener('resize', visualViewportResizeHandler)
      // window.visualViewport.removeEventListener('scroll', visualViewportScrollHandler),
      // window.visualViewport.addEventListener('scroll', visualViewportScrollHandler)
    )
  )
);

export default setDynamicViewPortSize;