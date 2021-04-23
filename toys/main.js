/* global Vue, */
//
import 'https://unpkg.com/vue';
import makeNote from './scripts/makeNote.js';

window.App = new Vue({
  el: '#App',
  components: {},
  template: // html
    `<form @submit.prevent="">
    <p>
      Type a midi note number<br>
      <i>(from from 21… 128)</i>
    </p>
    <input
      @change="process"
      placeholder="middle C is 60"
      type="number"
      v-model="midi">
    <p>
      Then press enter, or
      <button :disabled="midi === 21" @click="down">⇩</button>
      <button :disabled="midi === 128" @click="up">⇧</button>
    </p>
    <textarea :value="output"></textarea>
  </form>
  <!-- 🔼🔽 -->
`,
  data: {
    midi: null,
    info: '',
  },
  methods: {
    process() {
      if (this.midi < 1) this.midi = 60;
      this.midi = Math.min(Math.max(this.midi, 21), 128);
      this.info = makeNote(this.midi);
    },
    up() {
      if (this.midi === null) this.midi = 60;
      this.midi += 1;
      this.process();
    },
    down() {
      this.midi -= 1;
      this.process();
    },
  },
  computed: {
    output() {
      return JSON.stringify(this.info, null, 2).replace(/"/g, '');
    },
  },
});
