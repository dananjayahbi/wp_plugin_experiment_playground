// API call functions
class ApiCaller {
    constructor() {
        this.activeRequests = new Set();
        this.useProxy = this.detectProxyMode();
    }

    detectProxyMode() {
        // Check if we're running on localhost with our proxy server
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }

    getProxyEndpoint(originalEndpoint) {
        if (!this.useProxy) return originalEndpoint;
        
        // Convert original endpoint to proxy format
        const baseUrl = apiConfig.getBaseUrl();
        let environment = 'production'; // Default to production
        
        // Check if user has specifically selected staging
        if (baseUrl.includes('dev-transexpress.parallaxtec.com')) {
            environment = 'staging';
        }
        
        // Use mock mode if enabled
        if (apiConfig.mockMode) {
            environment = 'mock';
        }
        
        // Extract the path from the original endpoint
        const path = originalEndpoint.replace(baseUrl, '');
        
        // Return proxy URL
        return `${window.location.origin}/api-proxy/${environment}${path}`;
    }

    async makeRequest(endpoint, options = {}) {
        const requestId = Math.random().toString(36).substr(2, 9);
        this.activeRequests.add(requestId);

        // Use proxy if available
        const proxyEndpoint = this.getProxyEndpoint(endpoint);
        const finalEndpoint = this.useProxy ? proxyEndpoint : endpoint;

        try {
            const response = await fetch(finalEndpoint, options);
            
            let data;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
            }

            logApiCall(endpoint, options.method || 'GET', options.body, data, null);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${data.message || data.error || 'Request failed'}`);
            }

            return { success: true, data };
        } catch (error) {
            let errorMessage = error.message;
            
            // Handle CORS errors specifically
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                if (!this.useProxy) {
                    errorMessage = `CORS Error: ${error.message}\n\n🔧 Solution: Run the local server to bypass CORS:\n1. Open terminal in the api-tester folder\n2. Run: python server.py\n3. Open http://localhost:8080 in your browser\n\nOr use a browser extension to disable CORS for testing.`;
                } else {
                    errorMessage = `Network Error: ${error.message}\nPlease check your internet connection and API endpoint.`;
                }
            }
            
            logApiCall(endpoint, options.method || 'GET', options.body, null, errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            this.activeRequests.delete(requestId);
        }
    }

    // GET endpoints
    async getProvinces() {
        const endpoint = `${apiConfig.getBaseUrl()}/provinces`;
        const options = {
            method: 'GET',
            headers: apiConfig.getHeaders(false) // No auth needed for provinces
        };

        return await this.makeRequest(endpoint, options);
    }

    async getDistricts(provinceId) {
        const endpoint = `${apiConfig.getBaseUrl()}/districts?province_id=${provinceId}`;
        const options = {
            method: 'GET',
            headers: apiConfig.getHeaders(false) // No auth needed for districts
        };

        return await this.makeRequest(endpoint, options);
    }

    async getCities(districtId) {
        const endpoint = `${apiConfig.getBaseUrl()}/cities?district_id=${districtId}`;
        const options = {
            method: 'GET',
            headers: apiConfig.getHeaders(false) // No auth needed for cities
        };

        return await this.makeRequest(endpoint, options);
    }

    // Single order endpoints
    async addSingleOrderAuto(orderData) {
        const endpoint = `${apiConfig.getBaseUrl()}/orders/upload/single-auto-without-city`;
        const options = {
            method: 'POST',
            headers: apiConfig.getHeaders(true),
            body: JSON.stringify(orderData)
        };

        return await this.makeRequest(endpoint, options);
    }

    async addSingleOrderManual(orderData) {
        const endpoint = `${apiConfig.getBaseUrl()}/orders/upload/single-manual`;
        const options = {
            method: 'POST',
            headers: apiConfig.getHeaders(true),
            body: JSON.stringify(orderData)
        };

        return await this.makeRequest(endpoint, options);
    }

    // Bulk order endpoints
    async addBulkOrdersAuto(ordersArray) {
        const endpoint = `${apiConfig.getBaseUrl()}/orders/upload/auto`;
        const options = {
            method: 'POST',
            headers: apiConfig.getHeaders(true),
            body: JSON.stringify(ordersArray)
        };

        return await this.makeRequest(endpoint, options);
    }

    async addBulkOrdersManual(ordersArray) {
        const endpoint = `${apiConfig.getBaseUrl()}/orders/upload/manual`;
        const options = {
            method: 'POST',
            headers: apiConfig.getHeaders(true),
            body: JSON.stringify(ordersArray)
        };

        return await this.makeRequest(endpoint, options);
    }

    // Tracking endpoint
    async trackOrder(waybillId) {
        const endpoint = `${apiConfig.getBaseUrl()}/tracking`;
        const options = {
            method: 'POST',
            headers: apiConfig.getHeaders(true),
            body: JSON.stringify({ waybill_id: waybillId })
        };

        return await this.makeRequest(endpoint, options);
    }
}

// Initialize global API caller instance
const apiCaller = new ApiCaller();

