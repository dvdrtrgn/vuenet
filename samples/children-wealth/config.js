/*global require, DEFS */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-04
  NOTE: config and bootstrap
  - extend jquery
  - identify Msie
  - initialize dbug and main
  TODO: keep simple

 */
require.config({
  baseUrl: 'scripts',
  paths: {
    bondo: '../vendors/babel/polyfill.min',
    jquery: '../vendors/jquery/jquery.min',
    lodash: '../vendors/lodash.js/lodash.min',
    vue: '../vendors/vue/vue.min',
    //
    beacon: 'libs/ecg-beacon',
    cookie: 'libs/cookie',
    dialog: 'libs/dialog',
    eloqua: 'libs/eloqua',
    jqxtn: 'libs/jq-xtn',
    modal: 'libs/modal',
    stats: 'libs/ecg-stats',
    //
    jspdf: '../vendors/jspdf/jspdf.min',
    livalid: '../vendors/eloqua/livevalidation.min',
    slick: '../vendors/slick-carousel/slick.min',
    scroll: '../vendors/zenscroll/zenscroll-min', // zengabor.github.io/zenscroll/
    // greensock / scrollmagic
    gsap: '../vendors/gsap/TweenMax.min',
    smag: '../vendors/scrollmagic/ScrollMagic.min',
    smag_db: '../vendors/scrollmagic/plugins/debug.addIndicators.min',
    smag_gs: '../vendors/scrollmagic/plugins/animation.gsap.min',
    // plugins support
    ScrollMagic: '../vendors/scrollmagic/ScrollMagic.min',
    TimelineMax: '../vendors/gsap/TweenMax.min',
    TweenMax: '../vendors/gsap/TweenMax.min',
  },
  shim: {
    _main: {
      // deps: ['vue'], // force early load
    },
    gsap: {
      exports: 'GreenSockGlobals',
    },
    slick: {
      deps: ['jquery', 'patchevt'],
    },
  },
  urlArgs: DEFS.bust || 0, // cache buster
  waitSeconds: 11,
});

DEFS.config = {
  hosts: {
    loc: 'http://localhost',
    dev: 'http://10.94.206.163',
    ecg: 'http://ecgsolutions.hosting.wellsfargo.com/marketing',
    sso: 'https://ecgsolutions.hosting.wellsfargo.com:42055',
  },
};

require(['jqxtn', 'libs/dbug'], function ($, Dbug) {
  var W = window;
  var Co = W.console;
  var Lo = W.location;
  var Cf = DEFS.config;

  var local = parseFloat(Lo.hostname) || ('localhost' === Lo.hostname);
  var launch = local ? '2111/11/11' : DEFS.site.launch;
  var $page = $('html');

  W._dbug = Dbug(launch);
  Cf.flag = Lo.hash.split('&');
  Cf.host = (W._dbug > 1) ? Cf.hosts.loc : Cf.hosts.ecg;
  Cf.msie = ~W.navigator.userAgent.indexOf('rident');

  // - - - - - - - - - - - - - - - - - -
  // ESTABLISH BASELINES
  if (Cf.msie) {
    $page.addClass('msie'); // debug IE less
    require(['bondo']);
  }

  if (W._dbug > 1 || local) {
    $page.addClass('debug');
  } else if (W._dbug === 1) {
    // W._dbug.mute(); // stop applying to console
  } else if (W._dbug < 1) {
    W._dbug.silent(); // stop most of console
  }

  if (Cf.flag.length > 1) {
    $page.addClass(Cf.flag.slice(1).join(' '));
    W.history.pushState('Cf.flag', 0, Lo.origin + Lo.pathname + Cf.flag[0]);
  }

  // - - - - - - - - - - - - - - - - - -
  /// CUSTOMIZATIONS
  Co.groupCollapsed('Loading modules');
  require(['_main'], function (Main) {
    Co.groupEnd();

    Co.time('Main init took');
    // lazily init
    $(Main.init);

    // expose for debug
    if (W._dbug > 0) W.Main = Main;
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
