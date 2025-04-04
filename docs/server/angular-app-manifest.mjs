
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 661, hash: '4026609dee07f345cc3f6412b220b990cb5d00f6882d043913f35eacf94d2534', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1009, hash: '96a6ea2c221514998b9229dd40c3419affbcc8535daf0687db7989e40a64769c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-LE3R4QXI.css': {size: 40, hash: 'g4AsJqiwJ9o', text: () => import('./assets-chunks/styles-LE3R4QXI_css.mjs').then(m => m.default)}
  },
};
