/* global Vue, */
//
import 'https://unpkg.com/vue';

const template = /* html */ `
<head>
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta property="og:image" content="https://www.dvdrtrgn.com/images/davey.png">
  <meta property="og:image:width" content="364">
  <meta property="og:image:height" content="364">
  <meta property="og:title" content="DvdrTrgn - David Theory, etc">
  <meta property="og:description" content="Fun times, strange code. Click it now!">
  <meta property="og:url" content="https://www.dvdrtrgn.com">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/davey.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/davey.png">
  <meta name="theme-color" content="#ffffff">
</head>
  `;

window.Meta = new Vue({
  el: '#Meta',
  components: {},
  template,
  data: {},
  methods: {},
  computed: {
    loc() {
      return window.location.href;
    },
  },
});
