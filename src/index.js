export default class Provider {
  // State
  static _state = {
    init: false,
  };
  // Provider instances
  static _services = {};

  static init(providers = [], store = undefined) {
    if (Provider._state.init) {
      console.warn('ServiceProvider [WARINING]: init is called more than once.');
    }
    Provider._state.init = true;
    for (let i = 0; i < providers.length; i++) {
      const inst = new providers[i](store);
      const name = inst.constructor.name;
      if (Provider._services[name] !== undefined) {
        console.warn(
          'ServiceProvider [WARINING]: Service with name \'' + name +
          '\' is already in the provider list.'
        );
        return;
      }
      Provider._services[name] = inst;
    }
  }

  static resolve(Class) {
    if (!Provider._state.init) {
      console.warn('ServiceProvider [WARINING]: resolve is called before init.');
      Provider.init();
    }
    const ret = Provider._services[Class.name];
    if (ret === undefined) {
      console.error('ServiceProvider [Error]: Cannot resolve ' + Class.name + '.');
    }
    return ret;
  }

  static appDidMount() {
    const keys = Object.keys(this._services);
    for(let i = 0; i < keys.length; i++) {
      if (typeof this._services[keys[i]].appDidMount === 'function')
        this._services[keys[i]].appDidMount();
    }
  }

  static appWillUnmount() {
    const keys = Object.keys(this._services);
    for(let i = 0; i < keys.length; i++) {
      if (typeof this._services[keys[i]].appWillUnmount === 'function')
        this._services[keys[i]].appWillUnmount();
    }
  }
}
