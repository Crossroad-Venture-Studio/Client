import Platform from '../core/native/Platform';

export const isElementInView = (el, view) => {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && el.clientWidth) {
    rect.left = el.offsetLeft;
    rect.right = rect.left + el.clientWidth;
    rect.top = el.offsetTop;
    rect.bottom = rect.top + el.clientHeight;
  }
  (view || (view = Platform)).getBoundingClientRect && (view = view.getBoundingClientRect());
  console.log(rect, view);
  return (
      rect.top >= view.top &&
      rect.left >= view.left &&
      rect.bottom <= view.bottom &&
      rect.right <= view.right
  );
}

export default isElementInView;