//
const π = '_!_'; // private props key

const nothing = (e) => !(e != null && e.toString() !== 'NaN');

const pushit = (obj, key) => obj[π].keys.push(key);

const getpos = (obj, key) => obj[π].keys.indexOf(key);

const couple = (obj, i) => [obj[π].keys[i], obj[π].vals[i]];

const nullify = (obj, i) => {
  // eslint-disable-next-line no-param-reassign
  obj[π].keys[i] = null; obj[π].vals[i] = null;
};

function mergeAll(obj) {
  const arr = [];

  obj[π].keys.forEach((e, i) => {
    if (!nothing(e)) arr.push(couple(obj, i));
  });

  return arr;
}

// - - - - - - - - - - - - - - - - - -

class Hashtable {
  constructor() {
    this[π] = Object.create(null);
    Object.assign(this[π], { keys: [], vals: [], size: 0 });
  }

  has(key) {
    return Boolean(1 + getpos(this, key));
  }

  get(key) {
    return this[π].vals[getpos(this, key)];
  }

  set(key, val) {
    if (nothing(key)) return false;
    let pos = getpos(this, key);

    if (pos === -1) {
      pos = pushit(this, key) - 1;
      this[π].size += 1;
    }
    this[π].vals[pos] = val;

    return true;
  }

  remove(key) {
    const pos = getpos(this, key);

    if (1 + pos) {
      nullify(this, pos);
      this[π].size -= 1;
    }

    return Boolean(1 + pos);
  }

  get size() {
    return this[π].size;
  }

  // - - - - - - - - - - - - - - - - - -
  // EXTRAS

  dir() {
    console.dirxml(this[π]);
  }

  display() {
    console.table(mergeAll(this));
  }
}

export default Hashtable;
