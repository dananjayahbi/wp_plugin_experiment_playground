// UI Helper functions
let bulkOrderCounter = 2;
let bulkManualOrderCounter = 1;

function addBulkOrderForm() {
    bulkOrderCounter++;
    const container = document.querySelector('.bulk-orders-container');
    
    const newForm = document.createElement('div');
    newForm.className = 'bulk-order-form fade-in';
    newForm.id = `bulk-order-${bulkOrderCounter}`;
    
    newForm.innerHTML = `
        <h4>Order ${bulkOrderCounter} <button type="button" onclick="removeBulkOrderForm(${bulkOrderCounter})" style="float: right; background: #fc8181; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;">Remove</button></h4>
        <input type="text" placeholder="Order ID (optional)" class="bulk-order-id">
        <input type="text" placeholder="Customer Name" class="bulk-customer-name" required>
        <input type="text" placeholder="Customer Address" class="bulk-address" required>
        <input type="text" placeholder="Phone Number" class="bulk-phone" required>
        <input type="text" placeholder="Second Phone (optional)" class="bulk-phone2">
        <input type="number" placeholder="COD Amount" class="bulk-cod" required>
        <input type="text" placeholder="City Name" class="bulk-city" required>
        <textarea placeholder="Order Description (optional)" class="bulk-description"></textarea>
        <textarea placeholder="Remark (optional)" class="bulk-remark"></textarea>
    `;
    
    container.appendChild(newForm);
}

function removeBulkOrderForm(orderId) {
    const form = document.getElementById(`bulk-order-${orderId}`);
    if (form) {
        form.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            form.remove();
        }, 300);
    }
}

function addBulkManualOrderForm() {
    bulkManualOrderCounter++;
    const container = document.querySelector('.bulk-manual-orders-container');
    
    const newForm = document.createElement('div');
    newForm.className = 'bulk-manual-order-form fade-in';
    newForm.id = `bulk-manual-order-${bulkManualOrderCounter}`;
    
    newForm.innerHTML = `
        <h4>Manual Order ${bulkManualOrderCounter} <button type="button" onclick="removeBulkManualOrderForm(${bulkManualOrderCounter})" style="float: right; background: #fc8181; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;">Remove</button></h4>
        <input type="text" placeholder="Order ID (optional)" class="bulk-manual-order-id">
        <input type="text" placeholder="Customer Name" class="bulk-manual-customer-name" required>
        <input type="text" placeholder="Customer Address" class="bulk-manual-address" required>
        <input type="text" placeholder="Phone Number" class="bulk-manual-phone" required>
        <input type="text" placeholder="Second Phone (optional)" class="bulk-manual-phone2">
        <input type="number" placeholder="COD Amount" class="bulk-manual-cod" required>
        <input type="number" placeholder="City ID" class="bulk-manual-city-id" required>
        <input type="text" placeholder="Waybill ID (8 digits)" class="bulk-manual-waybill" required>
        <textarea placeholder="Order Description (optional)" class="bulk-manual-description"></textarea>
        <textarea placeholder="Remark (optional)" class="bulk-manual-remark"></textarea>
    `;
    
    container.appendChild(newForm);
}

function removeBulkManualOrderForm(orderId) {
    const form = document.getElementById(`bulk-manual-order-${orderId}`);
    if (form) {
        form.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            form.remove();
        }, 300);
    }
}

function collectBulkOrderData() {
    const forms = document.querySelectorAll('.bulk-order-form');
    const orders = [];
    
    forms.forEach(form => {
        const orderData = {
            order_id: form.querySelector('.bulk-order-id').value || undefined,
            customer_name: form.querySelector('.bulk-customer-name').value,
            address: form.querySelector('.bulk-address').value,
            customer_phone: form.querySelector('.bulk-phone').value,
            customer_phone2: form.querySelector('.bulk-phone2').value || undefined,
            cod_amount: parseFloat(form.querySelector('.bulk-cod').value),
            city: form.querySelector('.bulk-city').value,
            order_description: form.querySelector('.bulk-description').value || undefined,
            remark: form.querySelector('.bulk-remark').value || undefined
        };
        
        // Only add if required fields are filled
        if (orderData.customer_name && orderData.address && orderData.customer_phone && orderData.city && !isNaN(orderData.cod_amount)) {
            orders.push(orderData);
        }
    });
    
    return orders;
}

