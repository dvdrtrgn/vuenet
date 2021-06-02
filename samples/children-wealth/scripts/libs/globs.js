/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2017-12-01
  IDEA    track props added to window
  NOTE    detect and/or report additions
  TODO    ???

 */

(function (factory) {
  'use strict';

  if ((typeof define === 'function' && define.amd)) {
    define([], factory);
  } else {
    factory();
  }
}(function () {
  'use strict';

  var NOM = 'Globs';
  var W = window;
  var C = console;
  // C.debug(NOM, 'loaded');

  var Globs = {
    length: 0,
    record: [],
  }; // Object.create(null);

  { // do not run again
    if (W[NOM]) return;
    else W[NOM] = Globs;
  }

  var nativeKeys = Object.keys(W);
  var nativeCount = nativeKeys.length;

  var keysCounted = nativeCount; // native and added counter
  var keysRecorded = {};

  var scansTotal = 0; // updated count
  var addedTotal = 0; // added count

  function procBuiltins() {
    var i;
    for (i = 0; i < keysCounted; ++i) {
      keysRecorded[nativeKeys[i]] = 0;
    }
  }

  function recordAdded() {
    Globs.record = [];

    var current = Object.keys(W);
    var i, keyName;

    keysCounted = current.length;

    for (i = 0; i < keysCounted; ++i) {
      keyName = current[i];
      // compare lists and find the differences
      if (!(keyName in keysRecorded)) {
        Globs.length += 1;
        Globs.record.push(keyName);
        Globs[Globs.length + ':' + keyName] = W[keyName];
        keysRecorded[keyName] = scansTotal;
      }
    }

    return Globs.length - addedTotal;
  }

  function runScanner() {
    var message, addCount = recordAdded();

    if (addCount) {
      addedTotal = Globs.length;
      message = 'run#' + scansTotal + ' +' + Globs.record.length;
      C.warn(NOM, message, Globs.record);
    } else {
      message = '(nothing new) Total: ' + keysCounted;
      C.info(NOM, message, Globs);
    }

    W.setTimeout(runScanner, Math.pow(10, ++scansTotal));
  }

  function init() {
    // set the first item
    Globs['0:window'] = [W, Globs];
    procBuiltins();
    // kick off
    runScanner();
  }

  init();
}));
