const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        // Log the proxy request to ensure it is being forwarded correctly
        console.log('Proxying request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Log the proxy response to ensure it is being received correctly
        console.log('Proxy response:', proxyRes.statusCode, req.url);
      },
      onError: (err, req, res) => {
        // Log errors to help diagnose issues
        console.error('Proxy error:', err);
      }
    })
  );
};
