const name = 'LogE';

import 'https://unpkg.com/vue@2';
import Sym from './Sym.js';
import Val from './Val.js';

const App = new Vue({
  name,
  el: `#${name}`,
  components: {},
  data() {
    return {
      message: '',
      base: 1,
      growth: 1,
      periods: 12,
    };
  },
  methods: {
    Clog() {
      console.log(name + '.Clog: ', this.message);
    },
  },
  components: {
    Sym,
    Val,
  },
  computed: {
    result() {
      return (this.base + this.growth / this.periods) ** this.periods;
    },
    result2() {
      return this.e ** (this.r * this.t);
    },
    diff() {
      return this.result - this.e;
    },
    e() {
      return Math.E;
    },
    r() {
      return this.growth / this.periods;
    },
    t() {
      return this.periods;
    },
    rt() {
      return this.r * this.t;
    },
    percent() {
      return (this.growth * 100).toFixed(2) + '%';
    },
  },
});
