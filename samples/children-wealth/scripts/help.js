/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-23
  IDEA    Declutter main -- bind work in progress
  NOTE    Weigh-station on way to discrete modules
  TODO    deprecate unused

 */
define(['jquery', 'fielder'], function ($, Fielder) {
  'use strict';

  var NOM = 'Help';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    pick: 'gated',
    trig: $.jqns('click keyup', NOM),
  };
  var EL = {
    body: 'body',
    page: 'html,body',
    opts: '',
    note: '.note',
    gated: '.gated',
    nongated: '.nongated',
    requested: '.requested',
    requesting: '.requesting',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
    Fielder: Fielder,
  };

  var GS = W.GreenSockGlobals;

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  $.rollTo = function (id, cb) {
    var TM = GS.TweenMax;
    C.log('rollTo', id);

    if (!$(id).length) {
      C.warn('No ' + id + ' element to scroll to!');
      return id;
    }

    TM.to(W, 1, {
      scrollTo: {
        autoKill: !cb,
        ease: GS.Power2.easeOut,
        offsetY: 42,
        y: id,
      },
      onComplete: function () {
        if (cb) {
          $.publish('Stats.navButton', id.slice(1));
          cb(id);
        }
      },
    });

    return id;
  };

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  function downloadPDF() {
    setTimeout(function () {
      $('.requested a.button')[0].click();
    }, 999);
  }

  function showVersion(pick) {
    if ('dev' === pick) return EL.opts.show(); // hide nothing

    EL.opts.hide();

    if ('nongated' === pick) {
      EL.nongated.show();
    } //
    else if ('requested' === pick) {
      EL.gated.show();
      EL.requested.show();
      downloadPDF();
    } //
    else if ('gated' === pick) {
      EL.gated.show();
      EL.requesting.show();
    }
  }

  function parseVersion(halt) {
    var pick = W.location.search.slice(1);

    if (W.location.href.match('/theothertalk/')) {
      pick = 'gated';
    }
    if (W.location.href.match('/moneytalk/')) {
      pick = 'nongated';
    }
    pick = pick || DF.pick;

    if (halt !== false) showVersion(pick);

    return pick;
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function animateScroll(sel) {
    $(sel).on(DF.trig, function (evt) {
      if (!$.isAffirmative(evt, DF.trig)) return;

      var href = $.attr(this, 'href');
      EL.body.click(); // HACK: force menu to close

      $.rollTo(href, function (id) {
        return $.rollTo(id);
      });

      evt.preventDefault();
      evt.stopImmediatePropagation();
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    $.reify(EL);

    EL.opts = EL.note.add(EL.gated).add(EL.nongated).add(EL.requested).add(EL.requesting);

    animateScroll('a[href^="#"]');

    $('a[href*="/the-private-bank/contact-2"]').on(DF.trig, function (evt) {
      if ($.isAffirmative(evt)) $.publish('Track', 'WIM_YearEnd_ContactUs_ButtonClick');
    });
    $('a[href*="/children-wealth-planning-guide-tpb.pdf"]').on(DF.trig, function (evt) {
      if ($.isAffirmative(evt)) $.publish('Track', 'WIM_YearEnd_DownloadGuide_ButtonClick');
    });

    $.subscribe(NOM + ':showVersion', function (evt, dat) {
      showVersion(dat);
    });
  }

  function init() {
    bind();

    parseVersion();
    Fielder.init();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    get mobile() {
      return !!W.navigator.userAgent.match(/mobi/i);
    },
    //
    init: init,
    parseVersion: parseVersion,
  });

  return API;
});

/*



 */
