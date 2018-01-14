import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import createFilter, { createBlacklistFilter } from 'redux-persist-transform-filter';

// Thunk middleware allows actions to be chained and waited on by returning
// a function from that action
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk'

// Logs all actions going through redux into console
// https://github.com/evgenyrodionov/redux-logger
import createLogger from 'redux-logger'

import { alarmReducer } from './redux/alarm'
import { weatherReducer } from './redux/weather'
import { authReducer } from './redux/auth'

const saveAlarmFilter = createFilter(
  'alarmReducer',
  ['alarms']
);
const saveWeatherFilter = createFilter(
  'weatherReducer',
  ['location', 'lastSync', 'forecast']
);
const saveAuthFilter = createFilter(
  'authReducer',
  ['user', 'userRole']
);

const config = {
  key: 'primary',
  storage: AsyncStorage,
  transforms: [
    saveAlarmFilter,
    saveWeatherFilter,
    saveAuthFilter
  ]
}

const reducer = persistCombineReducers(config, {
  alarmReducer: alarmReducer,
  weatherReducer: weatherReducer,
  authReducer: authReducer
})

// http://redux.js.org/docs/advanced/Middleware.html
const middleware = [ thunk ]

// Use the NODE_ENV to include logging and debugging tools
// in development environment. They will be compiled out of
// the production build.
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
  // Turns on Reactotron debugging tool
  require('./config/ReactotronConfig')
}

const enhancer = compose(
  applyMiddleware(...middleware)
)

export default function configureStore() {

      const store = createStore(reducer, enhancer)
      const persistor = persistStore(store)
      // persistor.purgeAll()

      return {store, persistor}
}
