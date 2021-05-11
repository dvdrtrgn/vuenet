/* global Vue, */
//
import 'https://unpkg.com/vue@2.6.12';

const name = 'Missing';
const template = /* html */ `
<section>
  <p>
    Feel free to send a message to speed the page recovery!
  </p>
  <p>
    Use the
    <a :href="loc" class="btn">contact</a>
    button to indicate which page.
  </p>

</section>`;

window.name = new Vue({
  el: `#${name}`,
  name,
  template,
  components: {},
  data: {},
  methods: {},
  computed: {
    loc() {
      let { href } = window.location;

      href = href.replace(/http.*:\/\//, '').replace('.html', '');
      href = `/contactme?msg=Missing page: ${href}`;

      return href;
    },
  },
});
