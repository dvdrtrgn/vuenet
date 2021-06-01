/* eslint-disable no-underscore-dangle */
import Dep from './Dep.mjs';

const GLOB = globalThis.glob;
GLOB._deps_object = {}; // expose for dev tools

function activate(data, singleProp = false) {
  let targetCopy = {};

  // Wrap properties in accessors

  const makeReactive = (propKey) => {
    const recordings = new Dep(); // start "dependancy" collection for this object
    let propVal = data[propKey];

    GLOB._deps_object[propKey] = recordings; // dev tools

    Object.defineProperty(targetCopy, propKey, {
      get: function reactiveGetter() {
        Dep.propLog('get', propKey, propVal);

        recordings.depend(propKey); // Prop accessed, ensure context is recorded

        return propVal;
      },
      set: function reactiveSetter(newVal) {
        const changed = propVal !== newVal;

        if (changed) {
          Dep.propLog('set', propKey, newVal);

          propVal = newVal;
          recordings.notify(propKey); // New value, so replay my recorded contexts
        }
      },
    });
  };

  if (!singleProp) {
    Object.keys(data).forEach(makeReactive);
  } else {
    targetCopy = data;
    makeReactive(singleProp); // handle single property upgrade
  }

  return targetCopy;
}

export default activate;
