import 'https://unpkg.com/vue@2';
import pages from './pages.js';

const name = 'Tnav';
const dirs = /(?<=\/)([^/]+)(?=\/)/g;

const template = /*html*/ `
<nav id="Tnav">
  <a :href="prev">⬅️</a>
  <a :href="up">⬆️</a>
  <a :href="next">➡️</a>
</nav>`;

export default window[name] = new Vue({
  name,
  el: '#' + name,
  template,
  data() {
    return {
      pages,
      count: pages.length,
      path: location.pathname.match(dirs),
    };
  },
  computed: {
    myloc() {
      return this.path.slice().pop();
    },
    mynum() {
      return this.pages.indexOf(this.myloc);
    },
    prevnum() {
      let num = this.mynum - 1;
      return num < 0 ? num + this.count : num;
    },
    nextnum() {
      let num = this.mynum + 1;
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
});
