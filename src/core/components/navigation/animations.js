'use client';

// Main object to export.
export const animations = {};

// Helper function to add a new animation to the engine.
Object.defineProperty(animations, 'add', {
  value: function (name, value) {
    return name && Object.defineProperty(this, name, {
      value: Object.freeze(Object.assign(this.default || {}, value || {})),
      enumerable: true
    });
  }
});

const add = (name, value) => animations.add(name, value)[name];

// Helper function to set the current animation.
Object.defineProperty(animations, 'set', {
  value: function (input) {
    const output = typeof input === 'object' && input
      || (typeof input === 'string' && this[input])
      || this.current
      || this.default;
    return this.current = output;
  }
});

// Different animation styles.
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

export const slideOut = add('slideOut', {
  variants: Object.freeze({
    initial: { x: '-100vw', zIndex: 2 },
    animate: { x: 0, zIndex: 2 },
    exit: { x: '20vw', opacity: 0.5, zIndex: 0 }
  }),
  transition: Object.freeze({
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.5
  })
});

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

// Current and default animations.
Object.defineProperty(animations, 'current', {
  value: null,
  writable: true
});
export const DEFAULT_ANIMATION = animations.set('slideIn');
Object.defineProperty(animations, 'default', { get() { return DEFAULT_ANIMATION; } });

// Default export.
export default animations;