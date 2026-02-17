# Testing Guide

## Philosophy

PWAFire uses **pattern-based testing** - we test representative patterns rather than every module.

### Why This Approach?

**23 modules, 5 patterns:**
1. Simple API check (fullscreen, connectivity)
2. Permission-based APIs (notification, contacts)
3. Streaming APIs (summarizer, translator)
4. Complex DOM APIs (lazy-load)
5. Multi-function modules (clipboard, files)

Testing 1-2 examples per pattern covers all code paths without repetition.

## Current Tests

### `/packages/pwafire/src/index.test.ts`

**Coverage:**
- ✅ CommonJS imports work
- ✅ ESM imports work
- ✅ API functions are callable
- ✅ Check functions return booleans
- ✅ Basic pattern validation (visibility API)

**What's NOT tested (intentionally):**
- Every permutation of error handling (same pattern across all modules)
- Browser API unavailability (same check in every module)
- Each of 23 modules individually (redundant)

## Running Tests

```bash
cd packages/pwafire

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

## Writing Tests

### When to Add Tests

✅ **Do add tests for:**
- New API patterns not matching existing ones
- Complex branching logic (5+ execution paths)
- Bug fixes (regression tests)
- Streaming/callback operations
- DOM manipulation with IntersectionObserver

❌ **Don't add tests for:**
- New modules following existing patterns
- Simple wrappers: `if (API) { call(); return success; } else { return error; }`
- Renaming variables or reformatting code

### Test Structure

Follow the existing pattern in `index.test.ts`:

```typescript
describe("Module Name", () => {
  it("should [expected behavior]", async () => {
    // Mock browser API
    Object.defineProperty(navigator, "apiName", {
      configurable: true,
      value: mockValue
    });

    const result = await apiFunction();

    expect(result.ok).toBe(true);
    expect(result.message).toBe("Expected message");
  });
});
```

### Mocking Browser APIs

```typescript
// Mock navigator properties
Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: { writeText: jest.fn().mockResolvedValue(undefined) }
});

// Mock window properties
Object.defineProperty(window, "Notification", {
  configurable: true,
  value: class {
    static requestPermission = jest.fn().mockResolvedValue("granted");
  }
});

// Mock document properties
Object.defineProperty(document, "visibilityState", {
  configurable: true,
  get: () => "visible"
});
```

## Quality Gates

Tests run automatically via:
- **Pre-commit hook** - Must pass before commit
- **CI workflow** - Runs on every push/PR
- **Pre-publish** - `npm run verify` includes tests

## Coverage Goals

**Current:** 66% statements, 0% branches, 8% functions

**Target:** Pattern coverage > Metric coverage
- Representative patterns tested: ✅
- All critical paths covered: ✅
- Meaningful test value: ✅

We prioritize testing unique patterns over hitting arbitrary coverage percentages.

## Examples

### Simple Pattern (No Test Needed)
```typescript
// wake-lock/index.ts - follows standard pattern
export const wakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      const lock = await navigator.wakeLock.request("screen");
      return { ok: true, message: "Active", lock };
    } else {
      return { ok: false, message: "Wake Lock API not supported" };
    }
  } catch (error) {
    return { ok: false, message: error.message };
  }
};
```
**Why no test?** Identical pattern to visibility API (already tested).

### Complex Pattern (Test Recommended)
```typescript
// notification/index.ts - has 5 execution paths
export const notification = async (data) => {
  if (!("Notification" in window)) return notSupported;
  const permission = await Notification.requestPermission();
  if (permission === "denied") return denied;
  if (permission === "granted") {
    if (hasServiceWorker) return swNotification;
    else return directNotification;
  }
  return defaultPermission;
};
```
**Why test?** Multiple branches, permission states, service worker logic.

## Related Documentation

- [Code Style](./code-style.md) - Error handling patterns
- [Tooling](./tooling.md) - Jest configuration
- [AGENTS.md](../../AGENTS.md) - Testing philosophy

## FAQ

**Q: Why is coverage only 66%?**
A: We test patterns, not every module. Higher coverage through repetitive tests adds little value.

**Q: Should I add tests for my new API module?**
A: If it follows an existing pattern (check support → try → catch), no. If it introduces new logic, yes.

**Q: What about integration tests?**
A: The console app at `/console` serves as an integration test environment where all APIs can be tested manually.

**Q: Why not use a mocking library?**
A: Native `Object.defineProperty()` is sufficient for our use case and avoids dependencies.
