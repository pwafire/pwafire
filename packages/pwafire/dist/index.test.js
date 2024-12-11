import pwafire, { check, pwa } from "./index";
import Check from "./check";
import { BadgingApi, BarcodeDetectorApi, ClipboardApi, ConnectivityApi, ContactsApi, ContentIndexingApi, FilesApi, FontsApi, FullscreenApi, IdleDetectionApi, InstallApi, NotificationApi, PaymentApi, ShareApi, VisibilityApi, WakeLockApi, WebOTPApi, screenApi, compressionStreamsApi, } from "./pwa";
describe("pwafire", () => {
    it("should have a pwa property", () => {
        expect(pwafire).toHaveProperty("pwa");
    });
    it("should have a check property", () => {
        expect(pwafire).toHaveProperty("check");
        expect(pwafire.check).toBeInstanceOf(Check);
    });
    it("should export pwa and check", () => {
        expect(pwa).toBe(pwafire.pwa);
        expect(check).toBe(pwafire.check);
    });
    it("should include all PWA APIs in pwa property", () => {
        expect(pwafire.pwa).toMatchObject(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, BadgingApi), BarcodeDetectorApi), ClipboardApi), ConnectivityApi), ContactsApi), ContentIndexingApi), FilesApi), FontsApi), FullscreenApi), IdleDetectionApi), InstallApi), NotificationApi), WebOTPApi), PaymentApi), ShareApi), VisibilityApi), WakeLockApi), screenApi), compressionStreamsApi));
    });
});
//# sourceMappingURL=index.test.js.map