# serviceprovider

A simple and lightweight Service Provider for node.js project.

Initially intended to mimick Angular's service provider pattern on React Native.

## Install

```
npm i -S serviceprovider
```

## Usage
```typescript
// Import
const Provider = require('serviceprovider');
// or
import Provider from 'serviceprovider';

// Initialize the Provider
Provider.init(providers: array);

// Resolve the service
Provider.resolve(service: Class);
```

## Example

### HelloComponent (hello.component.js)
```jsx
import React, { Component } from 'react';
import { Text } from 'react-native';

import Provider from 'serviceprovider';
import GreetService from './greet.service';

// @flow
export default class HelloComponent extends Component {
  _unSubAll = false;
  greetService: GreetService;

  constructor() {
    super();
    this.greetService = Provider.resolve(GreetService);
    this.state = {};
  }

  componentDidMount() {
    this.greetService.stateEvent
      .takeWhile(() => !this._unSubAll)
      .subscribe(name => this.setState({name: name}));
  }

  componentWillUnmount() {
    this._unSubAll = true;
  }

  render() {
    return <Text>Hello {this.state.name}</Text>;
  }
}

```

### NameAlternator (name.alternator.js)
```jsx
import Provider from 'serviceprovider';
import GreetService from './greet.service';

export default class NameAlternator {
  constructor() {
    const greetService = Provider.resolve(GreetService);
    let i = 0;
    greetService.setUser('Pikachu');
    setInterval(() => {
      if (i === 0) {
        greetService.setUser('Raichu');
        i = 1;
      } else {
        greetService.setUser('Pikachu');
        i = 0;
      }
    }, 500);
  }
}

```

### GreetService (greet.service.js)
```jsx
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export default class GreetService {
  _stateSubject = new BehaviorSubject(null);
  stateEvent = this._stateSubject.asObservable();

  setUser(name) {
    this._stateSubject.next(name);
  }
}

```

### Main (App.js)
```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Provider from 'serviceprovider';

import 'rxjs/add/operator/takeWhile';

// Components
import HelloComponent from './hello.component';
import NameAlternator from './name.alternator';

// Services
import GreetService from './greet.service';

export default class HelloWorldApp extends Component {
  // The list of the service
  providers = [
    GreetService
  ];

  // Initialize the Provider in top module class
  constructor() {
    super();
    Provider.init(this.providers);
    new NameAlternator();
  }

  // UI Render
  render() {
    return (
      <View>
        <Text /><Text /><Text /><Text />
        <HelloComponent />
      </View>
    );
  }
}

```

### Result
![Example Result](https://github.com/atton16/serviceprovider/raw/master/doc/example-react-native-result.gif)

# License
### MIT License
Copyright 2017 Attawit Kittikrairit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
