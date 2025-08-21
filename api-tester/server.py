#!/usr/bin/env python3
"""
Simple HTTP Server with CORS support for Trans Express API Tester
This server acts as a proxy to bypass CORS restrictions
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import os
import time
from urllib.error import HTTPError, URLError

class CORSProxyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        if self.path.startswith('/api-proxy/'):
            self.handle_api_proxy()
        else:
            super().do_GET()
    
    def do_POST(self):
        if self.path.startswith('/api-proxy/'):
            self.handle_api_proxy()
        else:
            self.send_error(404)
    
    def handle_api_proxy(self):
        try:
            # Extract the actual API endpoint from the path
            # Format: /api-proxy/staging/provinces or /api-proxy/production/tracking
            path_parts = self.path.split('/')
            if len(path_parts) < 4:
                self.send_error(400, "Invalid proxy path")
                return
            
            environment = path_parts[2]  # staging or production
            endpoint = '/'.join(path_parts[3:])  # the actual API endpoint
            
            # Check for mock data request
            if environment == 'mock':
                self.handle_mock_data(endpoint)
                return
            
            # Base URLs
            base_urls = {
                'staging': 'https://dev-transexpress.parallaxtec.com/api',
                'production': 'https://portal.transexpress.lk/api'
            }
            
            if environment not in base_urls:
                self.send_error(400, "Invalid environment")
                return
            
            # Construct the full URL
            if '?' in endpoint:
                api_url = f"{base_urls[environment]}/{endpoint}"
            else:
                api_url = f"{base_urls[environment]}/{endpoint}"
                if self.path.find('?') != -1:
                    query_string = self.path.split('?', 1)[1]
                    api_url += f"?{query_string}"
            
            print(f"Proxying request to: {api_url}")
            
            # Create the request
            if self.command == 'GET':
                req = urllib.request.Request(api_url, method='GET')
            else:  # POST
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length) if content_length > 0 else None
                req = urllib.request.Request(api_url, data=post_data, method='POST')
            
            # Copy headers from the original request
            for header, value in self.headers.items():
                if header.lower() not in ['host', 'content-length']:
                    req.add_header(header, value)
            
            # Make the request with shorter timeout and fallback to mock data
            try:
                with urllib.request.urlopen(req, timeout=10) as response:
                    response_data = response.read()
                    
                    # Send successful response
                    self.send_response(response.getcode())
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(response_data)
                    
            except (HTTPError, URLError) as e:
                print(f"API Error: {e}. Falling back to mock data...")
                # Fallback to mock data when API is unavailable
                self.handle_mock_data(endpoint, api_error=str(e))
                
        except Exception as e:
            error_msg = json.dumps({"error": f"Proxy error: {str(e)}", "suggestion": "Try mock data mode"})
            print(f"Proxy Error: {e}")
            
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(error_msg.encode('utf-8'))

    def handle_mock_data(self, endpoint, api_error=None):
        """Handle mock data responses when API is unavailable"""
        
        mock_data = {
            'provinces': [
                {"id": 1, "text": "Western"},
                {"id": 2, "text": "Central"},
                {"id": 3, "text": "Southern"},
                {"id": 4, "text": "North Western"},
                {"id": 5, "text": "Sabaragamuwa"},
                {"id": 6, "text": "Eastern"},
                {"id": 7, "text": "Uva"},
                {"id": 8, "text": "North Central"},
                {"id": 9, "text": "Northern"}
            ],
            'districts': [
                {"id": 11, "text": "Kandy"},
                {"id": 16, "text": "Matale"},
                {"id": 20, "text": "NuwaraEliya"}
            ],
            'cities': [
                {"id": 864, "text": "Amgth"},
                {"id": 865, "text": "Bandarawela"},
                {"id": 866, "text": "Badulla"},
                {"id": 867, "text": "Ella"},
                {"id": 868, "text": "Haputale"}
            ]
        }
        
        # Determine response based on endpoint
        response_data = None
        
        if 'provinces' in endpoint:
            response_data = mock_data['provinces']
        elif 'districts' in endpoint:
            response_data = mock_data['districts']
        elif 'cities' in endpoint:
            response_data = mock_data['cities']
        elif 'tracking' in endpoint:
            response_data = {
                "waybill_id": "12345678",
                "order_no": "ORD-001",
                "customer_name": "John Doe",
                "customer_address": "123 Main St, Colombo",
                "customer_district": "Colombo",
                "customer_city": "Colombo",
                "customer_phone_no": "0771234567",
                "weight": 1.5,
                "placed_date": "2025-08-20",
                "completed_date": "2025-08-21",
                "status": "Delivered",
                "_mock": True,
                "_note": "This is mock data for testing purposes"
            }
        elif 'upload' in endpoint:
            response_data = {
                "success": "Mock order created successfully",
                "waybill_id": "87654321",
                "order_id": "MOCK-" + str(int(time.time())),
                "_mock": True,
                "_note": "This is mock data for testing purposes"
            }
        else:
            response_data = {
                "message": "Mock endpoint not implemented",
                "endpoint": endpoint,
                "_mock": True
            }
        
        # Add mock indicator and API error info if present
        if isinstance(response_data, dict):
            response_data["_mock_mode"] = True
            if api_error:
                response_data["_api_error"] = f"API unavailable: {api_error}"
        elif isinstance(response_data, list) and response_data:
            # Add mock indicator to the first item
            response_data = response_data.copy()
            response_data.append({"_mock_mode": True, "_note": "Mock data - API may be unavailable"})
        
        # Send mock response
        response_json = json.dumps(response_data, indent=2)
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('X-Mock-Data', 'true')
        self.end_headers()
        self.wfile.write(response_json.encode('utf-8'))
        
        print(f"Served mock data for: {endpoint}")

def run_server(port=8080):
    """Run the server with CORS proxy support"""
    try:
        with socketserver.TCPServer(("", port), CORSProxyHandler) as httpd:
            print(f"🚀 Trans Express API Tester Server starting...")
            print(f"📡 Server running at: http://localhost:{port}")
            print(f"🌐 Open this URL in your browser: http://localhost:{port}")
            print(f"🔄 CORS Proxy available at: http://localhost:{port}/api-proxy/")
            print(f"")
            print(f"📋 Proxy Usage:")
            print(f"   Staging:    http://localhost:{port}/api-proxy/staging/provinces")
            print(f"   Production: http://localhost:{port}/api-proxy/production/provinces")
            print(f"")
            print(f"⚡ Press Ctrl+C to stop the server")
            print(f"=" * 60)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            run_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    import sys
    
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8080.")
    
    # Change to the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    run_server(port)
