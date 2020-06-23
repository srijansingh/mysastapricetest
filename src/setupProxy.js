const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://server.rittzyserver.tk',
      changeOrigin: true,
    })
  );
};
