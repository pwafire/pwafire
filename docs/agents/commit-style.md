# Commit & Release Style Guide

## Commit Message Format

**Pattern:**

```text
<type>(<scope>) - <description>
```

**Examples:**

```text
chore(cleanup) - standardize error handling across modules
fix(lazy-load) : #12345 - prevent CSS injection in background images
docs(readme) - update installation instructions
feat(notifications) - add support for notification actions
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `chore` - Maintenance, refactoring, cleanup, docs, tests, CI/CD

**Scopes:**

- `cleanup` - Code quality, removing unused files
- `deps` - Dependency updates
- `github` - GitHub-specific changes
- Module names: `badging`, `clipboard`, `lazy-load`, etc.

## PR and Release Summaries

**Keep it SHORT and focused on KEY things only:**

**PR Title:**

- Must follow the same format as commit messages: `<type>(<scope>): <description>`
- Must be lowercase
- Must include a scope
- Only 3 types allowed: `feat(`, `fix(`, `chore(`
- Examples:
  - `chore(github): remove ci.md documentation file`
  - `feat(notifications): add support for notification actions`
  - `fix(lazy-load): prevent css injection in background images`

**PR Description:**

- Brief overview (2-3 sentences)
- Key features/changes (bullet points, max 5-7 items)
- Breaking changes (if any)
- No lengthy explanations or redundant details

**Release Notes:**

- Highlight main features only
- Code examples for new APIs (minimal, essential only)
- Installation/upgrade instructions (if needed)
- Link to full changelog
- Avoid verbose explanations

**Example (Good):**

```markdown
## What's New

- Add Summarizer API (batch + streaming)
- Add Translator API with language pairs
- Status codes for error handling

## Install

npm install pwafire@6.1.0
```

**Example (Bad):**

```markdown
## What's New

This PR adds support for Chrome's built-in Web AI APIs...
[3 paragraphs of explanation]
[Detailed code examples for every scenario]
[Long technical descriptions]
```
