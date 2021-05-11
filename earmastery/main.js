/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* global Vue, */
//
import 'https://unpkg.com/vue@2.6.12';

const Util = {
  vlinkData(ele) {
    const arr = ele.href.match(/.+\/watch\?v=([^/]+)#t=(\d+)s$/);
    if (arr) {
      ele.dataset.vlink = `https://www.youtube.com/embed/${arr[1]}?start=${arr[2]}s`;
    }
    return ele;
  },
  trigger_Vlink(evt) {
    evt.preventDefault();
    App.vlink = this.dataset.vlink;
  },
  transformLink(ele) {
    Util.vlinkData(ele);
    ele.addEventListener('click', Util.trigger_Vlink);
  },
};

const App = new Vue({
  el: '#App',
  name: 'Intervals',
  data() {
    return {
      state: true,
      vlink: '',
      test: 'https://www.youtube.com/embed/0C2uMJUNlws',
    };
  },
  methods: {
    toggle() {
      this.state = !this.state;
    },
    readstate() {
      return this.state ? 'ascending' : 'descending';
    },
  },
  mounted() {
    this.$el.querySelectorAll('a').forEach(Util.transformLink);
  },
  computed: {},
});
