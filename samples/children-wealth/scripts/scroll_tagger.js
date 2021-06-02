/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-04-03
  IDEA    React to progress down the page
  NOTE    left overs from a more navigational project
  TODO    .

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Tag';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // require(['smag_gs']);
  // - - - - - - - - - - - - - - - - - -
  var SM = window.ScrollMagic;
  if (!SM) {
    return 'no ScrollMagic';
  }
  var Con = new SM.Controller();
  // - - - - - - - - - - - - - - - - - -

  var DF = {
    trig: $.jqns('click keyup', NOM),
  };
  var EL = {
    html: 'html',
    menu: 'nav .desktopOnly .menu',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
    Con: Con,
    SM: SM,
  };

  // - - - - - - - - - - - - - - - - - -
  // INTERNAL

  function id_forge(ele) { // in case an element does not have one
    var self = id_forge;
    self.num = self.num || 1;

    if (!ele) throw 'No element!';
    if (!ele.id) ele.id = ('ID_' + self.num++);

    return ele.id;
  }

  function showProgress(id, enter) {
    var area = $('#' + id);
    var link = EL.menu.find('[href="#' + id + '"]');
    var mark = enter ? 'addClass' : 'removeClass';

    // mark section and navlink
    area.add(link)[mark]('shown');

    if (enter) {
      $.publish('Stats.scrollView', id);
    }
  }

  function _markWhenShown(i, e) {
    var id = id_forge(e);
    var scene = new SM.Scene({
      triggerElement: e,
      triggerHook: 0.5,
    });

    scene.on('enter leave', function (evt) {
      // other events: change, progress, start, end, update
      if (evt.type === 'enter') showProgress(id, true);
      if (evt.type === 'leave') showProgress(id, false);
    });
    Con.addScene(scene);
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function bindStickyNav() {
    // when splash is half gone, prep sticky nav to show
    var scene = new SM.Scene({
      triggerElement: '.scrollDown',
    });
    scene.setClassToggle('nav.top', 'sticking');
    Con.addScene(scene);

    // when splash is all gone, show sticky nav
    scene = new SM.Scene({
      triggerElement: '.scrollDown',
      triggerHook: 0,
    });
    scene.setClassToggle('nav.top', 'showing');
    Con.addScene(scene);
  }

  function bind() {
    $.reify(EL);

    bindStickyNav();

    $('section').each(_markWhenShown);
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function init() {
    bind();

    API.init = 'INITED';

    return API;
  }

  $.extend(API, {
    //
    init: init,
  });

  return API;
});

/*



 */
