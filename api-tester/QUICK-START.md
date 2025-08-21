# Trans Express API Tester - Quick Setup Guide

## 🚀 Quick Start (1 minute setup)

### Step 1: Start the Server
Choose one method:

**Windows:**
- Double-click `start-server.bat`

**Mac/Linux:**
- Double-click `start-server.sh`

**Manual (any OS):**
```bash
cd api-tester
python server.py
```

### Step 2: Open Browser
Open `http://localhost:8080` in your web browser

### Step 3: Configure API
1. Enter your Bearer token in the configuration section
2. Click "Save Configuration"

### Step 4: Start Testing
Click any "Test" button to test the API endpoints!

## ✅ What This Solves

- **CORS Issues**: The server acts as a proxy to bypass browser CORS restrictions
- **Direct Testing**: All endpoints can be tested with one click
- **Real API Calls**: Makes actual calls to Trans Express staging/production APIs

## 🔧 If You See Errors

### "Failed to fetch" or CORS errors
- **Solution**: Use the local server (steps above)
- **Why**: Browsers block cross-origin requests for security

### "Python not found"
- **Solution**: Install Python 3 from python.org
- **Alternative**: Use Postman or a CORS browser extension

### API returns errors
- Check your Bearer token is correct
- Verify you're using the right environment (staging/production)
- Check the API documentation for required fields

## 📱 Testing Without Server

If you can't run the local server:
1. Install a CORS browser extension like "CORS Unblock"
2. Enable it for testing
3. Open `index.html` directly in browser

## 🎯 Success Indicators

When working correctly, you should see:
- 🟢 "Proxy Mode Active" indicator (top-left)
- Green success messages after clicking test buttons
- JSON responses in the result areas
- No CORS error messages

---

**Need Help?** Check the full README.md for detailed documentation.
