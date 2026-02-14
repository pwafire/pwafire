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
echo -e "${BLUE}🔥 PWAFire Local Test Environment${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Step 1: Build the package
echo -e "${BLUE}📦 Building pwafire package...${NC}"
cd "$PWAFIRE_PATH" || exit 1
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build failed!${NC}"
  exit 1
fi

# Step 2: Copy library to public folder
echo ""
echo -e "${BLUE}📋 Copying library to public folder...${NC}"
cd "$SCRIPT_DIR" || exit 1
mkdir -p public/lib
cp -r "$PWAFIRE_PATH/lib/"* public/lib/
echo -e "${GREEN}   ✓ Library files copied${NC}"

# Step 3: Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo ""
  echo -e "${BLUE}📥 Installing dependencies...${NC}"
  npm install
fi

# Step 4: Run tests
echo ""
echo -e "${BLUE}🧪 Running tests...${NC}"
npm test
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Some tests failed, but continuing...${NC}"
fi

# Step 5: Kill any existing server on port 8080
echo ""
echo -e "${BLUE}🔍 Checking for existing server...${NC}"
EXISTING_PID=$(lsof -ti:8080)
if [ ! -z "$EXISTING_PID" ]; then
  echo -e "${YELLOW}   Found existing server (PID: $EXISTING_PID), stopping it...${NC}"
  kill $EXISTING_PID 2>/dev/null
  sleep 1
fi

# Step 6: Start the server
echo ""
echo -e "${BLUE}🚀 Starting test server...${NC}"
python3 -m http.server 8080 --directory public > /dev/null 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 1

# Verify server is running
if lsof -ti:8080 > /dev/null 2>&1; then
  echo -e "${GREEN}   ✓ Server started (PID: $SERVER_PID)${NC}"

  echo ""
  echo -e "${GREEN}=================================${NC}"
  echo -e "${GREEN}✅ Test environment ready!${NC}"
  echo -e "${GREEN}=================================${NC}"
  echo ""
  echo -e "${YELLOW}📱 Browser Test:${NC}"
  echo -e "   ${BLUE}http://localhost:8080${NC}"
  echo ""
  echo -e "${YELLOW}📝 Quick Commands:${NC}"
  echo -e "   View tests: ${BLUE}npm test${NC}"
  echo -e "   Stop server: ${BLUE}kill $SERVER_PID${NC}"
  echo -e "   Or press: ${BLUE}Ctrl+C${NC}"
  echo ""
  echo -e "${YELLOW}💡 Tip:${NC} Open the URL above in your browser to test all PWA features!"
  echo ""

  # Keep script running and handle Ctrl+C
  trap "echo ''; echo -e '${YELLOW}🛑 Stopping server...${NC}'; kill $SERVER_PID 2>/dev/null; echo -e '${GREEN}✅ Server stopped${NC}'; exit 0" INT TERM

  # Wait for server process
  wait $SERVER_PID
else
  echo -e "${RED}❌ Failed to start server${NC}"
  exit 1
fi
