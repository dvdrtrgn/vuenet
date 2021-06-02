/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-07-10
  IDEA    api for manipulating lightbox
  NOTE    singleton, ada enhanced
  TODO    simplify

 */
define(['jqxtn'], function ($) {
  // window.Modal = (function ($) { // uncomment and trim preceding lines for stand-alone
  'use strict';

  var NOM = 'Modal';
  var W = window;
  var C = W.console;
  // C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var API = {
    cleaners: $.Callbacks(),
    closer: null,
    current: null,
    trigger: null,
    submodal: null,
  };
  var DF = {
    begin: '<span class=ada tabindex=0>Beginning of dialog content</span>',
    closer: '<a class="closer noprint" href aria-label="Close dialog"><i class="ada">X</i></a>',
    closers: '.closer, .cancel', // all "closers"
    finish: '<span class=ada tabindex=0>End of dialog content</span>',
    trig: $.jqns('click keyup swiperight', NOM),
  };
  var EL = {
    modal: 'body > div.modal, #Modal', // safe guesses
    sibs: '',
    begin: '',
    finish: '',
    watcher: 'body',
  };
  var UTIL = {
    addCloser: function (submodal) {
      if (DF.closer && !UTIL.contains(submodal, '.closer')) {
        $(DF.closer).prependTo(submodal);
      }
      return submodal;
    },
    contains: function (jq, ele) {
      return Boolean(jq.is(ele) || jq.has(ele).length);
    },
    focus: function (bool) {
      bool = bool ? 'closer' : 'trigger';
      try { // loop back or restore focus
        if (API[bool]) {
          API[bool].focus();
          API[bool] = null;
        }
      } catch (err) {
        C.info(NOM, 'No ' + bool + ' to focus upon.', err);
      }
    },
    hideSiblings: function (bool) {
      if (bool) {
        $('html').css('overflow', 'hidden'); // stopScroll
        EL.sibs.attr('aria-hidden', true).addClass('noprint');
      } else {
        $('html').css('overflow', ''); // startScroll
        EL.sibs.attr('aria-hidden', null).removeClass('noprint');
      }
    },
    reify: $.reify || function (x, y) { // jq-reify props w/selector vals
      $.each(x, function (i, e) {
        x[i] = $(e);
      });
      return y ? $.extend(y, x) : x; // extend optional host
    },
    outsideModal: function (ele) {
      return !EL.modal.has(ele).length;
    },
  };

  function focusOn() {
    UTIL.focus(true);
  }

  function focusOff() {
    UTIL.focus(false);
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function trySetup(setup, data) {
    var cancel;
    try {
      if (data === API.current) {
        // C.warn('already up');
        cancel = true;
      }
      else if (setup && setup(data) === false) {
        // C.warn('setup returns explicit false');
        cancel = true;
      }
    } catch (err) {
      C.error(NOM, 'trySetup', err);
    }
    return !cancel;
  }

  function show(ele) {
    ele = $(ele);
    API.submodal = ele;
    UTIL.addCloser(ele);
    UTIL.hideSiblings(true);

    // activate container, hide kids, feature one
    EL.modal.css('left', 0) //
      .addClass('active') //
      .find('> div').hide();

    if (ele.length) {
      ele.fadeIn(function () {
        API.closer = ele.find('.closer').first();
        $.delay(focusOn, 333);
      });
    }
    return API;
  }

  function hide() {
    UTIL.hideSiblings(false);

    // deactivate container and do whatever cleaning
    EL.modal.css({
      left: '100%',
    });

    if (EL.modal.is('.active')) { // prevent cleaners loop
      EL.modal.removeClass('active');
      API.cleaners.fire(API.current);
      API.current = null;
    }
    $.delay(focusOff, 333);

    return API;
  }

  function handleEvent(evt, data, setup) {
    if (UTIL.outsideModal(evt.target)) {
      API.trigger = data.triggers; // remember departure point
    }
    if (evt.keyCode === undefined || evt.key === 'Enter') {
      if (!data.hash()) {
        evt.preventDefault(); // do not trigger whole links
      }
    } else if (evt.key !== 'Spacebar') {
      return; // allow for spacebar open
    }
    if (trySetup(setup, data)) {
      show(data.submodal);
      API.current = data;
    }
  }

  function makeData(triggers, submodal) {
    var data = { // for backward compat
      source: $(triggers),
      target: $(submodal),
    };
    return Object.assign(Object.create(data), {
      triggers: data.source,
      submodal: data.target,
      href: function () {
        return this.triggers.attr('href') || '';
      },
      hash: function () {
        var frag = this.href().charAt(0) === '#';
        return frag ? this.href() : false;
      },
    });
  }

  function bindLink(triggers, submodal, setup, cleanup) {
    if (typeof API.init === 'function') {
      C.info(NOM, 'internal init', API.init());
    }
    var data = makeData(triggers, submodal);

    API.cleaners.add(cleanup);

    // recurse or reject?
    if (data.triggers.length > 1) {
      return data.triggers.each(function (i, e) {
        bindLink(e, submodal, setup); // do not double cleanups
      });
    } else if (data.triggers.data(NOM)) {
      throw new Error(NOM + ' bound already');
    }

    data.triggers.on(DF.trig, function (evt) {
      handleEvent(evt, data, setup);
    }).data(NOM, data);

    // C.info(NOM, 'bindLink', data);
    return data;
  }

  function addCleaner(cb) {
    API.cleaners.add(cb);
  }

  function filterClosers(evt) {
    var ele = $(evt.target);
    var xer = ele.is(EL.modal) || ele.is(DF.closers);

    if (xer && $.isAffirmative(evt, DF.trig)) {
      evt.preventDefault(); // do change hash
      hide();
    }
  }

  function init(sel) { // to pre-emptively spec the modal div
    EL.modal = (sel || EL.modal);

    UTIL.reify(EL);
    EL.sibs = EL.modal.siblings();
    EL.begin = $(DF.begin).prependTo(EL.modal).on('focus', hide);
    EL.finish = $(DF.finish).appendTo(EL.modal).on('focus', focusOn);

    // bind container actions to .hide
    EL.modal.on(DF.trig, filterClosers);
    EL.watcher.on('keydown', function (evt) {
      if (evt.key === 'Escape') hide();
    });

    API.init = 'INITED';
    return API;
  }

  // - - - - - - - - - - - - - - - - - -
  // DELEGATE (for looser coupling)

  $.subscribe(NOM + ':show', function (evt, ele) {
    API.show(ele);
  });
  $.subscribe(NOM + ':hide', function () {
    API.hide();
  });

  $.extend(API, {
    DF: DF,
    EL: EL,
    UTIL: UTIL,
    init: init,
    //
    addCleaner: addCleaner,
    bindLinkTo: bindLink,
    bind: bindLink,
    hide: hide,
    show: show,
  });

  return API;
  // }(jQuery)); // uncomment and trim remaining lines for stand-alone
});

/*



 */
