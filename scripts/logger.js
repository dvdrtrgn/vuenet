/* global LogRocket, */
//
import './lib/logrocket.js'; // import LogRocket from 'logrocket';

LogRocket.init('ox0wqw/mynetlify');

fetch('https://api.ipify.org?format=json')
  .then((data) => data.json())
  .then((data) => {
    const { host, pathname: path } = window.location;
    console.log('log:rock', data.ip, 'from', host, 'at', path);

    LogRocket.identify(data.ip, {
      name: 'user',
      email: `user@${data.ip}`,
      // Add your own custom user variables here, ie:
      custom: `host ${host}`,
    });

    LogRocket.track('pageload', {
      path,
      etc: 'etc',
    });
  });
