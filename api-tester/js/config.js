// Configuration management
class ApiConfig {
    constructor() {
        this.baseUrl = 'https://portal.transexpress.lk/api'; // Default to production since staging is down
        this.authToken = '';
        this.proxyMode = this.detectProxyMode();
        this.mockMode = false;
        this.loadConfig();
    }

    detectProxyMode() {
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }

    saveConfig() {
        const config = {
            baseUrl: this.baseUrl,
            authToken: this.authToken,
            mockMode: this.mockMode
        };
        localStorage.setItem('transexpressApiConfig', JSON.stringify(config));
        this.showNotification('Configuration saved successfully!', 'success');
        
        // Show proxy mode info
        if (this.proxyMode) {
            this.showNotification('✅ Proxy mode detected - CORS issues should be resolved!', 'info');
        } else {
            this.showNotification('⚠️ Direct mode - You may encounter CORS issues. Consider using the local server.', 'warning');
        }
        
        if (this.mockMode) {
            this.showNotification('🎭 Mock mode enabled - Using sample data for testing', 'info');
        }
    }

    loadConfig() {
        const saved = localStorage.getItem('transexpressApiConfig');
        if (saved) {
            const config = JSON.parse(saved);
            this.baseUrl = config.baseUrl || this.baseUrl;
            this.authToken = config.authToken || this.authToken;
            this.mockMode = config.mockMode || false;
            
            // Update UI
            document.getElementById('baseUrl').value = this.baseUrl;
            document.getElementById('authToken').value = this.authToken;
            
            // Update mock mode checkbox if it exists
            const mockCheckbox = document.getElementById('mockMode');
            if (mockCheckbox) {
                mockCheckbox.checked = this.mockMode;
            }
        }
        
        // Update proxy mode display
        this.updateProxyModeDisplay();
    }

    updateProxyModeDisplay() {
        // Create or update proxy mode indicator
        let indicator = document.getElementById('proxy-mode-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'proxy-mode-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 600;
                z-index: 1001;
                color: white;
            `;
            document.body.appendChild(indicator);
        }
        
        if (this.mockMode) {
            indicator.textContent = '🎭 Mock Mode Active';
            indicator.style.backgroundColor = '#9f7aea';
            indicator.title = 'Using mock data for testing';
        } else if (this.proxyMode) {
            indicator.textContent = '🟢 Proxy Mode Active';
            indicator.style.backgroundColor = '#48bb78';
            indicator.title = 'Running through local server - CORS issues resolved';
        } else {
            indicator.textContent = '🟡 Direct Mode';
            indicator.style.backgroundColor = '#ed8936';
            indicator.title = 'Direct browser access - May encounter CORS issues';
        }
    }

    getHeaders(includeAuth = true) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (includeAuth && this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        return headers;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    isConfigured() {
        return this.baseUrl && this.authToken;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        const colors = {
            success: '#48bb78',
            error: '#fc8181',
            warning: '#ed8936',
            info: '#4299e1'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            style.textContent += `
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize global config instance
const apiConfig = new ApiConfig();

// Global functions for HTML onclick handlers
function saveConfig() {
    const baseUrl = document.getElementById('baseUrl').value;
    const authToken = document.getElementById('authToken').value;
    const mockMode = document.getElementById('mockMode').checked;

    if (!baseUrl.trim()) {
        apiConfig.showNotification('Please enter a valid base URL', 'error');
        return;
    }

    apiConfig.baseUrl = baseUrl;
    apiConfig.authToken = authToken;
    apiConfig.mockMode = mockMode;
    apiConfig.saveConfig();
    apiConfig.updateProxyModeDisplay();
}

function toggleMockMode() {
    const mockMode = document.getElementById('mockMode').checked;
    apiConfig.mockMode = mockMode;
    apiConfig.updateProxyModeDisplay();
    
    if (mockMode) {
        apiConfig.showNotification('🎭 Mock mode enabled - Will use sample data', 'info');
    } else {
        apiConfig.showNotification('🌐 Mock mode disabled - Will use real APIs', 'info');
    }
}

async function testConnectivity() {
    const button = event.target;
    button.classList.add('loading');
    button.disabled = true;
    
    try {
        apiConfig.showNotification('Testing API connectivity...', 'info');
        
        // Test the Get Provinces endpoint since it doesn't require auth
        const result = await apiCaller.getProvinces();
        
        if (result.success) {
            const dataSource = result.data._mock_mode ? 'Mock Data' : 'Live API';
            apiConfig.showNotification(`✅ Connectivity test passed! (Source: ${dataSource})`, 'success');
        } else {
            apiConfig.showNotification(`❌ Connectivity test failed: ${result.error}`, 'error');
        }
    } catch (error) {
        apiConfig.showNotification(`❌ Connectivity test error: ${error.message}`, 'error');
    } finally {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Validation functions
function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function validateWaybillId(waybillId) {
    const waybillRegex = /^[0-9]{8}$/;
    return waybillRegex.test(waybillId);
}

function validateCODAmount(amount) {
    return !isNaN(amount) && parseFloat(amount) >= 0;
}

// Helper function to format JSON for display
function formatJSON(obj) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return String(obj);
    }
}

// Helper function to log API calls
function logApiCall(endpoint, method, data = null, response = null, error = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        endpoint,
        method,
        data,
        response,
        error
    };

    // Store in session storage for debugging
    const logs = JSON.parse(sessionStorage.getItem('apiLogs') || '[]');
    logs.push(logEntry);
    sessionStorage.setItem('apiLogs', JSON.stringify(logs.slice(-50))); // Keep last 50 logs

    console.log('API Call:', logEntry);
}
