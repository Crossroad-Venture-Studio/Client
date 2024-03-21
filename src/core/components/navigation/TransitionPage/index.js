export { default as animations } from './animations';
export { default as transitions } from './transitions';

// Dynamically import the component because of the property touchScreenOnly
// which evalutae if a device screen is touchable on client side.
// Otherwise you get an error like:
// Hydration failed because the initial UI does not match what was rendered on the server.
import dynamic from 'next/dynamic';
export const TransitionPage = dynamic(() => import('./TransitionPage'), {
  ssr: false,
});
export default TransitionPage;