import React, { Component } from 'react';
import { Text } from 'react-native';

import Provider from 'serviceprovider';
import GreetService from './greet.service';

export default class HelloComponent extends Component {
  _unSubAll = false;

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
