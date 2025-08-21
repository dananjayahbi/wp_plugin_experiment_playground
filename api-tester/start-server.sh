#!/bin/bash

echo "========================================"
echo "   Trans Express API Tester Server"
echo "========================================"
echo ""

# Change to the directory containing this script
cd "$(dirname "$0")"

if [ -f "server.py" ]; then
    echo "Found server.py, starting Python server..."
    echo ""
    
    # Try python3 first, then python
    if command -v python3 >/dev/null 2>&1; then
        python3 server.py
    elif command -v python >/dev/null 2>&1; then
        python server.py
    else
        echo "❌ Python not found!"
        echo "Please install Python 3 and try again."
        echo ""
        echo "Alternative: Open index.html directly and use a CORS browser extension."
        exit 1
    fi
else
    echo "❌ server.py not found!"
    echo "Please make sure you're running this from the api-tester folder."
    exit 1
fi

echo ""
echo "Server stopped."
