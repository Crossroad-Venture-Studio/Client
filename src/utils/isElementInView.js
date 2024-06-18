import Platform from '../core/native/Platform';

export const isElementInView = (el, view) => {
  const rect = el.getBoundingClientRect();
  (view || (view = Platform)).getBoundingClientRect && (view = view.getBoundingClientRect());
  return (
      rect.top >= view.top &&
      rect.left >= view.left &&
      rect.bottom <= view.bottom &&
      rect.right <= view.right
  );
}

export default isElementInView;