/* Developer : Maye Edwin (Google Developer Expert):> Copyright : https://pwafire.org */
import PWA from "./pwa";
import Check from "./check";
const pwafire = {
  pwa: new PWA(),
  check: new Check(),
};

const { pwa, check } = pwafire;
export { pwa, check };
export default pwafire;
