const types = {
  GET_FORECAST_REQUEST: 'GET_FORECAST_REQUEST',
  GET_FORECAST_RESPONSE: 'GET_FORECAST_RESPONSE'
}

export const actionCreators = {
  getForecast: () => async (dispatch) => {
    dispatch({type: types.GET_FORECAST_REQUEST})

    try {
      const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Cluj-Napoca,RO&units=metric&APPID=e19222d9771bdc1c16b49da4e0ec39e6')
      const forecast = await response.json()

      const result = forecast.list.splice(0, 5).map(value => {
        const date = new Date(value.dt * 1000) // Unix time in seconds to milliseconds
        let minutes = date.getMinutes()
        if (minutes < 10) minutes = '0' + minutes

        return {
          time: date.getHours() + ':' + minutes,
          temp: value.main.temp,
          humidity: value.main.humidity,
          wind: value.wind.speed,
          description: value.weather[0].description
        }
      })

      dispatch({type: types.GET_FORECAST_RESPONSE, payload: result})
    } catch (e) {
      dispatch({type: types.GET_FORECAST_RESPONSE, payload: e, error: true})
    }
  }
}

const initialState = {
  location: 'Cluj-Napoca',
  lastSync: '',
  forecast: [],
  loading: false,
  error: false
}

export const weatherReducer = (state=initialState, action) => {
  const {type, payload, error} = action

  switch(type) {
    case types.GET_FORECAST_REQUEST: {
      return {...state, loading: true}
    }

    case types.GET_FORECAST_RESPONSE: {
      if (error) {
        return {...state, loading: false, error: true}
      }

      const date = new Date()
      const dateString = date.toDateString()
      const hours = date.getHours()
      let minutes = date.getMinutes()
      if (minutes < 10) minutes = '0' + minutes

      return {
        ...state,
        loading: false,
        forecast: payload,
        lastSync: `${dateString}, ${hours}:${minutes}`
      }
    }

    default: {
      return state
    }
  }
}
