/* global Vue, */
//
import 'https://unpkg.com/vue@2.6.12';

window.Footer = document.querySelector('#Footer') && new Vue({
  el: '#Footer',
  name: 'Footer',
  components: {},
  template: /* html */ `
    <footer>
      <nav>
        <a class="btn" href="/">top</a>
        <a class="btn" href="/resume.html">resume</a>
        <a class="btn" href="/midicalc">midicalc</a>
        <a class="btn" href="/earmastery">intervals</a>
        <a class="btn" href="/vuebox">vuebox</a>
      </nav>

      <nav>
        <a class="" href="https://vuejs.org">vuejs</a> ÷
        <a class="" href="https://www.netlify.com">netlify</a> ÷
        <a class="" href="https://developer.mozilla.org">mozilla</a> ÷
        <a class="btn" href="https://github.com/dvdrtrgn">github</a> ÷
        <a class="btn" href="/contactme">contact</a>
      </nav>

      <a class="stack" href="https://deploy-preview-1--dvdrtrgn.netlify.app/">jamstack</a>
      <pre class="loc">{{ loc }}</pre>
    </footer>`,
  data: {},
  methods: {},
  computed: {
    loc() {
      let loc = window.location.href;
      loc = loc.replace(/http.*:\/\//, '');
      loc = loc.replace('deploy-preview-1--', '');
      loc = loc.replace('.html', '');
      return loc;
    },
  },
});
