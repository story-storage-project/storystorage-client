// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = app => {
//   app.use(
//     createProxyMiddleware(['/auth/google'], {
//       target: process.env.REACT_APP_BASE,
//       changeOrigin: true,
//       router: {
//         '/auth/google': process.env.REACT_APP_CLIENT,
//       },
//       pathRewrite: {
//         '^/auth/google': '/auth/google',
//       },
//     }),
//   );
// };

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     ['/auth/google'],
//     createProxyMiddleware({
//       target: 'http://localhost:3080',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/auth/google': '/auth/google', // rewrite path
//       },
//     })
//   );
// };
