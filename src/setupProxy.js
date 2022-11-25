const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(['/auth/google', '/auth/**'], {
      target: process.env.REACT_APP_BASE,
      changeOrigin: true,
      router: {
        '/v2': process.env.REACT_APP_BASE,
      },
      pathRewrite: {
        '^/v2': '',
      },
    }),
  );
};
