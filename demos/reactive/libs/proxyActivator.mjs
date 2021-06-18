/* eslint-disable no-underscore-dangle */
import Dep from './Dep.mjs';

const GLOB = globalThis.glob;
GLOB._deps_proxy = {}; // expose for dev tools

function activate(data) {
  const targetObj = Object.create(data);
  const recordings = new Map(); // start "dependancy" collection for this object

  function getDep(key) {
    let dep = recordings.get(key); // stored by prop name

    if (!dep) recordings.set(key, (dep = new Dep()));

    GLOB._deps_proxy[key] = dep; // dev tools

    return dep;
  }

  // Traps all property accessors

  const handler = {
    get(trgo, key, rcvo) {
      Dep.propLog('get', key, trgo[key]);

      getDep(key).depend(key); // Prop accessed, ensure context is recorded

      return Reflect.get(trgo, key, rcvo);
    },
    set(trgo, key, val, rcvo) {
      const propVal = Reflect.get(trgo, key);
      const changed = propVal !== val;

      if (changed) {
        Dep.propLog('set', key, val);

        Reflect.set(trgo, key, val, rcvo);
        getDep(key).notify(key); // New value, so replay my recorded contexts
      }
      return true;
    },
  };

  const reactiveObj = new Proxy(targetObj, handler);

  return reactiveObj; // object with untouchable wrapper
}

export default activate;
