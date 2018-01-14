import { PersistGate } from 'redux-persist/lib/integration/react'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import firebase from 'firebase'

import configureStore from './app/configureStore'
import Alarm from './app/containers/Alarm'
import Weather from './app/containers/Weather'
import Login from './app/containers/Login'
import Register from './app/containers/Register'

const { store, persistor } = configureStore()

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Alarm: { screen: Alarm },
  Weather: { screen: Weather }
}, {
  initialRouteName: 'Login'
});

export default class App extends Component {
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB3DZ6wymF1-i_qYOsnzxVGSGwg-_6ojmM",
        authDomain: "weatheralarmclock-5864f.firebaseapp.com",
        databaseURL: "https://weatheralarmclock-5864f.firebaseio.com",
        projectId: "weatheralarmclock-5864f",
        storageBucket: "weatheralarmclock-5864f.appspot.com",
        messagingSenderId: "844695192117"
      })
    }
  }

  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </PersistGate>
    )
  }
}
