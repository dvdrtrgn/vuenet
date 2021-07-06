/* eslint-disable object-curly-newline */

globalThis.glob = {
  template_object: { count: 0, price: 0, sale: 0, total: 0 },
  log_pause: false,
  log_compact: !true,
  log_spacer: true,
};

const reqdef = async (path) => (await import(path)).default;

async function init() {
  globalThis.tester = await reqdef('./tester.mjs');

  console.clear();
  globalThis.tester.all();

  console.log('Set Watch expression for %cglob', 'color: blue');
  console.log('Tweak `glob` and run methods on %ctester', 'color: red');
}

init();
