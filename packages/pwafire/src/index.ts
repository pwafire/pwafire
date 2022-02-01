//  Authors : Maye Edwin & Marta Wiśniewska (Google Developer Experts)
// Copyright : https://pwafire.org
import PWA from './pwa';
import Check from './check';
// Create pwafire object...
const pwafire = {
  pwa: new PWA(),
  check : new Check(),
};

// Exports...
const { pwa, check} = pwafire;
export { pwafire, pwa, check };
export default pwafire;
