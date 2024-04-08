import animations from './animations';

// An object of transitions.
export const transitions = {};

// Defaut transition.
Object.defineProperty(transitions, '__default__', {
  value: animations.__default__
});

// Current transitions.
Object.defineProperty(transitions, '__current__', {
  value: transitions.__default__,
  writable: true
});

// Helper function to set a current transition.
export const setCurrentTransition = input => {
  const output = transitions.__current__ = typeof input === 'object' && input
    || (typeof input === 'string' && animations[input])
    || transitions.__current__
    || transitions.__default__;

    console.log('setTransition', output.__name__, transitions.__default__.__name__);
    return output;
};

// The transition functions.
for (const k in animations) Object.defineProperty(transitions, k, {
  value: () => transitions.__current__ = animations[k],
  enumerable: true
});

Object.defineProperty(transitions, 'custom', {
  value: name => () => setCurrentTransition(name)
});

Object.defineProperty(transitions, 'setCurrentTransition', {
  value: name => setCurrentTransition(name)
});

// Default export.
export default transitions;