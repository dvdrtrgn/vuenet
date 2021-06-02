/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-15
  IDEA    extend jquery
  NOTE    keep to cross-project basics
  TODO    deprecate stretchTo and unstretch

 */
define(['jquery', 'lodash'], function ($, _) {
  'use strict';

  var NOM = 'jq-xtn';
  var W = window;
  var C = W.console;
  var $W = $(W);
  // C.debug(NOM, 'loaded');

  $.debounce = _.debounce; // co-opt from lodash
  $.throttle = _.throttle; // co-opt from lodash

  $.delay = function $delay(fn, ms) {
    W.setTimeout(fn, ms || 33);
  };

  $.setLimit = function $setLimit(fn, ms) {
    var self = $.setLimit;
    ms = (ms || 333) + Math.random();

    self[ms] = function () { // festoon function with methods named by ms
      W.clearTimeout(self[ms].token); // new calls always reset the clock
      self[ms].token = W.setTimeout(fn, ms); // store current timeout key
    };
    return self[ms];
  };

  // - - - - - - - - - - - - - - - - - -
  // ARTIFICIAL EVENTS

  $W.on('resize', $.debounce(function () {
    $W.trigger('resizeend');
  }, 99));

  $W.on('scroll', $.debounce(function () {
    $W.trigger('scrollend');
  }, 33));

  // - - - - - - - - - - - - - - - - - -
  // AUTOMATE

  $.reify = function (obj) { // replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  };

  // - - - - - - - - - - - - - - - - - -
  // PUBSUBS

  var Q = $.pubsubs = $({});

  $.publish = function () { // o.trigger.bind(o)
    Q.trigger.apply(Q, arguments);
  };
  $.subscribe = function () { // o.on.bind(o)
    Q.on.apply(Q, arguments);
  };
  $.unsubscribe = function () { // o.off.bind(o)
    Q.off.apply(Q, arguments);
  };
  $.fn.mediate = function (event, limit, topic) {
    return this.on(event, $.debounce(function (evt) {
      $.publish(topic, evt);
    }, limit));
  };

  // NEW
  // add namespace to event names
  $.isAffirmative = function (evt, trig) {
    trig = trig || 'click keyup'; // keypress 'return' will not fire on msie
    if (evt.type.slice(0, 3) === 'key') {
      return evt.which === 13; // no evt.key for safari < 10.1
    } else if (trig.indexOf(evt.type > -1)) {
      return true; // click probably
    }
  };

  $.jqns = function (evs, ns) {
    var arr = (evs || '').split(' ');

    arr = arr.map(function (str) {
      return str + '.' + ns;
    });

    return arr.join(' ');
  };

  $.fn.activate = function (bool) {
    var ele = $(this);
    if (bool) {
      ele.removeClass('inactive');
    } else {
      ele.addClass('inactive');
    }
  };

  $.newRapidQue = function (nom) {
    var que = [];
    nom = '$.' + (nom || 'newRapidQue') + ':';
    // log an event blitz as a list of contexts
    return function Qfn(evt) {
      $.delay(function () { // lamda form was killing msie
        if (que.length) Qfn(evt.type);
      });
      if (evt instanceof $.Event) return que.push(this);
      C.info(NOM, nom, evt, que.splice(-que.length));
    };
  };

  $.adaDebug = function () {
    $('body').on('focusin', '*', $.newRapidQue('adaDebug'));
    C.warn(NOM, '$.adaDebug running');
  };

  // - - - - - - - - - - - - - - - - - -
  // WATCHERS

  $.watchHash = function (cb) {
    cb = cb || $.noop; // do not invoke
    function trackHash() {
      var self = trackHash;
      var hash = W.location.hash.slice(1);
      var prev = self.previous;

      if (prev !== hash) {
        $('html').removeClass(prev).addClass(hash);
        self.previous = hash;
      }
      try {
        cb(hash, prev);
      } catch (err) {
        C.error(err);
      }
      return self;
    }
    $W.on('hashchange', trackHash());
  };

  $.watchInputDevice = function () {
    var body = $('body');
    body.on('keydown', $.debounce(function () {
      body.removeClass('mouse').addClass('keyboard');
    }, 333)).on('mouseover', function () { // `mousemove` has side effects on windows browsers
      body.removeClass('keyboard').addClass('mouse');
    });
  };

  $.watchResize = function (fn, ns) {
    ns = 'resize.' + (ns || 'Util');
    $W.off(ns);
    if (fn) {
      fn();
      $W.on(ns, fn);
    }
  };

  $.watchScroll = function (cb, ms) { // callback with vscroll pos (current, previous)
    var body = $(document);
    var slug = 'jq-xtn:watchScroll';
    var last = body.scrollTop();

    cb = cb || function (a, z) {
      C.log(slug, a, '<<<', z);
    };

    body.on('scroll', $.throttle(function () {
      var next = body.scrollTop();
      try {
        cb(next, last);
      } catch (err) {
        C.error(slug, err, cb);
      }
      last = next;
    }, ms || 33));
  };

  // - - - - - - - - - - - - - - - - - -
  // ETC

  $.swallowBackspace = function () {
    $(W.document).on('keydown', function (evt) {
      var ele = $(evt.target || evt.srcElement);
      if (evt.keyCode === 8 && !ele.is('input,[contenteditable="true"],textarea')) {
        evt.preventDefault();
      }
    });
  };

  $.markAgent = function () {
    var ua = W.navigator.userAgent;

    $.watchResize(function () {
      if (ua.match(/mobi/i) || $W.width() < 768) {
        // simulate
        $('html').addClass('mobi');
      } else {
        $('html').removeClass('mobi');
      }
      if (ua.match(/chrome/i)) {
        $('html').addClass('chrome');
      } else if (ua.match(/safari/i)) {
        $('html').addClass('safari');
      } else if (ua.match(/firefox/i)) {
        $('html').addClass('firefox');
      } else if (ua.match(/trident/i)) {
        $('html').addClass('trident');
      }
    }, 'markAgent');
  };

  $.altTitles = function () {
    $('*').each(function () {
      var me = $(this);
      me.attr('title', me.attr('alt'));
    });
  };

  $.fn.constantEvent = function (evn1, evn2, fn, ms) {

    return this.each(function () {
      var me = $(this);
      var time;

      me.on(evn1, function () {
        if (!time) {
          time = W.setInterval(fn, ms || 33);
        }
      }).on(evn2, function () {
        W.clearInterval(time);
        time = null;
      });

      return function () {
        W.clearInterval(time);
      };
    });

  };

  $.fn.readwidths = function (num) {
    var str;

    if (typeof num === 'string') {
      if (num === 'equal') {
        str = 100 / this.length + '%';
      } else if (num === 'overflo') {
        str = 100 / (this.length - 1) + '%';
      } else if (num === 'initial') {
        str = 'initial';
      }
    }

    return this.each(function () {
      var me = $(this);
      var dd = me.data();

      me.css({
        width: str || dd['width' + num],
      });
    });
  };

  $.pubEscape = function () {
    $W.on('keyup', function (evt) {
      if (evt.keyCode === 27) {
        $.publish('escape.Key');
      }
    });
  };

  $.fn.inlineSvg = function (cb) {
    var $img = $(this);
    var $svg, size;

    size = { // force msie to respect size
      height: $img.css('height'),
      width: $img.css('width'),
    };

    $.get($img.attr('src'), 'xml').done(
      function (data) {
        $svg = $(data).find('svg').attr({
          id: $img.attr('id'),
          alt: $img.attr('alt'),
          class: $img.attr('class'),
          style: ($img.attr('style') || '').replace('color', 'fill'),
          focusable: $img.attr('focusable'), // for msie 11
          'xmlns:a': null, // for validator.w3.org
        });
        // svg scales if the viewport is set
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        }
        if ($img.attr('height') || $img.attr('width')) {
          $svg.css(size);
        }
        // hide but keep original image
        $img.hide().wrap('<span class="replaced-svg">');
        $svg.insertBefore($img).css('visibility', 'visible');
      }
    ).fail(C.warn).always(cb);
  };

  $.inlineSvgs = function (cb) {
    var limit = $.setLimit(cb, 321); // try cb until the last one loads

    $('img.svg').each(function () {
      $(this).inlineSvg(limit);
    }).removeClass('svg'); // make sure they do not get matched again
  };

  $.fn.fixate = function () { // allow "fixed" elements to take space initially
    var me = $(this);

    $W.on('resize', function () {
      // un-fix
      me.css('position', 'relative');
      me.next().css('marginTop', 0);
      // re-fix
      me.css('position', 'fixed');
      me.next().css('marginTop', me.height());
    }).trigger('resize');

    return this;
  };

  $.fn.finishLoading = function () { // removes spinner and fixes fixed elements
    var me = $(this).removeClass('loading');
    var delay = 1e3;

    me.addClass('loaded'); // for duration of delay
    W.setTimeout(function () {
      me.removeClass('loaded');
      me.find('.fixate').each($.fn.fixate);
    }, delay);

    return this;
  };

  $.fn.tabbable = function (bool) {
    bool = (bool !== false) ? 0 : undefined; // 0 means make focusable!
    return this.each(function () {
      $(this).attr('tabindex', bool);
    });
  };

  // - - - - - - - - - - - - - - - - - -
  // NB: DEPRECATED

  $.fn.stretchTo = function (wid) {
    C.error('DEPRECATE $.fn.stretchTo');
    wid = (typeof wid === 'string' ? wid : 0);
    return this.each(function () {
      var me = $(this);
      var dd = me.data();
      me.memwidth().css({
        display: 'inline-block',
        width: dd.memwidth, // explicitly set width
      }).stop().animate({
        width: wid,
      }, 333, function () {
        me.addClass('stretch').css({
          display: wid ? '' : 'none',
        });
      });
    });
  };

  $.fn.unstretch = function () {
    C.error('DEPRECATE $.fn.unstretch');
    return this.each(function () {
      var me = $(this);
      var dd = me.data();
      me.css({
        display: 'inline-block',
      }).stop().animate({
        width: dd.memwidth,
      }, 333, function () {
        me.removeClass('stretch') //
          .css({
            display: '',
            width: dd.memwidth,
          });
      });
    });
  };

  return $;
});

/*



 */
