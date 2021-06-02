/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2019-05-13
  IDEA    Handle field formats etc
  NOTE    error class on fields exited sans value matching rule named in data attr
  TODO    change data attr names

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Fielder';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    trig: $.jqns('click keyup', NOM),
    rules: {
      '10exact': /^\d{10}$/ig,
      '5min': /^\d{5,}$/ig,
      'alpha': /^\w+$/ig,
      'alphanums': /^[\s\w\d]{3,}$/ig,
      'numeric': /^\d+$/ig,
      'phone': /^.{12}$/ig,
    },
  };
  var EL = {
    body: 'body',
    page: 'html,body',
    wrap: '.userform',
    phone: '.userform #phone',
    form: '',
    msgs: '',
    submit: '',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
  };

  // - - - - - - - - - - - - - - - - - -
  // EXTEND

  function parsePhone(nums) {
    var clean = [];
    var str1, str2, str3;

    nums = nums.replace(/[^0-9]/g, '');
    str1 = nums.substr(0, 3);
    str2 = nums.substr(3, 3);
    str3 = nums.substr(6, 4);

    if (str1.length < 3) clean = [str1];
    else {
      if (str2.length <= 2) clean = [str1, str2];
      if (str2.length === 3) clean = [str1, str2, str3];
    }
    return clean;
  }

  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  function setError(ele, bool) {
    if (bool) {
      ele.closest('p').addClass('error');
    } else {
      ele.closest('p').removeClass('error');
    }
  }

  function setActive(ele, bool) {
    var lab = ele.parent().find('label');

    if (bool) {
      ele.add(lab).addClass('active');
    } else {
      ele.add(lab).removeClass('active');
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // HANDLERS

  function _makePhoneNum(evt) {
    if (evt.keyCode === 8) return; // backspace / delete
    var ele = $(evt.target);
    var arr = parsePhone(ele.val());

    ele.val(arr.join('-')); // addDashes
  }

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function bindValidator(idx, ele) {
    var msg = $(ele);
    var rval = msg.data('valid');
    var rule = DF.rules[rval];
    var fld = msg.parent().find(':input');

    if (!fld.length) return {}; // nothing to validate

    function _check() {
      var val = fld.val();
      var rez = val.match(rule);

      if (!rez) setError(fld, true);

      C.warn('bindValidator_check', rez, val);
    }
    // C.warn('bindValidator', ele, rule);

    fld.data('rule', rule).on('blur', _check);
  }

  function readValidators() {
    EL.submit.on('click', function (evt) {
      evt.preventDefault();
      EL.wrap.find(':input').blur();

      if (EL.wrap.find('.error :input:visible').length) {
        EL.wrap.find('.validating').addClass('error');
      } else {
        $('form').submit();
        $.publish('Help:showVersion', 'requested');
      }
    });

    EL.msgs.each(bindValidator);
  }

  function tweakInputs() {
    EL.form.find(':input')
      .on('focus', function (evt) {
        var ele = $(evt.target);

        setActive(ele, true);
      })
      .on('blur', function (evt) {
        var ele = $(evt.target);
        var val = ele.val();

        if (val.length < 2) {
          setActive(ele, false);
          setError(ele, true);
        } else {
          setError(ele, false);
        }
      });
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    $.reify(EL);

    EL.form = EL.wrap.find('form');
    EL.msgs = EL.wrap.find('span.msg');
    EL.submit = EL.wrap.parent().find('.submit .button');

    // $('#phone').on('blur', _makePhoneNum);
    EL.phone.on('change keyup paste', _makePhoneNum);

    tweakInputs();
    readValidators();
  }

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
