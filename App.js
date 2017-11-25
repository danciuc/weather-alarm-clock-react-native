import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './app/configureStore'
import Alarm from './app/containers/Alarm'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Alarm />
      </Provider>
    )
  }
}
