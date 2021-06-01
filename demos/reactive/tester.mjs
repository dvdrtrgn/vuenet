/* eslint-disable camelcase */
/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */

import Dep from './libs/Dep.mjs';
import logPrices from './libs/logPrices.mjs';
import activateO from './libs/objectActivator.mjs';
import activateP from './libs/proxyActivator.mjs';

const GLOB = globalThis.glob;

function tester(activate) {
  const obj = activate(GLOB.template_object);
  const trace = () => logPrices(obj);
  const _calc_total = () => (obj.total = (obj.sale || obj.price) * obj.count);
  const _calc_sale = () => (obj.sale = obj.price * 0.9);
  const _tax_total = () => (obj.total += 0.99);

  (obj.price = 5), (obj.count = 2), trace();

  function runTotal() {
    Dep.watcher(_calc_total), trace();
    (obj.price = 10), trace();
    (obj.count = 3), trace();
  }
  function runSale() {
    Dep.watcher(_calc_sale), trace();
    (obj.price = 20), trace();
  }
  function killSale() {
    Dep.watcher(false, _calc_sale);
    obj.sale = 0;
    console.warn('(no reactivity to .sale)'), trace();
  }
  function killTotal() {
    Dep.watcher(false, _calc_total);
    obj.price = 40;
    console.warn('(no reactivity at all)'), trace();
  }

  runTotal();
  Dep.watcher(_tax_total), trace();
  runSale();
  killSale();
  (obj.price = 30), trace();
  killTotal();

  return obj; // Export active object
}

function runObjectTest() {
  console.group('Reactive Object testing');
  GLOB.reactive_object = tester(activateO);
  console.groupEnd();
  console.log('%c end🤓assign\n', 'font-size: 1.2rem');
}

function runProxyTest() {
  console.group('Reactive Proxy testing');
  GLOB.reactive_proxy = tester(activateP);
  console.groupEnd();
  console.log('%c end😎proxy\n', 'font-size: 1.2rem');
}

export default {
  runObjectTest,
  runProxyTest,
  all: () => {
    runObjectTest();
    runProxyTest();
  },
};
