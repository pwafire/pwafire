#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PWAFIRE_PATH="$SCRIPT_DIR/../packages/pwafire"

echo ""
echo -e "${BLUE}🔥 PWAFire Console - Vite + TypeScript${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Step 1: Build the package
echo -e "${BLUE}📦 Building pwafire package...${NC}"
cd "$PWAFIRE_PATH" || exit 1
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build failed!${NC}"
  exit 1
fi

# Step 2: Install dependencies if needed
cd "$SCRIPT_DIR" || exit 1
if [ ! -d "node_modules" ]; then
  echo ""
  echo -e "${BLUE}📥 Installing dependencies...${NC}"
  npm install
fi

# Step 3: Run tests
echo ""
echo -e "${BLUE}🧪 Running tests...${NC}"
npm test
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Some tests failed, but continuing...${NC}"
fi

# Step 4: Start Vite dev server
echo ""
echo -e "${BLUE}🚀 Starting Vite dev server...${NC}"
echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}✅ Console ready with HMR!${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo -e "${YELLOW}📱 Browser URL:${NC}"
echo -e "   ${BLUE}http://localhost:8080${NC}"
echo ""
echo -e "${YELLOW}✨ Features:${NC}"
echo -e "   • Hot Module Replacement (HMR)"
echo -e "   • TypeScript support"
echo -e "   • Fast refresh on file changes"
echo ""
echo -e "${YELLOW}💡 Tip:${NC} Changes to app.ts will update instantly!"
echo ""

npm run dev
