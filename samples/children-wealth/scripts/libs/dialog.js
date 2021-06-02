/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-15
  IDEA    api for offsite-interstitial in ada compliant modal
  NOTE    singleton, programatically sets pending link targets based on class
  TODO    ???

 */
define(['jqxtn', 'modal'], function ($, Modal) {
  // window.Dialog = (function ($) { // uncomment and trim preceding lines for stand-alone
  'use strict';

  var NOM = 'Dialog';
  // var W = window;
  // var C = console;
  // C.debug(NOM, 'loaded');

  var API = {
    init: null,
    bind: null,
    defaults: null,
    _: NOM,
    Modal: Modal,
  };
  var DF = { // defaults
    lookfor: '.external, .external-link, [target=external]',
    newtab: false, // force new tab when no target is set
    wellsbox: '.modal .offsite.dialog',
    gobutton: '.utilitybtn',
    pending: '.externalize',
    trig: $.jqns('click keyup', NOM),
  };

  function initLinks() {
    var lns = $(DF.pending).filter('a');
    // retarget any non-wrapper links
    lns.has('*').addClass('external');
    lns.not(':has(*)').attr('target', 'external');

    $(DF.lookfor).attr('rel', 'noopener');
    return API;
  }

  function bindDialog(sel, conf) { // offsite dialog
    var cf = $.extend({}, DF, conf);
    var dialog = $(cf.wellsbox); // thing to show
    var triggers = $(sel || cf.lookfor); // intercept these

    Modal.bind(triggers, dialog, function (data) {
      // data is passed from Modal
      var btn = dialog.find(cf.gobutton); // find the go button
      var src = data.source[0];

      if (cf.newtab || src.target) {
        btn.attr('target', src.target || '_blank'); // transfer target
      }
      btn.attr({
        href: src.href, // transfer url
        rel: 'noopener', // ensure opener is null
      });
      btn.on(DF.trig, function (evt) {
        if ($.isAffirmative(evt, DF.trig)) Modal.hide();
      });
    });

    return API;
  }

  $.extend(API, {
    bind: bindDialog,
    init: initLinks,
    defaults: function (obj) {
      $.extend(DF, obj);
    },
  });

  return API;
  // }(jQuery)); // uncomment and trim remaining lines for stand-alone
});

/*



 */
