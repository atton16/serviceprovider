'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (Provider._state.init) {
        console.warn('ServiceProvider [WARINING]: init is called more than once.');
      }
      Provider._state.init = true;
      Provider._state.store = store;
      var orderedProviders = Provider._prep(providers);
      for (var i = 0; i < orderedProviders.length; i++) {
        var TheClass = orderedProviders[i];
        Provider._instantiate(TheClass);
      }
    }

    // Prep build the ready-to-instantiate list of service
    // The service will be ordered according to the dependency

    // Provider instances

  }, {
    key: '_prep',
    value: function _prep(providers) {
      var ret = [];
      var queue = [].concat(_toConsumableArray(providers));

      while (queue.length > 0) {
        var TheClass = queue.shift();
        // Check if touched
        if (ret.includes(TheClass)) continue;

        // Put deps to queue
        var deps = TheClass.deps;
        if (Array.isArray(deps) && deps.length > 0) {
          var len = deps.length;
          // Check if all deps are already in ret
          var inRet = 0;
          for (var i = 0; i < len; i++) {
            inRet += ret.includes(deps[i]) ? 1 : 0;
          }
          if (inRet !== len) {
            queue.unshift(TheClass);
            for (var _i = len - 1; _i >= 0; _i--) {
              queue.unshift(deps[_i]);
            }
          } else {
            ret.push(TheClass);
          }
          continue;
        }

        // Put Class to ret
        ret.push(TheClass);
      }

      return ret;
    }
  }, {
    key: '_instantiate',
    value: function _instantiate(TheClass) {
      // Inject deps
      var deps = TheClass.deps;
      var depInstances = void 0;
      if (Array.isArray(deps) && deps.length > 0) {
        depInstances = [];
        for (var i = 0; i < deps.length; i++) {
          depInstances.push(Provider._services[deps[i].name]);
        }
      }
      var instance = new TheClass(Provider._state.store, depInstances);
      var name = instance.constructor.name;
      if (Provider._services[name] !== undefined) {
        console.warn('ServiceProvider [WARINING]: Service with name \'' + name + '\' is already in the provider list.');
        return;
      }
      Provider._services[name] = instance;
    }
  }, {
    key: 'resolve',
    value: function resolve(TheClass) {
      if (!Provider._state.init) {
        console.warn('ServiceProvider [WARINING]: resolve is called before init.');
        Provider.init();
      }
      var ret = Provider._services[TheClass.name];
      if (ret === undefined) {
        console.error('ServiceProvider [Error]: Cannot resolve ' + TheClass.name + '.');
      }
      return ret;
    }
  }, {
    key: 'appDidMount',
    value: function appDidMount() {
      var keys = Object.keys(this._services);
      for (var i = 0; i < keys.length; i++) {
        if (typeof this._services[keys[i]].appDidMount === 'function') this._services[keys[i]].appDidMount();
      }
    }
  }, {
    key: 'appWillUnmount',
    value: function appWillUnmount() {
      var keys = Object.keys(this._services);
      for (var i = 0; i < keys.length; i++) {
        if (typeof this._services[keys[i]].appWillUnmount === 'function') this._services[keys[i]].appWillUnmount();
      }
    }
  }]);

  return Provider;
}();

Provider._state = {
  init: false,
  store: undefined
};
Provider._services = {};
exports.default = Provider;
