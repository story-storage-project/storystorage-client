const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(['/auth/google'], {
      target: process.env.REACT_APP_BASE,
      changeOrigin: true,
      router: {
        '/auth/google': process.env.REACT_APP_CLIENT,
      },
      pathRewrite: {
        '^/auth/google': '/auth/google',
      },
    }),
  );
};
