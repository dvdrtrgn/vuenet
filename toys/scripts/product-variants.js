/* global Vue, */

import eventBus from './eventBus.js';

export default Vue.component('product-variants', {
  template: // html
    `
   <div class="product-variants">
    <div
      class="color-box"
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      :style="{ backgroundColor: variant.variantColor }"
      @mouseover="updateProduct(index)"
    ></div>
  </div>
  `,
  props: {
    variants: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateProduct(index) {
      console.log(index);
      eventBus.$emit('switch-variant', index);
    },
  },
});
