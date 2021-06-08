/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/*
  PixelStat (by dvdrtrgn 2021-06-08)

  Make new PixelStat for viewport properties
  Call watchWindow([element]) have it always updating
  [if you send in a dom element it will receive classes]

*/
const W = window;
const DE = document.documentElement;

const Round = (num) => Number(num.toFixed(5));
const VH = () => Math.max(DE.clientHeight || 0, W.innerHeight || 0);
const VW = () => Math.max(DE.clientWidth || 0, W.innerWidth || 0);

class Pixels {
  constructor() {
    this._resetEl = function (oldList, newList) {
      if (oldList) oldList.forEach((e) => this._ele.classList.remove(e));
      if (newList) newList.forEach((e) => this._ele.classList.add(e));
      return newList;
    };
    this._updateEl = function (doit) {
      if (doit != null) doit = Boolean(doit);
      else if (!this._resets) return;
      if (doit == null) doit = true; // permissive continuation

      const newClasses = doit ? this.classes : false;
      this._resets = this._resetEl(this._resets, newClasses);
    };
    this._ele = DE;
    this._resets = false;
    this.classes = null;

    this.update = this.update.bind(this);
    this.update();
  }

  get max() {
    return Math.max(VW(), VH());
  }
  get min() {
    return Math.min(VW(), VH());
  }

  get pxRatio() {
    return Number(W.devicePixelRatio || 1); // no zoom change on safari
  }
  get whRatio() {
    return Round(VW() / VH());
  }

  get cssArea() {
    return (VW() * VH()) / 1e6;
  }
  get devArea() {
    return Round(this.cssArea * this.pxRatio);
  }

  get clientSize() {
    return [DE.clientWidth, DE.clientHeight];
  }
  get innerSize() {
    return [W.innerWidth, W.innerHeight];
  }
  get screenSize() {
    return [W.screen.width, W.screen.height];
  }

  update() {
    this.classes = [
      this.classMega(),
      this.classRes(),
      this.classShape(),
      this.classSize(),
    ];
    this._updateEl();
  }

  watchWindow(arg) {
    this._updateEl(false); // clear any previous
    if (arg && arg.childNodes) this._ele = arg;

    this._updateEl(true);
    W.addEventListener('resize', this.update);
  }
  unwatchWindow() {
    W.removeEventListener('resize', this.update);
    this._updateEl(false);
  }

  classMega() {
    let mp = this.devArea;

    if (mp < 0.7) mp = 'submega';
    else if (mp < 1) mp = 'mega1';
    else mp = `mega${mp.toPrecision(1)}`;

    return mp;
  }
  classRes() {
    if (this.pxRatio >= 3) return 'hires';
    if (this.pxRatio <= 1) return 'lores';

    return 'okres';
  }
  classSize() {
    if (this.cssArea < 0.5) return 'mobile';
    if (this.cssArea < 1) return 'small';
    if (this.cssArea > 3) return 'huge';
    if (this.cssArea > 2) return 'large';

    return 'average';
  }
  classShape() {
    if (this.whRatio < 0.8) return 'portrait';
    if (this.whRatio > 1.2) return 'landscape';

    return 'square';
  }

  stats() {
    const self = this;
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(self));
    const vals = {};
    const skip = [
      'constructor',
      'stats',
      'toString',
      'update',
      'unwatchWindow',
      'watchWindow',
    ];

    keys.forEach((key) => {
      if (skip.includes(key)) return;
      let val = self[key];
      if (typeof val === 'function') val = val.bind(self)();
      vals[key] = val;
    });

    return vals;
  }

  toString() {
    const obj = this.stats();
    const arr = Object.entries(obj).map((e) => e.join(': '));

    return arr.join('\n');
  }
}

export default Pixels;
