#!/usr/bin/env python3
"""
Test script to verify the Trans Express API Tester server is working correctly
"""

import subprocess
import sys
import time
import urllib.request
import json
from urllib.error import URLError

def test_server():
    print("🧪 Testing Trans Express API Tester Server...")
    print("=" * 50)
    
    # Test if we can reach localhost:8080
    try:
        print("📡 Testing server availability...")
        response = urllib.request.urlopen('http://localhost:8080', timeout=5)
        print("✅ Server is responding")
    except URLError as e:
        print(f"❌ Server not available: {e}")
        print("💡 Make sure to run 'python server.py' first")
        return False
    
    # Test proxy endpoint
    try:
        print("🔄 Testing CORS proxy...")
        proxy_url = 'http://localhost:8080/api-proxy/staging/provinces'
        response = urllib.request.urlopen(proxy_url, timeout=10)
        data = response.read().decode('utf-8')
        
        # Try to parse as JSON
        try:
            json_data = json.loads(data)
            print("✅ Proxy is working - API responded with JSON data")
            print(f"📋 Sample response: {json_data[:2] if isinstance(json_data, list) else 'Object received'}")
        except json.JSONDecodeError:
            print("⚠️ Proxy responded but not with JSON data")
            print(f"📋 Response preview: {data[:100]}")
        
    except URLError as e:
        print(f"❌ Proxy test failed: {e}")
        return False
    
    print("\n🎉 All tests passed! The server is working correctly.")
    print("🌐 You can now open http://localhost:8080 in your browser.")
    return True

def run_server_and_test():
    """Run the server and then test it"""
    print("🚀 Starting server and running tests...")
    
    try:
        # Start server in background
        server_process = subprocess.Popen([sys.executable, 'server.py'], 
                                        stdout=subprocess.PIPE, 
                                        stderr=subprocess.PIPE)
        
        # Wait a bit for server to start
        print("⏳ Waiting for server to start...")
        time.sleep(3)
        
        # Test the server
        if test_server():
            print("\n✅ Setup complete! Press Ctrl+C to stop the server.")
            try:
                server_process.wait()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped by user")
                server_process.terminate()
        else:
            print("\n❌ Tests failed")
            server_process.terminate()
            
    except FileNotFoundError:
        print("❌ Python not found or server.py missing")
        print("💡 Make sure you're in the api-tester directory")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == '--test-only':
        test_server()
    else:
        run_server_and_test()