function collectBulkManualOrderData() {
    const forms = document.querySelectorAll('.bulk-manual-order-form');
    const orders = [];
    
    forms.forEach(form => {
        const orderData = {
            order_id: form.querySelector('.bulk-manual-order-id').value || undefined,
            customer_name: form.querySelector('.bulk-manual-customer-name').value,
            address: form.querySelector('.bulk-manual-address').value,
            customer_phone: form.querySelector('.bulk-manual-phone').value,
            customer_phone2: form.querySelector('.bulk-manual-phone2').value || undefined,
            cod_amount: parseFloat(form.querySelector('.bulk-manual-cod').value),
            city_id: parseInt(form.querySelector('.bulk-manual-city-id').value),
            waybill_id: form.querySelector('.bulk-manual-waybill').value,
            order_description: form.querySelector('.bulk-manual-description').value || undefined,
            remark: form.querySelector('.bulk-manual-remark').value || undefined
        };
        
        // Only add if required fields are filled
        if (orderData.customer_name && orderData.address && orderData.customer_phone && 
            !isNaN(orderData.city_id) && orderData.waybill_id && !isNaN(orderData.cod_amount)) {
            orders.push(orderData);
        }
    });
    
    return orders;
}

async function testAddBulkOrdersAuto() {
    if (!apiConfig.isConfigured()) {
        apiConfig.showNotification('Please configure the API settings first', 'error');
        return;
    }

    const orders = collectBulkOrderData();
    
    if (orders.length === 0) {
        apiConfig.showNotification('Please fill in at least one complete order form', 'error');
        return;
    }

    // Validate phone numbers
    for (let i = 0; i < orders.length; i++) {
        if (!validatePhoneNumber(orders[i].customer_phone)) {
            apiConfig.showNotification(`Invalid phone number in order ${i + 1}`, 'error');
            return;
        }
        if (!validateCODAmount(orders[i].cod_amount)) {
            apiConfig.showNotification(`Invalid COD amount in order ${i + 1}`, 'error');
            return;
        }
    }

    const resultDiv = document.getElementById('bulk-orders-auto-result');
    const button = event.target;

    button.classList.add('loading');
    resultDiv.innerHTML = `Creating ${orders.length} bulk orders...`;
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.addBulkOrdersAuto(orders);
        
        if (result.success) {
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div><strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Add Bulk Orders (Auto)', true, result.data);
            apiConfig.showNotification(`${orders.length} bulk orders created successfully!`, 'success');
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Add Bulk Orders (Auto)', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Add Bulk Orders (Auto)', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

async function testAddBulkOrdersManual() {
    if (!apiConfig.isConfigured()) {
        apiConfig.showNotification('Please configure the API settings first', 'error');
        return;
    }

    const orders = collectBulkManualOrderData();
    
    if (orders.length === 0) {
        apiConfig.showNotification('Please fill in at least one complete manual order form', 'error');
        return;
    }

    // Validate data
    for (let i = 0; i < orders.length; i++) {
        if (!validatePhoneNumber(orders[i].customer_phone)) {
            apiConfig.showNotification(`Invalid phone number in manual order ${i + 1}`, 'error');
            return;
        }
        if (!validateWaybillId(orders[i].waybill_id)) {
            apiConfig.showNotification(`Invalid waybill ID in manual order ${i + 1}`, 'error');
            return;
        }
        if (!validateCODAmount(orders[i].cod_amount)) {
            apiConfig.showNotification(`Invalid COD amount in manual order ${i + 1}`, 'error');
            return;
        }
    }

    const resultDiv = document.getElementById('bulk-orders-manual-result');
    const button = event.target;

    button.classList.add('loading');
    resultDiv.innerHTML = `Creating ${orders.length} bulk manual orders...`;
    resultDiv.className = 'result-area';

    try {
        const result = await apiCaller.addBulkOrdersManual(orders);
        
        if (result.success) {
            resultDiv.innerHTML = `<div class="status-indicator status-success"></div><strong>Success:</strong>\n${formatJSON(result.data)}`;
            resultDiv.classList.add('success');
            updateGlobalResults('Add Bulk Orders (Manual)', true, result.data);
            apiConfig.showNotification(`${orders.length} bulk manual orders created successfully!`, 'success');
        } else {
            resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Error:</strong>\n${result.error}`;
            resultDiv.classList.add('error');
            updateGlobalResults('Add Bulk Orders (Manual)', false, result.error);
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="status-indicator status-error"></div><strong>Unexpected Error:</strong>\n${error.message}`;
        resultDiv.classList.add('error');
        updateGlobalResults('Add Bulk Orders (Manual)', false, error.message);
    } finally {
        button.classList.remove('loading');
    }
}

// Global results management
let globalTestResults = [];

function updateGlobalResults(testName, success, data) {
    const timestamp = new Date().toLocaleString();
    const result = {
        timestamp,
        testName,
        success,
        data
    };
    
    globalTestResults.unshift(result); // Add to beginning
    if (globalTestResults.length > 20) { // Keep only last 20 results
        globalTestResults = globalTestResults.slice(0, 20);
    }
    
    displayGlobalResults();
}

function displayGlobalResults() {
    const globalResultsDiv = document.getElementById('global-results');
    
    if (globalTestResults.length === 0) {
        globalResultsDiv.innerHTML = 'No test results yet. Start testing the API endpoints above.';
        return;
    }
    
    let html = '<h3>Recent Test Results:</h3>\n';
    
    globalTestResults.forEach((result, index) => {
        const statusClass = result.success ? 'status-success' : 'status-error';
        const statusText = result.success ? 'Success' : 'Failed';
        
        html += `
            <div style="margin-bottom: 15px; padding: 10px; border-left: 4px solid ${result.success ? '#48bb78' : '#fc8181'}; background: ${result.success ? '#f0fff4' : '#fef5e7'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong>${result.testName}</strong>
                    <span style="font-size: 0.9em; color: #666;">${result.timestamp}</span>
                </div>
                <div>
                    <span class="status-indicator ${statusClass}"></span>
                    <strong>${statusText}</strong>
                </div>
                <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #4299e1;">View Response Data</summary>
                    <pre style="background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 4px; margin-top: 10px; overflow-x: auto; font-size: 0.8em;">${formatJSON(result.data)}</pre>
                </details>
            </div>
        `;
    });
    
    globalResultsDiv.innerHTML = html;
}

function clearAllResults() {
    // Clear global results
    globalTestResults = [];
    document.getElementById('global-results').innerHTML = 'All results cleared.';
    
    // Clear individual result areas
    const resultAreas = document.querySelectorAll('.result-area');
    resultAreas.forEach(area => {
        area.innerHTML = '';
        area.className = 'result-area';
    });
    
    // Clear session storage logs
    sessionStorage.removeItem('apiLogs');
    
    apiConfig.showNotification('All test results cleared', 'info');
}

// Mock data generator
class MockDataGenerator {
    constructor() {
        this.sampleCustomers = [
            { name: 'John Doe', address: '123 Main Street, Colombo', phone: '0771234567', city: 'Colombo' },
            { name: 'Jane Smith', address: '456 Galle Road, Kandy', phone: '0712345678', city: 'Kandy' },
            { name: 'Mike Johnson', address: '789 Peradeniya Road, Gampaha', phone: '0723456789', city: 'Gampaha' },
            { name: 'Sarah Wilson', address: '321 Temple Street, Matara', phone: '0734567890', city: 'Matara' },
            { name: 'David Brown', address: '654 Beach Road, Negombo', phone: '0745678901', city: 'Negombo' }
        ];
        
        this.sampleProducts = [
            'Electronic Device',
            'Clothing Item',
            'Books and Stationery',
            'Home Appliance',
            'Jewelry',
            'Cosmetics',
            'Sports Equipment',
            'Toys and Games'
        ];
        
        this.sampleNotes = [
            'Handle with care - fragile items',
            'Deliver during office hours only',
            'Call before delivery',
            'Leave at security if not available',
            'Urgent delivery required',
            'Gift wrapping included',
            'Temperature sensitive items'
        ];
    }
    
    getRandomCustomer() {
        return this.sampleCustomers[Math.floor(Math.random() * this.sampleCustomers.length)];
    }
    
    getRandomProduct() {
        return this.sampleProducts[Math.floor(Math.random() * this.sampleProducts.length)];
    }
    
    getRandomNote() {
        return this.sampleNotes[Math.floor(Math.random() * this.sampleNotes.length)];
    }
    
    getRandomCOD() {
        const amounts = [500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3500, 4000];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }
    
    getRandomWaybillId() {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    }
    
    getRandomOrderId() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    
    getRandomCityId() {
        return Math.floor(800 + Math.random() * 200); // Random city ID between 800-999
    }
    
    getRandomPhone() {
        const prefixes = ['077', '071', '072', '070', '076', '078'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const number = Math.floor(1000000 + Math.random() * 9000000).toString();
        return prefix + number;
    }
}

const mockDataGenerator = new MockDataGenerator();

// Auto-fill functions for different form types
function autoFillSingleOrderForm() {
    const customer = mockDataGenerator.getRandomCustomer();
    
    document.getElementById('single-order-no').value = mockDataGenerator.getRandomOrderId();
    document.getElementById('single-customer-name').value = customer.name;
    document.getElementById('single-address').value = customer.address;
    document.getElementById('single-phone').value = customer.phone;
    document.getElementById('single-phone2').value = mockDataGenerator.getRandomPhone();
    document.getElementById('single-cod').value = mockDataGenerator.getRandomCOD();
    document.getElementById('single-city').value = customer.city;
    document.getElementById('single-description').value = mockDataGenerator.getRandomProduct();
    document.getElementById('single-note').value = mockDataGenerator.getRandomNote();
}

function autoFillSingleManualOrderForm() {
    const customer = mockDataGenerator.getRandomCustomer();
    
    document.getElementById('manual-order-no').value = mockDataGenerator.getRandomOrderId();
    document.getElementById('manual-customer-name').value = customer.name;
    document.getElementById('manual-address').value = customer.address;
    document.getElementById('manual-phone').value = customer.phone;
    document.getElementById('manual-phone2').value = mockDataGenerator.getRandomPhone();
    document.getElementById('manual-cod').value = mockDataGenerator.getRandomCOD();
    document.getElementById('manual-city-id').value = mockDataGenerator.getRandomCityId();
    document.getElementById('manual-waybill').value = mockDataGenerator.getRandomWaybillId();
    document.getElementById('manual-description').value = mockDataGenerator.getRandomProduct();
    document.getElementById('manual-note').value = mockDataGenerator.getRandomNote();
}

function autoFillBulkOrderForms() {
    const forms = document.querySelectorAll('.bulk-order-form');
    
    forms.forEach(form => {
        const customer = mockDataGenerator.getRandomCustomer();
        
        form.querySelector('.bulk-order-id').value = mockDataGenerator.getRandomOrderId();
        form.querySelector('.bulk-customer-name').value = customer.name;
        form.querySelector('.bulk-address').value = customer.address;
        form.querySelector('.bulk-phone').value = customer.phone;
        form.querySelector('.bulk-phone2').value = mockDataGenerator.getRandomPhone();
        form.querySelector('.bulk-cod').value = mockDataGenerator.getRandomCOD();
        form.querySelector('.bulk-city').value = customer.city;
        form.querySelector('.bulk-description').value = mockDataGenerator.getRandomProduct();
        form.querySelector('.bulk-remark').value = mockDataGenerator.getRandomNote();
    });
}

function autoFillBulkManualOrderForms() {
    const forms = document.querySelectorAll('.bulk-manual-order-form');
    
    forms.forEach(form => {
        const customer = mockDataGenerator.getRandomCustomer();
        
        form.querySelector('.bulk-manual-order-id').value = mockDataGenerator.getRandomOrderId();
        form.querySelector('.bulk-manual-customer-name').value = customer.name;
        form.querySelector('.bulk-manual-address').value = customer.address;
        form.querySelector('.bulk-manual-phone').value = customer.phone;
        form.querySelector('.bulk-manual-phone2').value = mockDataGenerator.getRandomPhone();
        form.querySelector('.bulk-manual-cod').value = mockDataGenerator.getRandomCOD();
        form.querySelector('.bulk-manual-city-id').value = mockDataGenerator.getRandomCityId();
        form.querySelector('.bulk-manual-waybill').value = mockDataGenerator.getRandomWaybillId();
        form.querySelector('.bulk-manual-description').value = mockDataGenerator.getRandomProduct();
        form.querySelector('.bulk-manual-remark').value = mockDataGenerator.getRandomNote();
    });
}

function autoFillTrackingForm() {
    document.getElementById('tracking-waybill').value = mockDataGenerator.getRandomWaybillId();
}

// Auto-fill all forms at once
function autoFillAllForms() {
    autoFillSingleOrderForm();
    autoFillSingleManualOrderForm();
    autoFillBulkOrderForms();
    autoFillBulkManualOrderForms();
    autoFillTrackingForm();
    
    apiConfig.showNotification('🎭 All forms auto-filled with mock data!', 'success');
}

// Legacy function for backward compatibility
function fillSampleData() {
    autoFillSingleOrderForm();
    apiConfig.showNotification('Sample data filled for single order', 'info');
}

function clearForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}

// Auto-save form data
function enableAutoSave() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const formData = {};
            formInputs.forEach(inp => {
                if (inp.id) {
                    formData[inp.id] = inp.value;
                }
            });
            localStorage.setItem('transexpressFormData', JSON.stringify(formData));
        });
    });
}

function loadSavedFormData() {
    const saved = localStorage.getItem('transexpressFormData');
    if (saved) {
        const formData = JSON.parse(saved);
        Object.keys(formData).forEach(id => {
            const element = document.getElementById(id);
            if (element && formData[id]) {
                element.value = formData[id];
            }
        });
    }
}

// Auto-fill function for tracking form
function autoFillTrackingForm() {
  const mockGenerator = new MockDataGenerator();
  const waybillField = document.getElementById('trackingId');
  if (waybillField) {
    waybillField.value = mockGenerator.generateWaybillId();
  }
}

// Global auto-fill function for all forms
function autoFillAllForms() {
  // Fill single order forms
  autoFillSingleOrderForm();
  autoFillSingleManualOrderForm();
  
  // Fill bulk order forms
  autoFillBulkAutoOrderForms();
  autoFillBulkManualOrderForms();
  
  // Fill tracking form
  autoFillTrackingForm();
  
  // Show notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    font-weight: bold;
  `;
  notification.textContent = '🎭 All forms auto-filled with mock data!';
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
