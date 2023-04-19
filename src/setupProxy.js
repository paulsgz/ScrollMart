const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/bestbuy-api',
    createProxyMiddleware({
      target: 'https://api.bestbuy.com',
      changeOrigin: true,
      pathRewrite: {
        '^/bestbuy-api': '',
      },
    })
  );
};