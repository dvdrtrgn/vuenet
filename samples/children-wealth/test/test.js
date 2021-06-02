var $ = window.jQuery;
var C = window.console;
var SM = window.ScrollMagic;
var GS = window.GreenSockGlobals;
var TM = GS.TweenMax;
var Con = new SM.Controller();

var el1 = $('#Test1');
var el2 = $('#Test2');
var el3 = '.tests';
var el4 = $('svg .st1');

function fade(ele) {
  ele = ele.get ? ele.get(0) : ele;

  var scene = new SM.Scene({
    reverse: false,
    triggerElement: ele,
    triggerHook: 0.5,
  });

  var tween = TM.fromTo(ele, 1, {
    ease: GS.Power2.easeIn,
    opacity: 0,
    y: '100',
  }, {
    opacity: 1,
    y: '0',
  });

  scene.setTween(tween);
  scene.addIndicators();

  Con.addScene(scene);
}

function hulk(ele) {
  ele = ele.get ? ele.get(0) : ele;

  var scene = new SM.Scene({
    triggerElement: ele,
    duration: 200,
  }).setTween(ele, 0.5, { // trigger a TweenMax.to tween
    backgroundColor: 'green',
    scale: 2.5,
  }).addTo(Con);

  scene.addIndicators();
}

function svgy(ele) {
  ele = ele.get ? ele.get(0) : ele;

  var scene = new SM.Scene({
    triggerElement: ele,
    duration: 200,
  });
  var tween = TM.fromTo(ele, 1, {
    x: 100,
    y: 100,
    scale: 0,
    rotation: 180,
    skewX: 45,
    opacity: 0,
    transformOrigin: 'center center',
  }, {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    skewX: 0,
    opacity: 1,
  });

  scene.setTween(tween);
  // scene.addIndicators();

  Con.addScene(scene);
}

fade(el1);
hulk(el2);
hulk(el3);
svgy(el4);
