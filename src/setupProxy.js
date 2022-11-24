import proxy from 'http-proxy-middleware';
import config from './config';

export default function (app) {
  app.use(proxy(['/auth/google'], { target: config.base }));
}
