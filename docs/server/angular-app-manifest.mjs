
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 660, hash: '36bc5d9c5c073e8d57a3b71c2aac60b38deae6e38eb7cd8b48847ecea3a01e85', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1008, hash: '6ab65f59c9107f691c3db75f1e0a3b13e838c4ca85ad8fd4e925964b28a02a4b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-LE3R4QXI.css': {size: 40, hash: 'g4AsJqiwJ9o', text: () => import('./assets-chunks/styles-LE3R4QXI_css.mjs').then(m => m.default)}
  },
};
