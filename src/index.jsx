import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import worker from './test/mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </CookiesProvider>,
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
