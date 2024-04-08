// Main object to export.
export const animations = {};

// Helper function to add a new animation to the engine.
Object.defineProperty(animations, 'add', {
  value: function (name, value) {
    return name && Object.defineProperty(this, name, {
      value: Object.freeze(
        Object.defineProperty(
          Object.assign({variants: null, transition: null}, value || {}), '__name__', {
          value: name
        })
      ),
      enumerable: true
    });
  }
});

const add = (name, value) => animations.add(name, value)[name];

// Different animation styles.
// Dissolve (fade in/out) [default].
export const instant = add('instant', {
  variants: Object.freeze({
    initial: { opacity: 1, zIndex: 2 },
    animate: { opacity: 1, zIndex: 2 },
    exit: { opacity: 1, zIndex: 0 }
  }),
  transition: Object.freeze({
    type: 'tween',
    duration: 0
  })
});

// Dissolve (fade in/out) [default].
export const dissolve = add('dissolve', {
  variants: Object.freeze({
    initial: { opacity: 0, zIndex: 2 },
    animate: { opacity: 1, zIndex: 2 },
    exit: { opacity: 0, zIndex: 0 }
  }),
  transition: Object.freeze({
    // ease: 'easeInOut',
    type: 'tween',
    duration: 0.5
  })
});

// Slide in.
export const slideIn = add('slideIn', {
  variants: Object.freeze({
    initial: { x: '100vw', zIndex: 2 },
    animate: { x: 0, zIndex: 2 },
    exit: { x: '-20vw', zIndex: 0, opacity: 0.5 }
  }),
  transition: Object.freeze({
    // ease: 'easeInOut',
    type: 'tween',
    duration: 0.5
  })
});

// Slide out.
export const slideOut = add('slideOut', {
  variants: Object.freeze({
    initial: { x: '100vw', zIndex: 2 },
    animate: { x: 0, zIndex: 2 },
    exit: { x: '20vw', zIndex: 0, opacity: 0.5 }
  }),
  transition: Object.freeze({
    // ease: 'easeInOut',
    type: 'tween',
    duration: 0.5
  })
});

// Default animations.
Object.defineProperty(animations, '__default__', {
  value: animations.dissolve
});

// Default export.
export default animations;