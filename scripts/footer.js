/* global Vue, */
//
import 'https://unpkg.com/vue';

window.Footer = new Vue({
  el: '#Footer',
  components: {},
  template: // html
    `<footer>
      <nav>
        <a class="code" href="/">home</a>
        <a class="code" href="/resume.html">resume</a>
        <a class="code" href="/midicalc">midicalc</a>
        <a class="code" href="/earmastery">intervals</a>
      </nav>
      <p class="stack">stack</p>
      <a class="code" href="https://vuejs.org/">vuejs.org</a>
      <a class="code" href="https://www.netlify.com">netlify.com</a>
      <a class="code" href="https://developer.mozilla.org">developer.mozilla.org</a>
      <br><br>
      <pre>{{ loc }}</pre>
    </footer>`,
  data: {
  },
  methods: {
  },
  computed: {
    loc() {
      return window.location.href;
    },
  },
});
