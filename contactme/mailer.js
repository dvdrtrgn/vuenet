const form = document.querySelector('form');
const result = document.getElementById('Result');

form.addEventListener('submit', (event) => {
  // prevent the form submit from refreshing the page
  event.preventDefault();

  const { name, email, message } = event.target;

  const api = 'https://rdjb1t7yff.execute-api.us-east-1.amazonaws.com';
  const endpoint = `${api}/default/sendContactEmail`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      senderName: name.value,
      senderEmail: email.value,
      message: message.value,
    }),
  };

  function hasErrors() {
    const errors = [];

    if (!email.value) {
      email.value = 'Anony @Mouse.biz';
      errors.push('Don’t you want me to get back?');
    }

    result.innerText = errors.join('\n');

    return errors.length;
  }

  if (!hasErrors()) {
    console.log(message);
    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error('Error in fetch');
        return response.json();
      })
      .then((response) => {
        console.log(JSON.stringify(response));
        result.innerText = 'Email Sent';
        form.reset();
      })
      .catch((error) => {
        result.innerText = `An unknown error occured. ${error.message}`;
      });
  }
});
