/* global Vue, */

import 'https://unpkg.com/vue@2';
import pages from './pages.js';

const name = 'Tnav';
const dirs = /(?<=\/)([^/]+)(?=\/)/g;

const template = /* html */ `
<nav id="Tnav">
  <a :href="prev">⬅️</a>
  <a :href="up">⬆️</a>
  <a :href="next">➡️</a>
</nav>`;

const doc = document.scrollingElement;
const god = window;

const scrollReach = () => Math.ceil(god.scrollY + god.innerHeight);
const rockBottom = () => doc.offsetHeight <= scrollReach();

export default window[name] = new Vue({
  name,
  el: `#${name}`,
  template,
  data() {
    return {
      pages,
      count: pages.length,
      path: window.location.pathname.match(dirs),
    };
  },
  methods: {
    shy() {
      if (!rockBottom()) this.$el.style.bottom = '';
    },
  },
  computed: {
    myloc() {
      return this.path.slice().pop();
    },
    mynum() {
      return this.pages.indexOf(this.myloc);
    },
    prevnum() {
      const num = this.mynum - 1;
      return num < 0 ? num + this.count : num;
    },
    nextnum() {
      const num = this.mynum + 1;
      return num < this.count ? num : num - this.count;
    },
    prev() {
      return this.up + this.pages[this.prevnum];
    },
    next() {
      return this.up + this.pages[this.nextnum];
    },
    up() {
      return '../';
    },
  },
  mounted() {
    let timeout = null;
    let lastpos = scrollReach();
    const readtheroom = () => {
      if (scrollReach() >= lastpos) {
        this.$el.style.bottom = '-1rem';
        god.clearTimeout(timeout);
      }
      timeout = god.setTimeout(this.shy, 333);
      lastpos = scrollReach();
    };

    readtheroom();
    god.addEventListener('scroll', readtheroom);
  },
});
