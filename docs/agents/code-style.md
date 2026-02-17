# Code Style Guide

## Code Formatting
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Soft limit 100 chars, hard limit 120 chars
- **Semicolons**: Always use semicolons
- **Quotes**: Double quotes for strings: `"hello"`, backticks for templates
- **Trailing Commas**: Use in multi-line objects/arrays

## Comments Policy
- **DO NOT add code comments** - removed on purpose
- Code should be self-documenting
- Use clear variable and function names instead
- Extract complex logic into named functions
- JSDoc only for public APIs when needed for IDE hints

## Error Handling Pattern

**All PWA module functions MUST follow this pattern:**

```typescript
export const functionName = async (...args) => {
  try {
    // 1. Feature detection
    if (!featureAvailable) {
      return { ok: false, message: "API not supported" };
    }

    // 2. API call (use sync when underlying API is sync, e.g. connectivity, visibility)
    const result = await someAPI(...args);
    return { ok: true, message: "Success message", ...data };
  } catch (error) {
    // 3. Return error (never throw)
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Operation failed"
    };
  }
};
```

**Key Rules:**

- ✅ Always use try/catch
- ✅ Return `{ok: boolean, message: string}` format
- ✅ Never throw errors - catch and return them
- ✅ Use `error instanceof Error` for type safety
- ✅ Feature detection returns `{ok: false, message: "API not supported"}`
- ✅ Success returns `{ok: true, message: "...", ...optionalData}`

## Type Safety Guidelines

**DO:**

- Use `unknown` for experimental browser APIs in types.d.ts
- Use `as any` casts only when necessary for untyped APIs
- Use `declare let` instead of `declare var`
- Keep type definitions minimal to avoid future conflicts

**DON'T:**

- Don't define comprehensive interfaces for browser APIs
- Don't use `any` in function parameters or return types
- Don't create custom interfaces that might conflict with future TS updates

**Example:**

```typescript
// ✅ Good - minimal typing
declare let BarcodeDetector: {
  new (options?: { formats: string[] }): unknown;
  getSupportedFormats(): Promise<string[]>;
};

// ❌ Bad - defining full interface
interface BarcodeDetectorFull {
  detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
  // ... many more properties
}
```

## Function Style

**Arrow Functions:**
- Use arrow functions for consistency
- Example:
  ```typescript
  export const functionName = async (params: Type) => {
    // implementation
  };
  ```

**Function Length:**
- Keep functions short and focused (under 30 lines)
- Extract complex logic into helper functions
- One responsibility per function

**Parameters:**
- Maximum 3 parameters
- Use object parameter for more than 3
- Example:
  ```typescript
  // Good
  export const apiName = async (config: { prop1: string; prop2: number }) => {};

  // Avoid
  export const apiName = async (p1: string, p2: number, p3: boolean, p4: string) => {};
  ```

## Sync vs Async
- Use **sync** when the underlying browser API is synchronous (e.g. `navigator.onLine`, `document.visibilityState`, `BroadcastChannel`)
- Use **async** when the API returns a Promise or requires user interaction
- Sync APIs: `connectivity`, `visibility`, `displayMode`, `broadcast`

## Async/Await
- Prefer async/await over promises for async APIs
- Always handle errors internally
- Example:
  ```typescript
  export const apiName = async (params: Type) => {
    try {
      const result = await someOperation();
      return { ok: true, message: "Success", data: result };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Failed"
      };
    }
  };
  ```
