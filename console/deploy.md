# Deploying to Firebase Hosting

## Prerequisites

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

## Setup

### First Time Setup

1. **Initialize Firebase** (if not already done)

   ```bash
   firebase init hosting
   ```

   When prompted:

   - Choose your Firebase project or create a new one
   - Set public directory to: `public`
   - Configure as single-page app: `No`
   - Set up automatic builds: `No`
   - Don't overwrite existing files

2. **Update Project ID**

   Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID:

   ```json
   {
     "projects": {
       "default": "your-actual-project-id"
     }
   }
   ```

## Build & Deploy

### Quick Deploy

```bash
# From test-local directory
./setup.sh        # Build the package and copy lib files
firebase deploy   # Deploy to Firebase
```

### Step-by-Step

1. **Build the package**

   ```bash
   cd ../packages/pwafire
   npm run build
   ```

2. **Copy library files**

   ```bash
   cd ../../test-local
   cp -r ../packages/pwafire/lib/* public/lib/
   ```

3. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

## Deployment URL

After deployment, your test console will be available at:

```
https://your-project-id.web.app
```

## Environment-Specific Deployments

### Deploy to specific project

```bash
firebase use your-project-id
firebase deploy --only hosting
```

### Deploy to staging

```bash
firebase use staging-project-id
firebase deploy --only hosting
```

### Preview before deploying

```bash
firebase hosting:channel:deploy preview
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy-test.yml`:

```yaml
name: Deploy Test Console

on:
  push:
    branches:
      - main
    paths:
      - "test-local/**"
      - "packages/pwafire/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: |
          cd packages/pwafire
          npm ci

      - name: Build package
        run: |
          cd packages/pwafire
          npm run build

      - name: Copy lib files
        run: |
          cd test-local
          mkdir -p public/lib
          cp -r ../packages/pwafire/lib/* public/lib/

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          channelId: live
          projectId: your-project-id
```

## Post-Deployment

### Test the deployment

```bash
# Open in browser
firebase open hosting:site
```

### View deployment history

```bash
firebase hosting:clone your-project-id:source-site-id your-project-id:dest-site-id
```

### Rollback if needed

```bash
firebase hosting:rollback
```

## Tips

1. **Always build before deploying**

   - Run `./setup.sh` to ensure lib files are up to date

2. **Check file sizes**

   - Firebase has a 2GB limit per file
   - Current files are well under this limit

3. **Custom domain**

   ```bash
   firebase hosting:channel:create production
   ```

4. **Monitor performance**
   - Check Firebase Console > Hosting
   - View bandwidth and request metrics

## Troubleshooting

### "No project active"

```bash
firebase use --add
```

### "Permission denied"

```bash
firebase login --reauth
```

### "Files not found"

Make sure you've run:

```bash
cp -r ../packages/pwafire/lib/* public/lib/
```

### "Build errors"

```bash
cd ../packages/pwafire
npm run build
# Check for TypeScript errors
```
