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
      <button @click="down">⇩</button>
      <button @click="up">⇧</button>
    </p>
    <textarea v-model="output">{{output}}</textarea>
  </form>
  <!-- 🔼🔽 -->
`,
  data: {
    midi: null,
    note: '',
  },
  methods: {
    process() {
      if (this.midi < 1) this.midi = 60;
      this.midi = Math.min(Math.max(this.midi, 21), 128);
      this.note = makeNote(this.midi);
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
      return JSON.stringify(this.note, null, 2).replace(/"/g, '');
    },
  },
});
