// Developer : Maye Edwin (Google Developer Expert):> Copyright : https://pwafire.org */
import Check from "./check";
import {
  BadgingApi,
  BarcodeDetectorApi,
  ClipboardApi,
  ConnectivityApi,
  ContactsApi,
  ContentIndexingApi,
  FilesApi,
  FontsApi,
  FullscreenApi,
  IdleDetectionApi,
  InstallApi,
  NotificationApi,
  PaymentApi,
  ShareApi,
  VisibilityApi,
  WakeLockApi,
  WebOTPApi,
  screenSharingControls,
  windowPIP,
} from "./pwa";

const pwafire = {
  pwa: {
    ...BadgingApi,
    ...BarcodeDetectorApi,
    ...ClipboardApi,
    ...ConnectivityApi,
    ...ContactsApi,
    ...ContentIndexingApi,
    ...FilesApi,
    ...FontsApi,
    ...FullscreenApi,
    ...IdleDetectionApi,
    ...InstallApi,
    ...NotificationApi,
    ...WebOTPApi,
    ...PaymentApi,
    ...ShareApi,
    ...VisibilityApi,
    ...WakeLockApi,
    ...screenSharingControls,
    ...windowPIP,
  },
  check: new Check(),
};

const { pwa, check } = pwafire;
export { check, pwa };

export default pwafire;
