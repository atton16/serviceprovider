'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = function () {
  function Provider() {
    _classCallCheck(this, Provider);
  }

  _createClass(Provider, null, [{
    key: 'init',

    // State
    value: function init() {
      var providers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (Provider._state.init) {
        console.warn('ServiceProvider [WARINING]: init is called more than once.');
      }
      Provider._state.init = true;
      for (var i = 0; i < providers.length; i++) {
        var inst = new providers[i]();
        var name = inst.constructor.name;
        if (Provider._services[name] !== undefined) {
          console.warn('ServiceProvider [WARINING]: Service with name \'' + name + '\' is already in the provider list.');
          return;
        }
        Provider._services[name] = inst;
      }
    }
    // Provider instances

  }, {
    key: 'resolve',
    value: function resolve(Class) {
      if (!Provider._state.init) {
        console.warn('ServiceProvider [WARINING]: resolve is called before init.');
        Provider.init();
      }
      var ret = Provider._services[Class.name];
      if (ret === undefined) {
        console.error('ServiceProvider [Error]: Cannot resolve ' + Class.name + '.');
      }
      return ret;
    }
  }]);

  return Provider;
}();

Provider._state = {
  init: false
};
Provider._services = {};
exports.default = Provider;
