/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-11-07
  IDEA    Wire up "pixel" and "click tag" code
  NOTE    Extract ids from messy spreadsheet
          * include in <body>
          * customize <TAG-DEFS>
  TODO    Solicit feedback

 */
(function (root, factory) {
  'use strict';
  var OLD = !(root.define && define.amd);
  if (OLD) root.Trackers = factory(root.DomTool);
  else define(['jqxtn'], factory);
}(this, function (DOM) {
  'use strict';

  var NOM = 'Trackers';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  //<TAG-DEFS
  var DF = {
    facebook: {},
    floodlight: {}, // requires 'prop_id'
    linkedin: {}, // requires 'prop_id'
    pinterest: {},
  };
  ///TAG-DEFS>

  var API;
  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function _lookup(tag, nom) { // look up tags association
    if (!API.inited) {
      throw 'Initialize first: ' + NOM + '.init(TAGS)';
    }
    return DF[tag] && DF[tag][nom];
  }

  function _mountele(str) {
    DOM('body').append(str);
  }

  // - - - - - - - - - - - - - - - - - -
  // TRACKERS

  function facebook(str) {
    if (W.fbq && str) W.fbq('track', str);
  }

  function linkedin(conversionId) {
    var pid = DF.linkedin.prop_id;
    var ele = '<img src="https://dc.ads.linkedin.com/collect/' +
      '?pid=' + pid + '&conversionId=' + conversionId + '&fmt=gif' +
      '" width="1" height="1" style="display:none;" alt="" style="display:none">';

    _mountele(ele);
  }

  function floodlight(cat) {
    var type = DF.floodlight.prop_id;
    var axel = Math.random() + ''; // per floodlight docs
    var ord = axel * 10000000000000; // per floodlight docs
    var ele = '<iframe src="https://2549153.fls.doubleclick.net/activityi;src=2549153' +
      ';type=' + type + ';cat=' + cat + ';ord=' + ord +
      ';u1=;u2=;u3=;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=' +
      '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';

    _mountele(ele);
  }

  function pinterest(str) {
    if (W.pintrk && str) {
      if (str === 'page') W.pintrk('page');
      else W.pintrk('track', str);
    }
  }

  function tryAll(evt, key) {
    key = key || evt; // if calling directly (non-event usage)

    var ids = {
      fb: _lookup('facebook', key),
      fl: _lookup('floodlight', key),
      li: _lookup('linkedin', key),
      pn: _lookup('pinterest', key),
    };

    if (W._dbug > 0) {
      C.warn(NOM, 'tryAll', key, ids);
    } else {
      if (ids.fb) facebook(ids.fb);
      if (ids.fl) floodlight(ids.fl);
      if (ids.li) linkedin(ids.li);
      if (ids.pn) pinterest(ids.pn);
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function init(tags) {
    if (API.inited) return API;

    tags = (tags || W.TAGS);

    if (tags) {
      DOM.extend(API.DF, tags);
      C.log(API.DF);

      // W.pintrk('load', API.DF.pinterest.prop_id); // why assume pintrk?
      // W.fbq('init', API.DF.facebook.prop_id); // why assume fbq?

      if (DOM.subscribe) DOM.subscribe(NOM, API.send_all);

      API.inited = true;
      return API;
    }
  }

  API = {
    _: NOM,
    $: DOM,
    DF: DF,
    init: init,
    send_all: tryAll,
    send_facebook: facebook,
    send_floodlight: floodlight,
    send_linkedin: linkedin,
    send_pinterest: pinterest,
  };

  W.setTimeout(API.init, 3333); // try auto init after load
  return API;
}));

/*



 */
