/*global define, DEFS, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-05-01
  IDEA    Hook up various sub systems
  NOTE    bind events, store configs
  TODO    document a bit

 */
define([
  'jqxtn', 'lodash', 'help', 'dialog', 'flow', 'modal',
  'scroll_tagger', 'device', 'texting', // 'track', 'stats',
], function ($, _, Help, Dialog, Flow, Modal, Scrotag, Device, Texting) {
  'use strict';

  var NOM = 'Main';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    bust: {},
    page: {},
    site: {
      stattoken: DEFS.site.stattoken, // string id for analytics
    },
    trig: $.jqns('click keypress', NOM),
  };
  var EL = {
    burger: '.burger',
    html: 'html',
    listen: 'button.listen',
    nav: 'nav.top',
    player: 'div.player',
    trans: 'div.transcript',
  };
  var API = {
    init: null,
    version1: false,
    _: NOM,
    DF: DF,
    EL: EL,
    Dialog: Dialog,
    Flow: Flow,
    Help: Help,
    Modal: Modal,
    Scrotag: Scrotag,
    Device: Device,
    Texting: Texting,
    // Stats: Stats,
    // Track: Track,
  };

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  $.rehash = function (str) {
    var L = W.location;
    str = L.origin + L.pathname + (str ? '#' + str : '');
    W.history.replaceState('rehash:' + (L.hash || 'clear'), 1, str);
  };
  $.fn.isnt = function (sel) {
    return !$(this).is(sel);
  };
  $.fn.getTrigger = function () {
    var ele = $(this);
    var trig = ele.closest('svg');

    if (!trig.length) trig = ele.closest('div');
    else trig = trig.parent();

    return trig.get(0);
  };
  $.fn.perUpdate = function (obj) {
    var ele = $(this);
    ele.text('0%');
    return function () {
      var num = (obj.value).toFixed(0);

      ele.html(num + '<sup>%</sup>');
    };
  };

  // - - - - - - - - - - - - - - - - - -
  // ROUTER

  // - - - - - - - - - - - - - - - - - -
  // HELPERS


  // - - - - - - - - - - - - - - - - - -
  // PAGE LOADED

  function loadDeferredStyles() {
    var addStylesNode = $('#DeferredStyles');
    var replacement = $('<div>').addClass('deferred-styles');
    replacement.html(addStylesNode.text());
    $('body').append(replacement);
    addStylesNode.remove();
  }

  function bind() {
    $.reify(EL);
    $.pubEscape();
    $.watchInputDevice();
    // $.adaDebug();

    // $.subscribe('Stats.scrollView', function (evt, str) {
    //   Stats.update('scroll:view To ' + str);
    // });
    // $.subscribe('Stats.navButton', function (evt, str) {
    //   if ('Download' === str) str += ' (Guide)';
    //   Stats.update('nav:button To ' + str);
    // });
  }

  function init() {
    $.extend(true, DF, DEFS);
    bind(); // get the page viewable first
    loadDeferredStyles();

    Help.init();
    Dialog.init().bind(); // auto bind to defaults
    // Track.init(W.TRACK);

    if ($('.scrollDown').length) {
      Scrotag.init();
      $.inlineSvgs(Flow.init);
    }

    API.init = 'INITED';
    EL.html.finishLoading();
    C.info(NOM, 'inited @ ' + W._dbug, API);
    C.timeEnd('Main init took');

    // if (W._dbug > 0) { require(['_tests']); }
    // if (W._dbug < 2) Stats.init(DF.site.stattoken); // per GLP 5/1/2019
    // $.publish('Track', 'WIM_YearEnd_LP_Load');
  }

  $.extend(API, {
    init: init,
    //
  });

  return API;
});

/*



 */
