
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://kameswarpanda.github.io/Investment-Portfolio-Tracker/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/home"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/home/login"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/home/register"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/home/forgetpassword"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/stock-management"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/portfolio-details"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/stocks"
  },
  {
    "renderMode": 2,
    "route": "/https://kameswarpanda.github.io/Investment-Portfolio-Tracker/stock-details"
  }
],
  assets: {
    'index.csr.html': {size: 1620, hash: '1d8a73ea9e5899643290006dcd94b94402d09149ef93b33f8c1643e6bf79f643', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2141, hash: '9df049f81a15564d5116640486aee7696a582dbf791ce5dca57298e9cb805a78', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'home/register/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/home_register_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'home/forgetpassword/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/home_forgetpassword_index_html.mjs').then(m => m.default)},
    'home/login/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/home_login_index_html.mjs').then(m => m.default)},
    'portfolio-details/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/portfolio-details_index_html.mjs').then(m => m.default)},
    'stock-management/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/stock-management_index_html.mjs').then(m => m.default)},
    'stocks/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/stocks_index_html.mjs').then(m => m.default)},
    'stock-details/index.html': {size: 5164, hash: 'e45841870fe02c3fb67a8e2a4dd06a339082fabeab7501eda683d53a5ebf8a16', text: () => import('./assets-chunks/stock-details_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
