/**
 * Test all package exports to ensure they're working correctly
 */

console.log('🧪 Testing pwafire package exports...\n');

async function testExports() {
  const results = {
    passed: [],
    failed: []
  };

  // Test 1: Main export
  try {
    const main = await import('pwafire');
    console.log('✓ Main export loaded');
    console.log('  Available exports:', Object.keys(main).join(', '));
    results.passed.push('Main export');
  } catch (err) {
    console.error('✗ Main export failed:', err.message);
    results.failed.push('Main export');
  }

  // Test 2: Check API (scoped import)
  try {
    const checkModule = await import('pwafire/check');
    console.log('\n✓ Check API export loaded');
    console.log('  Available checks:', Object.keys(checkModule).join(', '));
    results.passed.push('Check API export');
  } catch (err) {
    console.error('\n✗ Check API export failed:', err.message);
    results.failed.push('Check API export');
  }

  // Test 3: Individual PWA features
  const features = [
    'badging',
    'barcode',
    'clipboard',
    'compression',
    'connectivity',
    'contacts',
    'content-indexing',
    'files',
    'fonts',
    'fullscreen',
    'idle-detection',
    'install',
    'lazy-load',
    'notification',
    'payment',
    'screen',
    'visibility',
    'wake-lock',
    'web-otp',
    'web-share'
  ];

  console.log('\n📦 Testing individual feature exports...');
  for (const feature of features) {
    try {
      const module = await import(`pwafire/${feature}`);
      console.log(`  ✓ pwafire/${feature}`);
      results.passed.push(`Feature: ${feature}`);
    } catch (err) {
      console.error(`  ✗ pwafire/${feature} - ${err.message}`);
      results.failed.push(`Feature: ${feature}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`✓ Passed: ${results.passed.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed tests:');
    results.failed.forEach(test => console.log(`  - ${test}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All exports working correctly!');
  }
}

testExports().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
