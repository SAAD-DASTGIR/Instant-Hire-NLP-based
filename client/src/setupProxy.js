const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-container-1:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        // Log the proxy request to ensure it is being forwarded correctly
        console.log('Proxying request:', req.method, req.url);
      },
      onError: (err, req, res) => {
        // Log errors to help diagnose issues
        console.error('Proxy error:', err);
      }
    })
  );
};
