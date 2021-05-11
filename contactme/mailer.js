/* global Vue, */
//
import 'https://unpkg.com/vue@2.6.12';

const form = document.querySelector('form');
const api = 'https://rdjb1t7yff.execute-api.us-east-1.amazonaws.com';
const endpoint = `${api}/default/sendContactEmail`;

window.Mailer = new Vue({
  el: '#App',
  name: 'Mailer',
  data() {
    return {
      senderName: '',
      senderEmail: '',
      message: '',
      result: '',
      errors: [],
    };
  },
  methods: {
    listener() {
      this.validate();

      if (!this.errors.length) {
        fetch(endpoint, this.requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error('Error in fetch');
            return response.json();
          })
          .then((response) => {
            console.log(JSON.stringify(response));
            this.result = 'Email Sent';
            form.reset();
          })
          .catch((error) => {
            this.result = `An unknown error occured. ${error.message}`;
          });
      }
    },
    validate() {
      this.errors = [];

      if (!this.senderEmail) {
        this.senderEmail = 'anon @ymous.biz';
        this.errors.push('No email? Remove space before @');
      }
      this.result = this.errors.join('\n');
    },
  },
  mounted() {},
  computed: {
    requestOptions() {
      const { senderName, senderEmail, message } = this;
      return {
        method: 'POST',
        body: JSON.stringify({
          senderName,
          senderEmail,
          message,
        }),
      };
    },
  },
});
