# serviceprovider

A simple and lightweight Service Provider for node.js project.

Initially intended to mimic behaviour of Angular's service provider on React Native.

## NOTICE

It appears building `react-native` app for `production` does not work well with service with dependency.

This will crash the app and I cannot seem to find the cause of the problem.

However, no problem arises during development.

The package should be working fine on other platform / configuration / purpose.

## Install

```
npm i -S serviceprovider
```

## Usage
```jsx
// Import
const Provider = require('serviceprovider');
// or
import Provider from 'serviceprovider';

// Initialize the Provider
Provider.init(providers: array, store?: ReduxStore);

// Resolve the service
Provider.resolve(service: Class);

// Notify services that the application is mounted
// Should be called from 'app.componentDidMount'
// Service should implement 'appDidMount' method too support this feature.
Provider.appDidMount();

// Notify services that the application will be unmount
// Should be called from 'app.componentWillUnmount'
// Service should implement 'appWillUnmount' method too support this feature.
Provider.appWillUnmount();
```

## Dependency Injection and Redux Store
The dependency will be automatically injected via `constructor` for each service if the service define `static deps` array.

If redux store is passed from calling `Provider.init`, it will also pass along the constructor of every service.

### Sample service with dependency
```jsx
import ServiceB from './service.b';
import ServiceC from './service.c';
class ServiceA {
  static deps = [ServiceB, ServiceC];

  constructor(store, deps) {
    this.serviceB = deps[0];
    this.serviceC = deps[1];
  }
}
```

## Live Demo

Visit Expo Snack [here](https://snack.expo.io/SykiZlu-M)

## Short Demo
![Example Result](https://github.com/atton16/serviceprovider/raw/master/doc/example-react-native-result.gif)

# License
### MIT License
Copyright 2017 Attawit Kittikrairit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
