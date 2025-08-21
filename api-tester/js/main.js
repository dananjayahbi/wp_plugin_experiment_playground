// Main application initialization and utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    console.log('Trans Express API Tester - Initializing...');
    
    // Load saved configuration and form data
    apiConfig.loadConfig();
    loadSavedFormData();
    
    // Enable auto-save for form data
    enableAutoSave();
    
    // Set up default sample data
    setupDefaultData();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Add sample data button
    addSampleDataButton();
    
    // Handle CORS info display
    handleCorsInfoDisplay();
    
    // Display initialization complete message
    setTimeout(() => {
        if (apiConfig.proxyMode) {
            apiConfig.showNotification('✅ API Tester ready with CORS proxy!', 'success');
        } else {
            apiConfig.showNotification('⚠️ API Tester ready - Please use local server to avoid CORS issues', 'warning');
        }
    }, 1000);
    
    console.log('Trans Express API Tester - Ready!');
}

function handleCorsInfoDisplay() {
    const corsInfo = document.getElementById('cors-info');
    if (corsInfo) {
        if (apiConfig.proxyMode) {
            // Hide CORS warning in proxy mode
            corsInfo.style.display = 'none';
        } else {
            // Show CORS warning in direct mode
            corsInfo.style.display = 'block';
        }
    }
}

function setupDefaultData() {
    // Set default values for testing
    if (!document.getElementById('provinceId').value) {
        document.getElementById('provinceId').value = '1';
    }
    
    if (!document.getElementById('districtId').value) {
        document.getElementById('districtId').value = '8';
    }
    
    if (!document.getElementById('tracking-waybill').value) {
        document.getElementById('tracking-waybill').value = '12345678';
    }
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter to save configuration
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            saveConfig();
        }
        
        // Ctrl + R to clear all results
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            clearAllResults();
        }
        
        // Escape to clear current focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
}

function addSampleDataButton() {
    // Add a sample data button to the single order section
    const singleOrderCard = document.querySelector('.endpoint-card h3');
    if (singleOrderCard && singleOrderCard.textContent.includes('Add Single Order - Auto')) {
        const button = document.createElement('button');
        button.textContent = 'Fill Sample Data';
        button.className = 'add-btn';
        button.style.marginLeft = '10px';
        button.style.fontSize = '0.8rem';
        button.style.padding = '5px 10px';
        button.onclick = fillSampleData;
        
        singleOrderCard.appendChild(button);
    }
}

// Advanced testing functions
function runAllLocationTests() {
    console.log('Running all location tests...');
    
    // Test provinces
    testGetProvinces();
    
    // Test districts after a delay
    setTimeout(() => {
        testGetDistricts();
    }, 1000);
    
    // Test cities after another delay
    setTimeout(() => {
        testGetCities();
    }, 2000);
    
    apiConfig.showNotification('Running all location tests...', 'info');
}

function exportTestResults() {
    const data = {
        timestamp: new Date().toISOString(),
        configuration: {
            baseUrl: apiConfig.baseUrl,
            hasToken: !!apiConfig.authToken
        },
        results: globalTestResults,
        logs: JSON.parse(sessionStorage.getItem('apiLogs') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `transexpress-api-test-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    apiConfig.showNotification('Test results exported successfully!', 'success');
}

function importConfiguration() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.configuration) {
                    if (data.configuration.baseUrl) {
                        document.getElementById('baseUrl').value = data.configuration.baseUrl;
                        apiConfig.baseUrl = data.configuration.baseUrl;
                    }
                    
                    apiConfig.saveConfig();
                    apiConfig.showNotification('Configuration imported successfully!', 'success');
                }
            } catch (error) {
                apiConfig.showNotification('Error importing configuration: Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Performance monitoring
function monitorApiPerformance() {
    const originalMakeRequest = apiCaller.makeRequest;
    
    apiCaller.makeRequest = async function(endpoint, options = {}) {
        const startTime = performance.now();
        const result = await originalMakeRequest.call(this, endpoint, options);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.log(`API Call Performance: ${endpoint} took ${duration.toFixed(2)}ms`);
        
        // Store performance data
        const perfData = JSON.parse(sessionStorage.getItem('apiPerformance') || '[]');
        perfData.push({
            endpoint,
            duration,
            timestamp: new Date().toISOString(),
            success: result.success
        });
        
        // Keep only last 100 entries
        if (perfData.length > 100) {
            perfData.splice(0, perfData.length - 100);
        }
        
        sessionStorage.setItem('apiPerformance', JSON.stringify(perfData));
        
        return result;
    };
}

// Initialize performance monitoring
monitorApiPerformance();

// Add global utility functions
window.transExpressApiTester = {
    exportResults: exportTestResults,
    importConfig: importConfiguration,
    runAllLocationTests: runAllLocationTests,
    clearAllData: function() {
        clearAllResults();
        localStorage.removeItem('transexpressApiConfig');
        localStorage.removeItem('transexpressFormData');
        sessionStorage.removeItem('apiLogs');
        sessionStorage.removeItem('apiPerformance');
        location.reload();
    },
    getPerformanceStats: function() {
        const perfData = JSON.parse(sessionStorage.getItem('apiPerformance') || '[]');
        if (perfData.length === 0) return 'No performance data available';
        
        const avgDuration = perfData.reduce((sum, p) => sum + p.duration, 0) / perfData.length;
        const successRate = (perfData.filter(p => p.success).length / perfData.length) * 100;
        
        return {
            totalRequests: perfData.length,
            averageResponseTime: `${avgDuration.toFixed(2)}ms`,
            successRate: `${successRate.toFixed(1)}%`,
            data: perfData
        };
    }
};

// Add helper buttons to the global results section
function addHelperButtons() {
    const globalResults = document.querySelector('.global-results');
    if (globalResults) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.textAlign = 'center';
        
        buttonContainer.innerHTML = `
            <button onclick="exportTestResults()" class="add-btn">Export Results</button>
            <button onclick="importConfiguration()" class="add-btn">Import Config</button>
            <button onclick="runAllLocationTests()" class="test-btn">Test All Locations</button>
            <button onclick="console.log(window.transExpressApiTester.getPerformanceStats())" class="test-btn">Show Performance</button>
        `;
        
        const clearButton = globalResults.querySelector('button');
        globalResults.insertBefore(buttonContainer, clearButton);
    }
}

// Add helper buttons after DOM is loaded
setTimeout(addHelperButtons, 1500);

// Error handling for uncaught errors
window.addEventListener('error', function(e) {
    console.error('Global Error:', e.error);
    apiConfig.showNotification('An unexpected error occurred. Check console for details.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    apiConfig.showNotification('An API call failed unexpectedly. Check console for details.', 'error');
});

// Add version info
console.log('Trans Express API Tester v1.0.0');
console.log('Available global functions:', Object.keys(window.transExpressApiTester));
