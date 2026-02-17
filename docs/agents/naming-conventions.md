# Naming Conventions

## Functions & Variables
- Use camelCase for all function and variable names
- Examples: `webShare`, `copyText`, `screenShare`, `accessFonts`
- Check API functions match main API names: `check.webShare()` for `webShare()`
- Boolean prefix: `isValid`, `hasPermission`, `canEdit`

## Files & Directories
- **All filenames**: Use kebab-case (lowercase with dashes): `breaking-changes.md`, `deploy.md`
- **Exceptions**:
  - `README.md` and `LICENSE` remain capitalized
  - `.github/` directory files: `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `FUNDING.yml`
- **Directories**: Use kebab-case: `web-share`, `idle-detection`, `test-console`
- **TypeScript files**: Use camelCase when exporting single function
- **Index files**: Always use `index.ts` for module exports

## API Naming
- Keep names concise and descriptive
- Avoid verbose names: `screenShare` not `screenSharingControls`
- Be consistent: if main API is `webShare`, check is `webShare()`
- Verb-noun pattern: what it does, not what it is

## Constants
- SCREAMING_SNAKE_CASE for true constants: `const MAX_RETRY_ATTEMPTS = 3`
- Use uppercase sparingly - only for values that never change

## Types/Interfaces
- PascalCase: `ResponseType`, `ConfigOptions`
- Descriptive suffixes: `UserConfig`, `ApiResponse`, `ErrorMessage`
