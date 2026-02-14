#!/bin/bash

cd "$(dirname "$0")"

echo "Preparing deployment..."

cp public/app.js public/app.backup.js
cp public/index.html public/index.backup.html

sed -i.tmp "s|from './lib/index.mjs'|from 'https://unpkg.com/pwafire@latest/lib/index.mjs'|g" public/app.js
sed -i.tmp "s|from './lib/check/index.mjs'|from 'https://unpkg.com/pwafire@latest/lib/check/index.mjs'|g" public/app.js
sed -i.tmp "s|<span>LOCAL</span>|<span>CDN</span>|g" public/index.html
rm -f public/app.js.tmp public/index.html.tmp

echo "Deploying to Firebase..."
firebase deploy --only hosting:console-pwafire

echo "Restoring local version..."
mv public/app.backup.js public/app.js
mv public/index.backup.html public/index.html

echo "Deployment complete!"
echo ""
echo "🚀 Deployed to:"
echo "   - https://console-pwafire.web.app"
echo "   - https://console.pwafire.org (if DNS configured)"
