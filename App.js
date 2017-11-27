import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';

import configureStore from './app/configureStore'
import Alarm from './app/containers/Alarm'
import Weather from './app/containers/Weather'

const { store } = configureStore()

const AppNavigator = StackNavigator({
  Alarm: { screen: Alarm },
  Weather: { screen: Weather }
}, {
  initialRouteName: 'Alarm'
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
