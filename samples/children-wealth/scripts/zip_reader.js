/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-19
  IDEA    Read state and city from zipcode
  NOTE    z
  TODO    z

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Device';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    trig: $.jqns('click keyup', NOM),
    endpoint: 'https://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?',
    err: 'Not found',
  };
  var EL = {
    body: 'body',
    state: '#stateName',
    zip: '#zipCode',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
  };

  // - - - - - - - - - - - - - - - - - -
  // EXTEND


  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  function makeMap(response) {
    var obj = response.length && response[0];

    return obj ? {
      ST: obj.adminCode1,
      State: obj.adminName1,
      County: obj.adminName2,
      City: obj.placeName,
      zipcode: obj.postalcode,
      _: response,
    } : obj;
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function bindZip(sel, cb) {
    var ele = $(sel);

    ele.blur(function () {
      var code = ele.val() || 0;

      $.getJSON(DF.endpoint, {
        postalcode: code,
      }, function (response) {
        var map = makeMap(response.postalcodes);

        C.warn('bindZip: ' + code || '?', map);
        if (!map) return ele.val(DF.err);

        if (typeof cb === 'function') cb(map);
      });
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    $.reify(EL);

    bindZip(EL.zip, function (obj) {
      var test = EL.zip.val() || DF.err;

      if (!obj.ST || test === DF.err) return;

      EL.state.focus().val(obj.ST).blur();
    });
  }

  function init() {
    bind();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    init: init,
  });

  $(init);

  return API;
});

/*



 */
