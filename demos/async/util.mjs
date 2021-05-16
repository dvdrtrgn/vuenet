const def = (x) => x != undefined;
const crypt = (s) => s.split('').reverse().join('');

function mockReq(sitename) {
  return new Promise((resume, reject) => {
    console.log(`mockReq: ${sitename}`);

    if (sitename === 'Google') {
      resume(crypt(`${sitename} said ‘hi’ @ ${Date.now()}`));
    } else {
      reject(`Cannot talk to ${sitename}`);
    }
  });
}

function procReq(response) {
  return new Promise((resume) => {
    que({
      title: `Processing response`,
      cb: () => resume(`Processed: “${crypt(response)}”`),
      // no wait causes sub 1s delay
    });
  });
}

function que(_ = {}) {
  _.cb = _.cb || alert.bind(window);
  _.title = _.title || 'test';

  _.total = def(_.wait) ? _.wait * 1000 : 777;

  setTimeout(function () {
    console.groupEnd();
    if (_.wait) console.group(_.title);
    _.cb();
  }, _.total);

  console.log('que', _);
}

export default { mockReq, procReq, que };