// Test function implementations
async function testGetProvinces() {
    const resultDiv = document.getElementById('provinces-result');
    const button = event.target;
    
    button.classList.add('loading');
    resultDiv.innerHTML = 'Loading provinces...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.getProvinces();
        
        if (result.success) {
            const isMockData = result.data._mock_mode || result.data._mock;
            const mockIndicator = isMockData ? '<span style="color: #9f7aea;">🎭 MOCK DATA</span> ' : '';
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div>${mockIndicator}<strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Get Provinces', true, result.data);
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Get Provinces', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Get Provinces', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testGetDistricts() {
    const provinceId = document.getElementById('provinceId').value;
    const resultDiv = document.getElementById('districts-result');
    const button = event.target;

    if (!provinceId) {
        apiConfig.showNotification('Please enter a province ID', 'error');
        return;
    }

    button.classList.add('loading');
    resultDiv.innerHTML = 'Loading districts...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.getDistricts(provinceId);
        
        if (result.success) {
            const isMockData = result.data._mock_mode || result.data._mock;
            const mockIndicator = isMockData ? '<span style="color: #9f7aea;">🎭 MOCK DATA</span> ' : '';
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div>${mockIndicator}<strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Get Districts', true, result.data);
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Get Districts', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Get Districts', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testGetCities() {
    const districtId = document.getElementById('districtId').value;
    const resultDiv = document.getElementById('cities-result');
    const button = event.target;

    if (!districtId) {
        apiConfig.showNotification('Please enter a district ID', 'error');
        return;
    }

    button.classList.add('loading');
    resultDiv.innerHTML = 'Loading cities...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.getCities(districtId);
        
        if (result.success) {
            const isMockData = result.data._mock_mode || result.data._mock;
            const mockIndicator = isMockData ? '<span style="color: #9f7aea;">🎭 MOCK DATA</span> ' : '';
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div>${mockIndicator}<strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Get Cities', true, result.data);
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Get Cities', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Get Cities', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testAddSingleOrderAuto() {
    if (!apiConfig.isConfigured()) {
        apiConfig.showNotification('Please configure the API settings first', 'error');
        return;
    }

    const orderData = {
        order_no: document.getElementById('single-order-no').value || undefined,
        customer_name: document.getElementById('single-customer-name').value,
        address: document.getElementById('single-address').value,
        phone_no: document.getElementById('single-phone').value,
        phone_no2: document.getElementById('single-phone2').value || undefined,
        cod: parseFloat(document.getElementById('single-cod').value),
        city: document.getElementById('single-city').value,
        description: document.getElementById('single-description').value || undefined,
        note: document.getElementById('single-note').value || undefined
    };

    // Validation
    if (!orderData.customer_name || !orderData.address || !orderData.phone_no || !orderData.city) {
        apiConfig.showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!validatePhoneNumber(orderData.phone_no)) {
        apiConfig.showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }

    if (!validateCODAmount(orderData.cod)) {
        apiConfig.showNotification('Please enter a valid COD amount', 'error');
        return;
    }

    const resultDiv = document.getElementById('single-order-auto-result');
    const button = event.target;

    button.classList.add('loading');
    resultDiv.innerHTML = 'Creating single order...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.addSingleOrderAuto(orderData);
        
        if (result.success) {
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div><strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Add Single Order (Auto)', true, result.data);
            apiConfig.showNotification('Single order created successfully!', 'success');
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Add Single Order (Auto)', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Add Single Order (Auto)', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testAddSingleOrderManual() {
    if (!apiConfig.isConfigured()) {
        apiConfig.showNotification('Please configure the API settings first', 'error');
        return;
    }

    const orderData = {
        order_no: document.getElementById('manual-order-no').value || undefined,
        customer_name: document.getElementById('manual-customer-name').value,
        address: document.getElementById('manual-address').value,
        phone_no: document.getElementById('manual-phone').value,
        phone_no2: document.getElementById('manual-phone2').value || undefined,
        cod: parseFloat(document.getElementById('manual-cod').value),
        city_id: parseInt(document.getElementById('manual-city-id').value),
        waybill_id: document.getElementById('manual-waybill').value,
        description: document.getElementById('manual-description').value || undefined,
        note: document.getElementById('manual-note').value || undefined
    };

    // Validation
    if (!orderData.customer_name || !orderData.address || !orderData.phone_no || !orderData.city_id || !orderData.waybill_id) {
        apiConfig.showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!validatePhoneNumber(orderData.phone_no)) {
        apiConfig.showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }

    if (!validateWaybillId(orderData.waybill_id)) {
        apiConfig.showNotification('Please enter a valid 8-digit waybill ID', 'error');
        return;
    }

    if (!validateCODAmount(orderData.cod)) {
        apiConfig.showNotification('Please enter a valid COD amount', 'error');
        return;
    }

    const resultDiv = document.getElementById('single-order-manual-result');
    const button = event.target;

    button.classList.add('loading');
    resultDiv.innerHTML = 'Creating single order with manual waybill...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.addSingleOrderManual(orderData);
        
        if (result.success) {
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div><strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Add Single Order (Manual)', true, result.data);
            apiConfig.showNotification('Single order created successfully!', 'success');
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Add Single Order (Manual)', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Add Single Order (Manual)', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testTrackOrder() {
    if (!apiConfig.isConfigured()) {
        apiConfig.showNotification('Please configure the API settings first', 'error');
        return;
    }

    const waybillId = document.getElementById('tracking-waybill').value;
    
    if (!waybillId) {
        apiConfig.showNotification('Please enter a waybill ID', 'error');
        return;
    }

    if (!validateWaybillId(waybillId)) {
        apiConfig.showNotification('Please enter a valid 8-digit waybill ID', 'error');
        return;
    }

    const resultDiv = document.getElementById('tracking-result');
    const button = event.target;

    button.classList.add('loading');
    resultDiv.innerHTML = 'Tracking order...';
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.trackOrder(waybillId);
        
        if (result.success) {
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div><strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Track Order', true, result.data);
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Track Order', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Track Order', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}
