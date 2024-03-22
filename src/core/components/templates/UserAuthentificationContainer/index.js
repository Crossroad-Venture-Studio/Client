// Dynamically import the component because of the checkAuthenticated method
// which evalutae if a user is already authenticated client side or not.
// Otherwise you get an error like:
// Hydration failed because the initial UI does not match what was rendered on the server.
import dynamic from 'next/dynamic';
export const UserAuthentificationContainer = dynamic(() => import('./UserAuthentificationContainer'), {
  ssr: false,
});
export default UserAuthentificationContainer;