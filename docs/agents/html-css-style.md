# HTML/CSS Style Guide (Test Console)

## HTML
- Semantic HTML5 elements
- Minimal structure, maximum JS
- No inline styles
- Example:
  ```html
  <div class="test-grid" id="test-grid">
    <!-- Populated by JS -->
  </div>
  ```

## CSS
- **No box-shadow** (user preference)
- **Monochrome palette**: black (#000), grays (#111-#888), white (#fff)
- **BEM-like naming**: `.test-card`, `.feature-item`
- **Mobile-first** responsive design

## JavaScript (Browser)
- ES6+ features
- Module pattern
- Dynamic DOM generation
- No jQuery or heavy frameworks
