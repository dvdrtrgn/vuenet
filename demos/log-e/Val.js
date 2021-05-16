const template = /*html*/ `
<span class="value" :class="{ neg: Number(value) < 0 }">{{ value }}</span>`;

export default {
  name: 'val',
  props: ['fix', 'val'],
  template,
  data() {
    return {};
  },
  computed: {
    value() {
      let fixed = this.val.toFixed(this.fix);
      return this.fix ? fixed : this.val;
    },
  },
};
