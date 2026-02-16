# CI/CD Setup

## What You Get

**2 Simple Workflows:**

1. **`ci.yml`** - Runs on every push/PR
   - Lint, test, build, coverage
   - ~3 minutes runtime

2. **`publish.yml`** - Runs on version tags
   - Auto-publishes to npm using trusted OIDC (no secrets!)
   - Creates GitHub release

## Setup

### ✅ Already Done: npm Trusted Publisher

You're using npm's [Trusted Publisher](https://docs.npmjs.com/trusted-publishers) with OIDC - this is **better than tokens** because:
- ✅ No secrets to manage
- ✅ More secure (automatic rotation)
- ✅ Built-in provenance attestation

Your npm package is configured to trust this workflow ✨

### Optional: Codecov

For coverage reports, add `CODECOV_TOKEN`:
- Sign up at [codecov.io](https://codecov.io)
- Add token: **Settings → Secrets → Actions → New secret**

## How to Release

```bash
# 1. Bump version in package.json
npm version patch  # or: minor, major

# 2. Push with tags
git push origin main --tags

# 3. That's it!
# GitHub Actions publishes automatically via OIDC
```

## Verify Setup

Check that npm package trusts your workflow:
1. Go to [npmjs.com/package/pwafire/access](https://www.npmjs.com/package/pwafire/access)
2. Check "Publishing" tab
3. Should show: `pwafire/pwafire` repository with `publish.yml` workflow

## Troubleshooting

**Publish fails with authentication error?**
- Verify trusted publisher config on npm matches:
  - Repository: `pwafire/pwafire`
  - Workflow: `publish.yml`
  - Environment: (leave empty)

**Want to test locally without publishing?**
```bash
npm pack  # Creates tarball without publishing
```

## That's It!

No NPM_TOKEN needed. No secrets to rotate. Just push a tag and it publishes. 🚀
