#!/bin/bash

echo "🔥 Setting up PWAFire local test environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PWAFIRE_PATH="$SCRIPT_DIR/../packages/pwafire"

echo -e "${BLUE}📍 Package location: ${PWAFIRE_PATH}${NC}"
echo ""

# Step 1: Build the package
echo -e "${BLUE}📦 Step 1: Building pwafire package...${NC}"
cd "$PWAFIRE_PATH" || exit 1
npm run build

# Step 2: Install dependencies in test directory
echo -e "${BLUE}📥 Step 2: Installing test dependencies...${NC}"
cd "$SCRIPT_DIR" || exit 1
npm install

# Step 3: Copy built library to public folder for browser tests
echo -e "${BLUE}📋 Step 3: Copying library to public folder...${NC}"
mkdir -p public/lib
cp -r "$PWAFIRE_PATH/lib/"* public/lib/
echo -e "   Copied library files for browser tests"

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Run Node.js tests: ${BLUE}npm test${NC}"
echo "  2. Start browser tests: ${BLUE}npm run serve${NC}"
echo "  3. Open http://localhost:8080 in your browser"
echo ""
echo -e "${YELLOW}Development workflow:${NC}"
echo "  • In package root: ${BLUE}npm run dev${NC} (watch mode)"
echo "  • In test-local: ${BLUE}npm run serve${NC} (test server)"
echo ""
