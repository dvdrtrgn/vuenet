/* global Vue, */
//
import 'https://unpkg.com/vue@2.6.12';
import makeNote from './scripts/makeNote.js';

window.App = new Vue({
  el: '#App',
  components: {},
  template: // html
    `<form @submit.prevent="">
    <p>
      enter note
      <i>from {{ makeNote.min }} to {{ makeNote.max }}</i>
    </p>
    <input
      @change="process"
      placeholder="middle C is 60"
      type="number"
      v-model="index">
    <p>
      Then press enter, or
      <button :disabled="index === makeNote.min" @click="down">⇩</button>
      <button :disabled="index === makeNote.max" @click="up">⇧</button>
    </p>
    <textarea :value="output"></textarea>
    <div>
      Notation:
      <label>
        <input v-model="notation" name="notation" type="radio" value="flats" @change="change">
        {{ makeNote.symbol.flat }}
      </label>
      <label>
        <input v-model="notation" name="notation" type="radio" value="sharps" @change="change">
        {{ makeNote.symbol.sharp }}
      </label>
    </div>
  </form>
  <!-- 🔼🔽 -->
`,
  data: {
    makeNote,
    index: null,
    info: '',
    notation: 'flats',
  },
  methods: {
    process() {
      if (this.index <= 1) this.index = 60;
      this.info = makeNote(this.index);
      this.index = this.info.midi; // re-clamp
    },
    up() {
      this.index += 1;
      this.process();
    },
    down() {
      this.index -= 1;
      this.process();
    },
    change() {
      makeNote.flat = this.notation === 'flats';
      this.process();
    },
  },
  computed: {
    output() {
      const str = JSON.stringify(this.info, null, 2);

      return str.slice(2, -2).replace(/"/g, '');
    },
  },
});
