# Breaking Changes

## Version 6.0.0

This release includes significant API improvements to standardize all PWAFire APIs to use pure Promise patterns. All APIs now return consistent response formats with `{ ok, message, ...data }`.

### APIs Refactored to Pure Promise Pattern

#### 1. webOtp
**Before:**
```typescript
// Callback-only, no return value
webOtp((data) => {
  console.log(data.code);
});
```

**After:**
```typescript
// Returns response directly
const { ok, code, message } = await webOtp();
if (ok) {
  console.log(code);
}
```

**Migration:**
- Remove callback parameter
- Use await and destructure response
- Check `ok` property for success

---

#### 2. visibility
**Before:**
```typescript
// Optional callbacks
visibility((state) => {
  console.log(state);
});
```

**After:**
```typescript
// Returns state directly
const { ok, state, message } = await visibility();
if (ok) {
  console.log(state);
}
```

**Migration:**
- Remove callback parameter
- Use await and destructure response
- Access state from response object

---

#### 3. displayMode
**Before:**
```typescript
// Callback-only
displayMode((mode) => {
  console.log(mode);
});
```

**After:**
```typescript
// Returns mode directly
const { ok, mode, message } = await displayMode();
if (ok) {
  console.log(mode);
}
```

**Migration:**
- Remove callback parameter
- Use await and destructure response
- Access mode from response object

---

#### 4. connectivity
**Before:**
```typescript
// Optional callbacks
connectivity((isOnline) => {
  console.log(isOnline);
});
```

**After:**
```typescript
// Returns online status directly
const { ok, online, message } = await connectivity();
if (ok) {
  console.log(online);
}
```

**Migration:**
- Remove callback parameter
- Use await and destructure response
- Access online status from response object

---

#### 5. screenShare
**Before:**
```typescript
// Could throw errors
try {
  const stream = await screenShare(config);
} catch (error) {
  console.error(error);
}
```

**After:**
```typescript
// Returns consistent response format
const { ok, stream, message } = await screenShare(config);
if (ok) {
  // use stream
} else {
  console.log(message); // error message
}
```

**Migration:**
- Remove try/catch blocks
- Check `ok` property instead
- Access stream from response object

---

#### 6. webPIP
**Before:**
```typescript
// Callback-only, no return value
webPIP((data) => {
  console.log(data.message);
}, { width: 400, height: 300 });
```

**After:**
```typescript
// Returns setup status, callback optional
const { ok, message } = await webPIP(
  (data) => { console.log('PiP activated:', data.message); },
  { width: 400, height: 300 }
);
if (ok) {
  console.log('PiP listener setup complete');
}
```

**Migration:**
- Callback is now optional
- Returns setup status immediately
- Callback still fires when button is clicked (if provided)

---

#### 7. install
**Before:**
```typescript
// Callback required
install("before", (event) => {
  console.log(event);
});
```

**After:**
```typescript
// Callback optional
const { ok, message } = await install("before", (event) => {
  console.log(event);
});
```

**Migration:**
- Callback is now optional
- Returns setup status immediately
- Callback still fires when event occurs (if provided)

---

### Benefits of These Changes

1. **Consistency:** All APIs follow the same pattern
2. **Type Safety:** Better TypeScript support with predictable return types
3. **Error Handling:** No need for try/catch - check `ok` property instead
4. **Simplicity:** Less boilerplate code
5. **Flexibility:** Can use with or without callbacks where appropriate

### Migration Guide

**General Pattern:**

```typescript
// Old callback pattern
oldApi((result) => {
  console.log(result);
});

// New Promise pattern
const { ok, data, message } = await newApi();
if (ok) {
  console.log(data);
} else {
  console.log(message); // error message
}
```

**Built-in Error Handling:**

All PWAFire APIs handle errors internally and never throw. You can safely await without try/catch:

```typescript
// No try/catch needed!
const { ok, message } = await copyText("Hello World");

if (ok) {
  console.log("Success:", message);
} else {
  console.log("Failed:", message);
}
```

### Version Upgrade

To upgrade to version 6.0.0:

```bash
npm install pwafire@latest
```

Then update your code to use the new Promise-based patterns shown above.
