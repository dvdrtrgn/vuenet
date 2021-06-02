/*global define, EventTarget, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-08-29
  IDEA    Mutate EventTarget to prefer passive listeners
  NOTE    Single run
  TODO    Document where prevent default is needed

 */
define([], function () {
  'use strict';

  var W = window;
  var C = W.console;

  var hasPassive;
  var isPassive = 'Passive events? dunno yet';

  // - - - - - - - - - - - - - - - - - -

  function delay(fn, ms) {
    W.setTimeout(fn, ms || 999);
  }

  function nodef(x) {
    return x === undefined;
  }

  function detectPassiveEvents() {
    if (
      (hasPassive === undefined) &&
      typeof window === 'object' &&
      typeof window.addEventListener === 'function' &&
      typeof Object.defineProperty === 'function'
    ) {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          return (hasPassive = true);
        },
      });
      window.addEventListener('test', null, opts);
    } else {
      hasPassive = false;
    }
    return hasPassive;
  }

  function makePassiveDefault() {
    if (!detectPassiveEvents()) return 'Passive events not supported';

    var addEventListener = EventTarget.prototype.addEventListener;
    var defaults = {
      passive: true,
      capture: false,
    };

    EventTarget.prototype.addEventListener = function (type, listener, opts) {

      var usesOpts = (typeof opts === 'object');
      var useCapture = (usesOpts ? opts.capture : opts);

      opts = usesOpts ? opts : {};
      opts.passive = nodef(opts.passive) ? defaults.passive : opts.passive;
      opts.capture = nodef(useCapture) ? defaults.capture : useCapture;

      if (!type.match('touch')) {
        opts.passive = false;
      } else {
        C.debug('Passive events required for', type);
      }

      addEventListener.call(this, type, listener, opts);
    };

    return 'Passive events were made the default';
  }

  function patchevt() {
    return isPassive;
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  isPassive = makePassiveDefault();
  W.patchevt = patchevt;

  delay(function () {
    C.debug(patchevt());
  }, 99);

  return patchevt;
});

/*



 */
