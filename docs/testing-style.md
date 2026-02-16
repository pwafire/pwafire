# Testing Style Guide

## Dynamic Generation
- Generate tests from exports, don't hardcode
- Example:
  ```javascript
  Object.keys(pwafire).forEach(apiName => {
    if (typeof pwafire[apiName] === 'function') {
      // Generate test dynamically
    }
  });
  ```

## Test Configuration
- Store test configs in objects
- Make tests data-driven
- Example:
  ```javascript
  const apiConfigs = {
    webShare: {
      title: 'Web Share',
      params: () => [{ title: 'Test', url: location.href }]
    }
  };
  ```

## Feature Detection
- Dynamic feature scanning from check API
- Match check names to main API names
- Pattern: `check.apiName()` corresponds to `pwafire.apiName()`
