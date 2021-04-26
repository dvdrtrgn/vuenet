/* global Vue, */
//
import 'https://unpkg.com/vue';
import data from './scripts/data.js';
import variants from './scripts/product-variants.js';

window.App = new Vue({
  el: '#App',
  components: {
    variants,
  },
  template: // html
    `<div>
      foozi
      <variants
        :variants="variants"
        @switch-variant="updateProduct"
      />
    </div>`,
  data: {
    variants: data,
  },
  methods: {
    updateProduct() {
      console.log(this);
    },
  },
});
