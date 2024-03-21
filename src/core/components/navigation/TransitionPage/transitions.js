import animations from './animations';

export const transitions = {};
const createTransition = name => pageTransitions[name] = () => animations.set(name);
export const slideIn = createTransition('slideIn');
export const slideOut = createTransition('slideOut');
export const dissolve = createTransition('dissolve');
export default transitions;