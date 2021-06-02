/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-26
  IDEA    Animate and fancify elements as whims are presented
  NOTE    mostly unused after thrill wears off
  TODO    .

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Flow';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // require(['smag_gs']);
  // - - - - - - - - - - - - - - - - - -
  var SM = W.ScrollMagic;
  var GS = W.GreenSockGlobals;
  if (!GS) {
    return 'no GreenSock';
  }
  var TL = GS.TimelineLite;
  var TM = GS.TweenMax;
  // - - - - - - - - - - - - - - - - - -

  var API = {
    init: null,
    _: NOM,
    GS: GS,
    SM: SM,
    TM: TM,
  };
  var DF = {
    hook: 1,
    time: 0.25,
    trig: $.jqns('click keyup', NOM),
    fade: {
      opacity: 0,
    },
    float: {
      opacity: 0,
      y: 100,
    },
    norm: {
      opacity: 1,
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
    },
  };
  var EL = {
    html: 'html',
  };

  var Con = new SM.Controller();

  // - - - - - - - - - - - - - - - - - -
  // INTERNAL

  function _hook(scene, tween) {
    _hook.idx = (_hook.idx || 0);
    var ele = scene.triggerElement();

    if (W._dbug > 2) scene.addIndicators({
      indent: 55 * (_hook.idx++ % 5),
      name: (ele.id || ele.className || ele.tagName), //_hook.idx,
      parent: 'body', //'.deferred-styles',
    });

    scene.setTween(tween).addTo(Con);

    // C.log('_hook', [ele, scene, tween]);
    return scene;
  }

  function _makeScene(ele, hook, rev) {
    // C.log('_makeScene', [ele, ele[0], ele.getTrigger()]);
    return new SM.Scene({
      reverse: rev,
      triggerElement: ele.getTrigger(),
      triggerHook: hook || DF.hook,
    });
  }

  function _makeTween(ele, time, fr, tl, ease) {
    var make = (tl && tl.add) ? tl : TM;
    var to = $.extend({ease: ease}, DF.norm);
    return make.fromTo(ele, time || DF.time, fr, to);
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  // function countUp(div, tl) {
  //   var ele = $(div);
  //   var data = {
  //     value: 0,
  //     view: ele.get(0),
  //   };
  //   var to = {
  //     ease: GS.Linear.easeNone,
  //     roundProps: 'value',
  //     value: 94,
  //     onUpdate: ele.perUpdate(data),
  //   };
  //
  //   var tween = tl.to(data, 1, to);
  //   var scene = new SM.Scene({
  //     reverse: false,
  //     triggerElement: div,
  //     triggerHook: DF.hook,
  //   });
  //
  //   to.onUpdate(); // initialize
  //
  //   return _hook(scene, tween);
  // }

  function justWait(sec, tl) {
    _makeTween( // TODO name parameters
      '',
      sec || 1,
      DF.norm,
      (tl && tl.add) ? tl : TM
    );
  }

  function makeroom(sel1, sel2) {
    var tween = TM.fromTo(sel1, DF.time, {
      opacity: 1,
      top: 0,
    }, {
      opacity: 0,
      top: -11,
    });
    var scene = new SM.Scene({
      triggerElement: sel2,
      triggerHook: 'onLeave',
    });

    return _hook(scene, tween);
  }

  function sweeten(sel, hook, fr, tl, time, rev) {
    fr = $.extend({}, fr);

    var ele = $(sel);
    var ease, tween, scene;

    if (!ele.length) return;

    tween = _makeTween(sel, time, fr, tl, ease); // null == def time
    scene = _makeScene(ele, hook, rev);

    return _hook(scene, tween);
  }

  function bindDevice() {
    var header = $('.header');
    var scene = makeroom('.header .wf', 'main');

    scene.on('enter leave', function (evt) {
      // other events: change, progress, start, end, update
      if (evt.type === 'enter') {
        // C.log('hide wf', [evt, this]); // $.publish('Device:init');
        header.addClass('collapse');
      } else {
        // C.log('show wf', [evt, this]); // $.publish('Texting:choice');
        header.removeClass('collapse');
      }
    });
  }

  function bindChooser() {
    var tl = new TL();

    justWait(2, tl);

    sweeten('#Choose',        null, DF.float, tl, 0.5);
    sweeten('#Choose .text1', null, DF.fade,  tl);
    sweeten('#Choose .text2', null, DF.fade,  tl);
    sweeten('#Choose .text3', null, DF.fade,  tl);
  }

  // function bindModule() {
  //   var tl = new TL();
  //
  //   sweeten('.sweeten1', 0.8, DF.float, tl);
  //   countUp('.sweeten2 .figure', tl);
  //   sweeten('.sweeten3', 0.8, DF.fade,  tl);
  //   sweeten('.sweeten4', 0.8, DF.fade,  tl);
  // }

  function bind() {
    $.reify(EL);

    bindDevice();
    bindChooser();
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function init() {
    bind();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    DF: DF,
    EL: EL,
    //
    Con: Con,
    init: init,
  });

  return API;
});

/*



 */
