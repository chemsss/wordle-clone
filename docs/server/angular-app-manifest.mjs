
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 661, hash: 'bd617ad9b3c99169bae6bc1962a7afc615fa408b0ec8ae5a352d2ee5f257dc89', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1009, hash: '9457a0e9031b7fa5362b66aad411bd972c4717bcdc46d26121d0678c66fa0af5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-LE3R4QXI.css': {size: 40, hash: 'g4AsJqiwJ9o', text: () => import('./assets-chunks/styles-LE3R4QXI_css.mjs').then(m => m.default)}
  },
};
