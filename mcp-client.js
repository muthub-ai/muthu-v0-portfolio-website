// mcp-client.js
// Simple MCP client to trigger Playwright tests via MCP server HTTP API

const http = require('http');

const options = {
  hostname: 'localhost', // MCP server host
  port: 3001,            // MCP server port (change if needed)
  path: '/run-tests',    // MCP server endpoint for running tests
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('MCP Server Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error connecting to MCP server:', error);
});

// Adjust testDir and baseUrl as needed
const body = JSON.stringify({
  testDir: 'playwright/tests',
  baseUrl: 'http://localhost:3000',
});

req.write(body);
req.end();
