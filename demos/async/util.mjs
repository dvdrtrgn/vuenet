// eslint-disable-next-line eqeqeq
const def = (x) => x != undefined;
const crypt = (s) => s.split('').reverse().join('');

function que(_ = {}) {
  Object.assign(_, {
    cb: _.cb || alert.bind(window),
    title: _.title || 'test',
    total: def(_.wait) ? _.wait * 1000 : 777,
  });

  setTimeout(() => {
    console.groupEnd();
    if (_.wait) console.group(_.title);
    _.cb();
  }, _.total);

  console.log('que', _);
}

function mockReq(sitename) {
  return new Promise((resume, reject) => {
    console.log(`mockReq: ${sitename}`);

    if (sitename === 'Google') {
      resume(crypt(`${sitename} said ‘hi’ @ ${Date.now()}`));
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`Cannot talk to ${sitename}`);
    }
  });
}

function procReq(response) {
  return new Promise((resume) => {
    que({
      title: 'Processing response',
      cb: () => resume(`Processed: “${crypt(response)}”`),
      // no wait causes sub 1s delay
    });
  });
}

export default { mockReq, procReq, que };
