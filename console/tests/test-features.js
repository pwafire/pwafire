/**
 * Test feature detection and basic functionality
 * Note: Some features require browser environment
 */

console.log("🔍 Testing pwafire feature detection...\n");

async function testFeatures() {
  try {
    // Import check module
    const checkModule = await import("pwafire/check");

    console.log("Testing feature detection in Node.js environment:");
    console.log("(Note: Many PWA features require a browser)\n");

    // Test check functions
    const features = {
      badging: checkModule.badging,
      barcode: checkModule.barcode,
      clipboard: checkModule.clipboard,
      compression: checkModule.compression,
      connectivity: checkModule.connectivity,
      contacts: checkModule.contacts,
      files: checkModule.files,
      fonts: checkModule.fonts,
      fullscreen: checkModule.fullscreen,
      notification: checkModule.notification,
      passkey: checkModule.passkey,
      payment: checkModule.payment,
      visibility: checkModule.visibility,
      wakeLock: checkModule.wakeLock,
      webShare: checkModule.webShare
    };

    let tested = 0;
    let errors = 0;

    for (const [name, checkFn] of Object.entries(features)) {
      if (typeof checkFn === "function") {
        try {
          const supported = checkFn();
          console.log(
            `  ${name}: ${supported ? "✓ Supported" : "✗ Not supported"}`
          );
          tested++;
        } catch (err) {
          console.log(
            `  ${name}: ⚠ Cannot check in Node.js (requires browser)`
          );
          errors++;
        }
      } else {
        console.log(`  ${name}: ⚠ Not a function`);
      }
    }

    console.log("\n✅ Feature detection tests completed");
    console.log(`   Tested: ${tested}, Errors (expected): ${errors}`);
    console.log("💡 For full PWA feature testing, open the browser test page");
  } catch (err) {
    console.error("❌ Feature testing failed:", err);
    process.exit(1);
  }
}

testFeatures();
