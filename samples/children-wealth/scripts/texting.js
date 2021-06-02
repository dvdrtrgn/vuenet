/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-08
  IDEA    Help handle texting choices
  NOTE    make methods for triggering fancy stuff
  TODO    all of it

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Texting';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    trig: $.jqns('click keyup', NOM),
    delay: 333,
  };
  var EL = {
    body: 'body',
    main: '.texting',
    answer: '.texting .answer',
    question: '.texting .question',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
  };

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  // $.rollTo = function (id, cb) {};

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  function enableInput(bool) {
    if (bool) {
      EL.main.fadeTo(DF.delay, 1);
      EL.buttons.removeClass('disable');
    } else {
      EL.main.fadeTo(DF.delay, 0.6);
      EL.buttons.addClass('disable');
    }
  }

  function showChoice(num) {
    var msgs = EL.blurbs.filter('.choice');

    msgs.hide().eq(num - 1).show();
  }

  function toggleBlurbs(num) {
    EL.answer.hide();
    EL.question.hide();

    if (num) {
      // $.rollTo('#Choose'); // show a blurb choice
      EL.answer.show();
      EL.main.addClass('wide');

      showChoice(num);
    } else {
      // $.rollTo('#Device'); // reset to questions
      EL.question.show();
      EL.main.removeClass('wide');
    }

    C.log('toggleBlurbs', num);
    enableInput(true);
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function handleChoice(opt) {
    if (opt) {
      $.publish('Device:play', opt);
      enableInput(false);
    } else {
      // reset to initial state
      $.publish('Device:init');
      toggleBlurbs();
    }
  }

  function handleButton(evt) {
    var ele = $(evt.target);

    handleChoice(ele.data('opt'));
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    $.reify(EL);
    EL.buttons = EL.question.find('button');
    EL.blurbs = EL.answer.find('.blurb');

    EL.main.on('click', 'button', handleButton);
    $.subscribe(NOM + ':choice', function (evt, dat) {
      toggleBlurbs(dat);
    });

  }

  function init() {
    bind();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    init: init,
    toggleBlurbs: toggleBlurbs,
  });

  $(init);

  return API;
});

/*



 */
