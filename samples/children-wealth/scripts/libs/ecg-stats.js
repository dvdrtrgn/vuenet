/*global define, ga, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-15
  IDEA    time page interactions
  NOTE    singleton checks or sends updates at interval (def:1.5s)
  TODO    integrate with beacon better

 */
define(['jqxtn', 'lodash', 'beacon',
], function ($, _, Beacon) {
  'use strict';

  var NOM = 'Stats';
  var W = window;
  var C = console;
  // C.debug(NOM, 'loaded');

  var API = {
    init: null,
    update: null,
    _: NOM,
    Beacon: Beacon,
  };
  var DF = {
    controls: 'a, button, .button, :submit, [tabindex]',
    key: 'ECG-Stats',
    thisAction: null,
    lastAction: null,
    time: 1.5,
    trig: $.jqns('click keyup', NOM),
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS (defaults dependancy only)

  function _dump(msg) {
    C.info(NOM, '(dump)', DF.key, msg);
  }

  function _send(msg) {
    if (W.ga && msg) {
      ga('send',
        'event', //         hit type
        DF.key, //          category
        msg, //             action, // [label], // [value],
        {
          'nonInteraction': true,
        } // EvtCf?
      );
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE (top dependancies only)

  function _getActive() { // store once last interaction
    if (DF.thisAction !== DF.lastAction) {
      DF.lastAction = DF.thisAction;
      API.update();
    }
  }

  function _trim(str) {
    // avoid undefined replace + kill linebreaks & extra spaces
    str = (str || '').replace(/&nbsp;|\s+/ig, ' ');
    return $.trim(str.length > 1 ? str : '');
  }

  function _getString(me) { // make up element description
    var str = '';
    str = str || me.find(':header').text();
    str = str || me.attr('title');
    str = str || me.attr('aria-label');
    str = str || me.find('img').attr('alt');
    str = str || me.text();
    str = str || me.attr('href'); // very last resort
    return $.trim(_trim(str));
  }

  function _makeMessage(evt) { // describe event interaction
    evt.stopPropagation(); // only this element
    var me = $(evt.currentTarget);
    var msg = me.data('stat') || '';
    var str = _getString(me);
    var tag = me.prop('tagName').toLowerCase();
    var type = evt.type;

    if (!msg) {
      switch (tag) {
      case 'a':
      case 'button':
        msg = tag + ' ' + str;
        break;
      case 'input':
        msg = ('form ' + me.closest('form').serialize());
        break;
      default:
        msg = tag + ' ' + (str || me.parent().get(0).className);
      }
    }
    if (msg) {
      msg = type + ':' + msg;
    }
    return msg;
  }

  function _bindings() {
    DF.beacon = new Beacon(DF.time * 10, DF.key);

    $('body').on(DF.trig, DF.controls, function (evt) {
      if ($.isAffirmative(evt, DF.trig)) DF.thisAction = _makeMessage(evt);
    });
    W.setInterval(_getActive, DF.time * 100); // record last activity
  }

  // - - - - - - - - - - - - - - - - - -
  // PUBLIC

  function update(msg) {
    msg = msg || DF.lastAction;
    if (msg)(W.ga ? _send : _dump)(msg);
    DF.thisAction = undefined;
  }

  function init(key, sel) {
    if (W._dbug > -1) {
      C.debug('[[init]]', API);
    }
    DF.key = key || DF.key;
    DF.controls = sel || DF.controls;

    _bindings();
    return API;
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  $.extend(API, {
    DF: DF,
    //
    init: _.once(init),
    update: _.debounce(update, DF.time * 1000),
  });

  return API;
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
 *  SYNTAX 1                    // Value     Type     Required   Description
 *  ga('send', 'event',
 *     'category',              // Category  String   Yes        Typically the object that was interacted with (e.g. button)
 *     'action',                // Action    String   Yes        The type of interaction (e.g. click)
 *      'opt_label',            // Label     String   No         Useful for categorizing events (e.g. nav buttons)
 *      'opt_value',            // Value     Number   No         Values must be non-negative. Useful to pass counts (e.g. 4 times)
 *      {'nonInteraction': 1}   // EvtCf?    Field    No         Key/Value pairs define specific field names and values accepted by analytics.js
 *  );
 *
 *  SYNTAX 2 (send by passing a configuration field)
 *  ga('send', {
 *      'hitType': 'event',          // Required.
 *      'eventCategory': 'button',   // Required.
 *      'eventAction': 'click',      // Required.
 *      'eventLabel': 'nav buttons',
 *      'eventValue': 4
 *  });
 *  Read the Field Reference document for a complete list of all the fields that can be used in the configuration field object.
 *  https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 *
 */
