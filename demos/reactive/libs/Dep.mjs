const CON = console;
const GLOB = globalThis.glob;

let target = null;
let unwatch = null;
let recording = false;
let notifying = false;

const logmeth = () => (GLOB.log_compact ? 'groupCollapsed' : 'group');
const logFns = (arr) => `${arr.map((f) => f.name).join(', ')}`;
const logDeps = (dep, list) => {
  const a = logFns([dep]);
  const b = logFns(list);
  const c = target ? logFns([target]) : '';
  return `Deps :: (${a}) -> [${b}] ... ${c}`;
};

class Dep {
  constructor() {
    this.subs = [];
  }

  depend(logNom) {
    if (target) {
      const there = this.subs.includes(target);
      const records = `records [${logFns(this.subs)}]`;

      if (unwatch && there) {
        this.subs = this.subs.filter((e) => e !== target);
        CON.error(
          'ERASED',
          target.name,
          [target],
          `from .${logNom} ${records}`,
        );
      }
      if (!unwatch && !there && !recording) {
        this.subs.push(target);
        CON.warn('RECORDED', target.name, [target], `to .${logNom} ${records}`);
      }
    }
  }

  notify(logNom) {
    if (!this.subs.length) return;
    if (logNom === notifying) return; // circular?

    notifying = logNom;

    this.subs.forEach((sub) => {
      if (sub === target) {
        CON.warn(`halt ${logFns([sub])} recursion`);
        return;
      }

      CON[logmeth()]('REPLAYING', logNom, logDeps(sub, this.subs));
      recording = true;
      sub();
      recording = false;
      CON.groupEnd();
    });
  }

  static watcher(sub, unsub) {
    target = sub || unsub;

    if (!sub) {
      unwatch = true;
      CON[logmeth()]('UNWATCH invocation of', target.name);
    } else {
      CON[logmeth()]('WATCH invocation of', target.name);
    }
    target();
    target = null;
    unwatch = null;

    if (GLOB.log_spacer) CON.log(' ');
    CON.groupEnd();
  }

  static propLog(meth, key, val) {
    if (GLOB.log_pause) return;
    if (meth === 'set') CON.log(`.${key} was updated to`, val);

    if (GLOB.log_compact) return;
    if (meth === 'get') CON.log(`.${key} being read as`, val);
  }
}

export default Dep;
