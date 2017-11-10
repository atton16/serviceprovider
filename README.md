# serviceprovider

Service Provider for node.js projects. Initially intended to mimick Angular's service provider pattern on React Native.

## Usage
```javascript
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

export default class HelloComponent extends Component {
  _unSubAll = false;

  constructor() {
    super();
    this.greetService = Provider.resolve(GreetService);
  }

  componentDidMount() {
    this.greetService.stateEvent
    .takeWhile(() => !this._unSubAll)
    .subscribe(name => {
      this.name = name;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this._unSubAll = true;
  }

  render() {
    return (
      <Text>Hello {this.name}</Text>
    );
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
import { StyleSheet, View, Text } from 'react-native';
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
        <Text />
        <Text />
        <Text />
        <Text />
        <HelloComponent></HelloComponent>
      </View>
    );
  }
}

```
