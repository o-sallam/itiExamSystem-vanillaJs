import Router from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  const router = new Router(appElement);

  // Note: Router constructor already handles initial rendering and link navigation
  // No need to call router.init() as it doesn't exist and is not needed
  // The Router constructor already sets up event listeners for navigation
});
