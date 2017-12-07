export default class Provider {
  // State
  static _state = {
    init: false,
    store: undefined,
  };
  // Provider instances
  static _services = {};

  static init(providers = [], store = undefined) {
    if (Provider._state.init) {
      console.warn('ServiceProvider [WARINING]: init is called more than once.');
    }
    Provider._state.init = true;
    Provider._state.store = store;
    const orderedProviders = Provider._prep(providers);
    for (let i = 0; i < orderedProviders.length; i++) {
      const TheClass = orderedProviders[i];
      Provider._instantiate(TheClass);
    }
  }

  // Prep build the ready-to-instantiate list of service
  // The service will be ordered according to the dependency
  static _prep(providers) {
    const ret = [];
    const queue = [...providers];

    while (queue.length > 0) {
      const TheClass = queue.shift();
      // Check if touched
      if (ret.includes(TheClass))
        continue;

      // Put deps to queue
      const deps = TheClass.deps;
      if (Array.isArray(deps) && deps.length > 0) {
        const len = deps.length;
        // Check if all deps are already in ret
        let inRet = 0;
        for (let i = 0; i < len; i++) {
          inRet += ret.includes(deps[i]) ? 1 : 0;
        }
        if (inRet !== len) {
          queue.unshift(TheClass);
          for (let i = len - 1; i >= 0; i--)
            queue.unshift(deps[i]);
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
  
  static _instantiate(TheClass) {
    // Inject deps
    const deps = TheClass.deps;
    let depInstances;
    if (Array.isArray(deps) && deps.length > 0) {
      depInstances = [];
      for (let i = 0; i < deps.length; i++)
        depInstances.push(Provider._services[deps[i].name]);
    }
    const instance = new TheClass(Provider._state.store, depInstances);
    const name = instance.constructor.name;
    if (Provider._services[name] !== undefined) {
      console.warn(
        'ServiceProvider [WARINING]: Service with name \'' + name +
        '\' is already in the provider list.'
      );
      return;
    }
    Provider._services[name] = instance;
  }

  static resolve(TheClass) {
    if (!Provider._state.init) {
      console.warn('ServiceProvider [WARINING]: resolve is called before init.');
      Provider.init();
    }
    const ret = Provider._services[TheClass.name];
    if (ret === undefined) {
      console.error('ServiceProvider [Error]: Cannot resolve ' + TheClass.name + '.');
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
