export { default as animations } from './animations';
import dynamic from 'next/dynamic';
export const TransitionPage = dynamic(() => import('./TransitionPage'), {
  ssr: false,
});
export default TransitionPage;