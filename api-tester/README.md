# Trans Express API Tester

A comprehensive web application for testing all Trans Express delivery service API endpoints easily.

## 🚨 Important: CORS Setup Required

The API endpoints are blocked by CORS policy when accessed directly from the browser. **You MUST use one of these solutions:**

### ✅ Recommended Solution: Local Server (Included)

1. **Windows Users:**
   - Double-click `start-server.bat`
   - Or open terminal in api-tester folder and run: `python server.py`

2. **Mac/Linux Users:**
   - Double-click `start-server.sh` 
   - Or open terminal in api-tester folder and run: `./start-server.sh`

3. **Manual Start:**
   ```bash
   cd api-tester
   python server.py
   ```

4. **Open your browser to:** `http://localhost:8080`

The server includes a built-in CORS proxy that automatically handles all API calls without issues.

### 🔧 Alternative Solutions

- **Browser Extension:** Install a CORS extension like "CORS Unblock" (for testing only)
- **Postman:** Use Postman instead - it doesn't enforce CORS policies

## Features

### 🚀 Complete API Coverage
- **Location Data**: Get provinces, districts, and cities
- **Single Orders**: Create orders with auto or manual waybill generation
- **Bulk Orders**: Create multiple orders at once
- **Order Tracking**: Track orders using waybill ID

### 🎯 User-Friendly Interface
- Clean, modern design with intuitive navigation
- One-click testing for all endpoints
- Real-time results display with JSON formatting
- Status indicators for success/failure
- Loading animations during API calls

### ⚙️ Configuration Management
- Support for both staging and production environments
- Secure token storage with local persistence
- Import/export configuration and results
- Auto-save form data

### 📊 Advanced Features
- Global test results tracking
- Performance monitoring
- Bulk order management with dynamic forms
- Comprehensive validation
- Keyboard shortcuts
- Export test results to JSON

## Quick Start

1. **Open the Application**
   ```
   Open index.html in your web browser
   ```

2. **Configure API Settings**
   - Select environment (Staging/Production)
   - Enter your Bearer token
   - Click "Save Configuration"

3. **Start Testing**
   - Click any "Test" button to test specific endpoints
   - View results in real-time
   - Check global results for overview

## API Endpoints Covered

### Location Data (GET)
- `GET /provinces` - Get all provinces in Sri Lanka
- `GET /districts?province_id={id}` - Get districts by province
- `GET /cities?district_id={id}` - Get cities by district

### Single Orders (POST)
- `POST /orders/upload/single-auto-without-city` - Auto waybill generation
- `POST /orders/upload/single-manual` - Manual waybill specification

### Bulk Orders (POST)
- `POST /orders/upload/auto` - Bulk orders with auto waybill
- `POST /orders/upload/manual` - Bulk orders with manual waybill

### Order Tracking (POST)
- `POST /tracking` - Track order by waybill ID

## Environments

### Staging (Testing)
- **URL**: `https://dev-transexpress.parallaxtec.com/api`
- **Purpose**: Testing and development
- **Login Portal**: https://dev-transexpress.parallaxtec.com/

### Production
- **URL**: `https://portal.transexpress.lk/api`
- **Purpose**: Live operations
- **Login Portal**: https://portal.transexpress.lk/

## File Structure

```
api-tester/
├── index.html          # Main application interface
├── css/
│   └── style.css       # Application styling
└── js/
    ├── config.js       # Configuration management
    ├── api-calls.js    # API interaction functions
    ├── ui-helpers.js   # UI helper functions
    └── main.js         # Main application logic
```

## Usage Examples

### Testing Location Data
1. Click "Test Get Provinces" - No configuration needed
2. Enter province ID (1-9) and click "Test Get Districts"
3. Enter district ID and click "Test Get Cities"

### Testing Single Orders
1. Configure API settings with your token
2. Fill in customer details:
   - Customer name (required)
   - Address (required)
   - Phone number (10 digits, required)
   - COD amount (required)
   - City name/ID (required)
3. Click "Test Add Single Order"

### Testing Bulk Orders
1. Configure API settings
2. Fill multiple order forms (use "Add Another Order" button)
3. Click "Test Add Bulk Orders"

### Testing Order Tracking
1. Configure API settings
2. Enter 8-digit waybill ID
3. Click "Test Track Order"

## Validation Features

- **Phone Numbers**: Validates 10-digit Sri Lankan phone numbers
- **Waybill IDs**: Validates 8-digit waybill numbers
- **COD Amounts**: Validates positive numbers
- **Required Fields**: Prevents submission with missing data

## Keyboard Shortcuts

- `Ctrl + Enter`: Save configuration
- `Ctrl + R`: Clear all results
- `Escape`: Clear current focus

## Global Functions

Access advanced features via browser console:

```javascript
// Export all test results
transExpressApiTester.exportResults()

// Import configuration
transExpressApiTester.importConfig()

// Run all location tests
transExpressApiTester.runAllLocationTests()

// Get performance statistics
transExpressApiTester.getPerformanceStats()

// Clear all data
transExpressApiTester.clearAllData()
```

## Data Storage

- **Configuration**: Stored in localStorage
- **Form Data**: Auto-saved to localStorage
- **API Logs**: Stored in sessionStorage (last 50 calls)
- **Performance Data**: Stored in sessionStorage (last 100 calls)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Features

- Bearer token stored securely in localStorage
- No sensitive data logged to console
- HTTPS-only API communications
- Input validation and sanitization

## Troubleshooting

### Common Issues

1. **"Please configure API settings first"**
   - Solution: Enter base URL and Bearer token, then save configuration

2. **CORS Errors / "Failed to fetch"**
   - **Root Cause:** Browser blocking cross-origin requests
   - **Solution:** Use the local server (see CORS Setup above)
   - **Quick Fix:** Run `python server.py` and use `http://localhost:8080`

3. **"Connection timed out" or "Network Error"**
   - Check internet connection
   - Verify the API endpoint is accessible
   - Try switching between staging and production environments

4. **Invalid Phone Number**
   - Solution: Enter exactly 10 digits (e.g., 0771234567)

5. **Invalid Waybill ID**
   - Solution: Enter exactly 8 digits

6. **Python not found**
   - Install Python 3 from python.org
   - Make sure Python is in your system PATH

### CORS Error Details

When you see errors like:
```
Failed to load resource: net::ERR_CONNECTION_TIMED_OUT
TypeError: Failed to fetch
```

This means the browser is blocking the API request due to CORS policy. The endpoints work perfectly in Postman because Postman doesn't enforce CORS restrictions.

**Solution:** Always use the local server (`python server.py`) which includes a CORS proxy.

### Getting Help

1. Check browser console for detailed error messages
2. Verify your Bearer token is valid
3. Ensure you're using the correct environment
4. Check the global results section for recent test outcomes

## Version History

- **v1.0.0**: Initial release with full API coverage
  - Complete endpoint testing
  - Modern UI with responsive design
  - Configuration management
  - Performance monitoring
  - Export/import functionality

---

**Note**: This application is designed for testing purposes. Always use the staging environment for development and testing before moving to production.
