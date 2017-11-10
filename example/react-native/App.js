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
