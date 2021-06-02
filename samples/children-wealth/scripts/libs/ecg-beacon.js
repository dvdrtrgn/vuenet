/*jslint -W069, -W009 */
/*global define, ga, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-23
  IDEA    buffer engagement triggers
  NOTE    interval (def 15s) for analytics
  TODO    ???

 */
define(function () {
  'use strict';

  var NOM = 'Beacon';
  var W = window;
  var C = console;
  // C.debug(NOM, 'loaded');

  var API;
  var DF = {
    labelAs: 'interaction',
    nom: NOM,
    googId: 'UA-5483042-1',
    googUrl: 'https://www.google-analytics.com/analytics.js',
    waitFor: 15,
    watchFor: 'mousemove', // multiple events fail
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS (no dependancies)

  function _Isogram(i, s, o, g, r, a, m) { // from google
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || new Array()).push(arguments);
    };
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  }

  function _Throttle(func, wait) { // from lodash
    function _now() { // unix time
      return (1 * new Date());
    }
    var args, result, thisArg;
    var previous = _now();
    var timeoutId = null;

    function trailingCall() {
      previous = _now();
      timeoutId = null;
      result = func.apply(thisArg, args);
    }
    return (function () {
      var now = _now();
      var elapsed = now - previous;
      var remaining = wait - elapsed;

      args = arguments;
      thisArg = this;

      if (remaining <= 0) { // past wait period
        W.clearTimeout(timeoutId);
        timeoutId = null;
        previous = now;
        result = func.apply(thisArg, args);
      } else if (!timeoutId) {
        timeoutId = W.setTimeout(trailingCall, remaining);
      }
      return result;
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE (top dependancies only)

  function _dump(msg, etc) {
    C.info(NOM, '(dump)', msg, etc);
  }

  function _handlePacket() {
    (W.ga || _dump).apply('', arguments);
  }

  function _pulse(self) { // logging (possibly sending)
    C.log(self.nom, W.ga ? 'running' : 'debugging', self);

    return _Throttle(function () {
      self.sendBeacon();
    }, self.waitFor * 1000);
  }

  // - - - - - - - - - - - - - - - - - -
  // EXPOSE (interface prototype)

  API = {
    _: NOM,
    makePacket: function () {
      return {
        eventAction: NOM + ':' + this.watchFor,
        eventCategory: this.nom,
        eventLabel: this.labelAs,
        eventValue: this.waitFor, // seconds > 0
        hitType: 'event',
      };
    },
    sendBeacon: function () {
      _handlePacket('send', this.makePacket());
    },
    init: function (sec, nom) {
      this.waitFor = sec || DF.waitFor;
      this.nom = nom || DF.nom;

      if (!W.ga && W._dbug < 1) { // load analytics?
        _Isogram(W, W.document, 'script', this.googUrl, 'ga');
        ga('create', this.googId, 'auto');
        ga('send', 'pageview');
      }
      W.document.addEventListener(this.watchFor, _pulse(this));
    },
  };

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function Beacon(sec, nom) {
    this.constructor = Beacon;
    this.googId = DF.googId;
    this.googUrl = DF.googUrl;
    this.labelAs = DF.labelAs;
    this.watchFor = DF.watchFor;
    this.init(sec, nom);
    delete this.init; // prevent reinit
  }

  Beacon.prototype = API;

  return Beacon;
});

/*



 */
