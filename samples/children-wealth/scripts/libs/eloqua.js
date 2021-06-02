/*global define, LiveValidation, Validate, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  USE: code puked from eloqua (and tweaked as needed)

 */
define(['livalid'], function ( /*noexport*/ ) {
  'use strict';

  var NOM = 'Eloqua';
  var API = {
    form: null,
  };
  var DF = {
    config: {
      validMessage: '',
      onlyOnBlur: true,
      wait: 333,
      onInvalid: function () { // customization
        this.insertMessage(this.createMessageSpan());
        this.addFieldClass();
        this.element.nextSibling.setAttribute('role', 'alert'); // A11y tweak
      },
    },
    regexs: {
      email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
      phone: /(\d{3}\D{0,2}\d{3}\D?\d{4})/,
      url: /(\S:\/\/\S|\D\.\D|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\d\.\D)/,
      zip: /^(\d{5})/,
    },
  };

  // - - - - - - - - - - - - - - - - - -
  // HEISTED

  function resetSubmitButton(e) {
    var submitButtons = e.target.form.getElementsByClassName('submit-button');
    for (var i = 0; i < submitButtons.length; i++) {
      submitButtons[i].disabled = false;
    }
  }

  function addChangeHandler(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('change', resetSubmitButton);
    }
  }

  function onSubmit() {
    setTimeout(function () {
      if (document.querySelector) {
        var s = document.querySelector(API.form + ' input[type=submit]');
        if (s) {
          s.disabled = true; // prevent resend??
        }
      }
    }, 100);

    return true;
  }

  function bindOthers() {
    var form = document.querySelector(API.form);
    var nodes = document.querySelectorAll(API.form + ' input[data-subscription]');

    addChangeHandler(form.getElementsByTagName('input'));
    addChangeHandler(form.getElementsByTagName('select'));
    addChangeHandler(form.getElementsByTagName('textarea'));

    if (nodes) {
      for (var i = 0, len = nodes.length; i < len; i++) {
        var status = nodes[i].dataset ? nodes[i].dataset.subscription : nodes[i].getAttribute('data-subscription');
        if (status === 'true') {
          nodes[i].checked = true;
        }
      }
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // CUSTOM

  function makeRule(valtype, message, pattern) {
    var rule = {
      valtype: Validate[valtype],
      message: (message || 'Field invalid'),
      pattern: DF.regexs[pattern] || pattern,
    };
    if (!rule.valtype) throw 'bad rule';
    return rule;
  }

  function _addRule(fido, rule) {
    if (!rule || !fido) return;
    var conf = {
      failureMessage: rule.message,
    };

    if (rule.valtype === Validate.Custom) {
      conf.against = function (value) {
        if (rule.pattern === DF.regexs.url) {
          return !value.match(rule.pattern);
        } else {
          return value.match(rule.pattern);
        }
      };
    } else {
      conf.pattern = rule.pattern;
    }

    fido.add(rule.valtype, conf);
  }

  function _bindField(dom, rules) {
    var fido = new LiveValidation(dom, DF.config);
    // C.debug(NOM, [dom, fido, rules]);

    rules.forEach(function (rule) {
      if (!rule.valtype) {
        rule = makeRule.apply(null, rule);
      }
      _addRule(fido, rule);
    });
  }

  // example
  // bindRules('#id', ['Custom/Format/Presence', 'A message...', 'regexp'], ...)
  function bindRules(id, rules) {
    var ele = document.querySelector(id);
    rules = [].slice.call(arguments, 1);

    if (ele) _bindField(ele, rules);
  }

  function bindValidators() {
    // old style example
    //
    // var dom = document.querySelector('#field');
    // var field = new LiveValidation(dom, DF.config);
    // field.add(Validate.Format, {
    //   pattern: DF.regexs.email,
    //   failureMessage: 'A valid email address is required',
    // });
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    bindValidators();
    bindOthers();
  }

  function init(sel) {
    API.form = sel;
    bind();
    API.init = NOM + ':INITED:' + sel;
    return document.querySelector(API.form);
  }

  API.init = init;
  API.send = onSubmit;
  API.makeRule = makeRule;
  API.bindRules = bindRules;

  return API;
});

/*



 */
