/* Author :  Maye Edwin (Google Developer Expert)
  Copyright : https://pwafire.org
  */
import Check from "./check";
import { BadgingApi, BarcodeDetectorApi, ClipboardApi, ConnectivityApi, ContactsApi, ContentIndexingApi, FilesApi, FontsApi, FullscreenApi, IdleDetectionApi, InstallApi, NotificationApi, PaymentApi, ShareApi, VisibilityApi, WakeLockApi, WebOTPApi, screenApi, compressionStreamsApi, } from "./pwa";
const pwafire = {
    pwa: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, BadgingApi), BarcodeDetectorApi), ClipboardApi), ConnectivityApi), ContactsApi), ContentIndexingApi), FilesApi), FontsApi), FullscreenApi), IdleDetectionApi), InstallApi), NotificationApi), WebOTPApi), PaymentApi), ShareApi), VisibilityApi), WakeLockApi), screenApi), compressionStreamsApi),
    check: new Check(),
};
const { pwa, check } = pwafire;
export { check, pwa };
export default pwafire;
//# sourceMappingURL=index.js.map