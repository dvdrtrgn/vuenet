/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-26
  IDEA    Help display the device simulation
  NOTE    make methods for triggering fancy stuff
  TODO    ...

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
    days: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
    texts: [
      ['Uh...', 'Can we talk about it?'],
      ['We’ll talk about it later.', 'Um, OK.'],
      ['Let’s have a family meeting.', 'Sounds good'],
    ],
    time: 999,
  };
  var EL = {
    body: 'body',
    main: '#Device',
    bubs: '#Device .bubble',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
  };
  var Q = [];

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  // $.rollTo = function (id, cb) {};

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  // function updateTimestamp() {
  //   var now = new Date();
  //   var day = '<b>' + DF.days[now.getDay()] + '</b> ';
  //   var hrs = now.getHours();
  //   var min = now.getMinutes();
  //   var str = (hrs < 12) ? 'AM' : 'PM';
  //
  //   hrs = (hrs % 12) || 12;
  //   min = (min < 10) ? '0' + min : min;
  //   str = [day, (hrs + ':' + min), str].join(' ');
  //
  //   EL.main.find('.date').html(str).fadeIn();
  // }

  function isEven(num) {
    return Boolean(num % 2 - 1);
  }

  function sequenceReplies(i, e) {
    if (!i) return;
    var ele = $(e).hide();

    if (isEven(i)) {
      Q.push(function () {
        ele.addClass('pulse').fadeIn();
      });
    }

    Q.push(function () {
      ele.removeClass('pulse').fadeIn();
    });

    C.log('sequenceReplies', i, e);
  }

  function runScenes() {
    Q.forEach(function (fun, idx) {
      setTimeout(fun, idx * DF.time);
    });
    Q.length = 0; // clear scenes
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function togglePulse(evt) {
    evt.stopPropagation();
    $(evt.currentTarget).toggleClass('pulse');
  }

  function toggleSkew(evt) {
    $(evt.currentTarget).toggleClass('skew');
  }

  function playBubbles(dat) {

    EL.bubs.each(sequenceReplies)
      .not('.blue')
      .on('dblclick', togglePulse);

    Q.push(function () {
      $.publish('Texting:choice', dat);
    });

    runScenes();
  }

  function initBubbles() {
    var bub = EL.bubs.hide().first().show();

    // updateTimestamp(); // $.rollTo('#Device');
    Q.push(function () {
      bub.addClass('pulse');
    });
    Q.push(function () {
      bub.removeClass('pulse').fadeIn();
    });

    runScenes();
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function loadChats(texts) {
    C.warn(NOM, 'loadChats', texts);

    EL.main.find('.text2 span').html(texts[0]);
    EL.main.find('.text3 span').html(texts[1]);
  }

  function play(evt, num) {
    num = num || 0;
    var texts = DF.texts[num - 1];

    if (num) {
      loadChats(texts);
      playBubbles(num);
    }
  }

  function bind() {
    $.reify(EL);

    // updateTimestamp();
    setTimeout(initBubbles, DF.time);

    EL.main.on('dblclick', toggleSkew);

    $.subscribe(NOM + ':play', play);
    $.subscribe(NOM + ':init', initBubbles);
  }

  function init() {
    bind();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    init: init,
    initBubbles: initBubbles,
    playBubbles: playBubbles,
    togglePulse: togglePulse,
  });

  $(init);

  return API;
});

/*



 */
