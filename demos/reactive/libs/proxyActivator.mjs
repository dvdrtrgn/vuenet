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
    get(obj, key) {
      Dep.propLog('get', key, obj[key]);

      getDep(key).depend(key); // Prop accessed, ensure context is recorded

      return Reflect.get(obj, key);
    },
    set(obj, key, newVal) {
      const propVal = Reflect.get(obj, key);
      const changed = propVal !== newVal;

      if (changed) {
        Dep.propLog('set', key, newVal);

        Reflect.set(obj, key, newVal);
        getDep(key).notify(key); // New value, so replay my recorded contexts
      }
      return true;
    },
  };

  const reactiveObj = new Proxy(targetObj, handler);

  return reactiveObj; // object with untouchable wrapper
}

export default activate;
