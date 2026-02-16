# Git Hooks

This directory contains git hooks managed by [Husky](https://typicode.github.io/husky/).

## Hooks

### `commit-msg`
Validates commit messages using commitlint.

**Enforces:**
- Format: `<type>(<scope>): <subject>`
- Types: feat, fix, chore, docs, ci, test, refactor, style
- Scope is required
- Subject must be lowercase
- Max length: 100 characters

**Examples:**
```bash
✅ feat(clipboard): add paste image support
✅ fix(notifications): resolve permission error
✅ chore(deps): update typescript to 5.8
❌ add feature  # Missing type and scope
❌ feat: add feature  # Missing scope
❌ feat(clipboard): Add feature  # Subject not lowercase
```

### `pre-commit`
Runs tests before commit to ensure code quality.

**Checks:**
- Jest test suite (all tests must pass)

**To skip hooks (use sparingly):**
```bash
git commit --no-verify -m "feat(scope): emergency fix"
```

**Note:** Linting is checked in CI, not pre-commit.

## Configuration

- **commitlint.config.js** - Commit message rules
- **package.json** - Husky setup (`prepare` script)

## Testing Hooks

Test commit message validation:
```bash
echo "feat(test): test commit" | npx commitlint
```

Test linting:
```bash
cd packages/pwafire && npm run lint
```
