import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators } from '../redux/weather'

import ForecastChart from '../components/weather/ForecastChart'
import ForecastInfo from '../components/weather/ForecastInfo'

const mapStateToProps = (state) => {
  const {weatherReducer} = state

  return {
    forecast: weatherReducer.forecast,
    location: weatherReducer.location,
    lastSync: weatherReducer.lastSync,
    loading: weatherReducer.loading,
    error: weatherReducer.error
  }
}

class Weather extends Component {

  static propTypes = {
    forecast: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    lastSync: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  }

  static navigationOptions = {title: 'Weather'}

  onGetForecast = () => {
    this.props.dispatch(actionCreators.getForecast())
  }

  mapForecastToChartData = (forecast) => {
    return forecast.map((value) => [{name: value.time, temp: value.temp}])
  }

  componentWillMount() {
    const {forecast} = this.props
    if (forecast.length == 0) this.onGetForecast()
  }

  render() {
    const {forecast, location, lastSync, loading, error} = this.props

    if (loading) {
      return (
        <View style={styles.centralContainer}>
          <ActivityIndicator />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.centralContainer}>
          <Text>Couldn not fetch weather forecast!</Text>
        </View>
      )
    }

    if (forecast.length == 0) {
      return (
        <View style={styles.centralContainer}>
          <Text>No data!</Text>
        </View>
      )
    }

    const chartData = this.mapForecastToChartData(forecast)

    return (
      <View style={styles.container}>
        <ForecastInfo
          onSync={this.onGetForecast}
          data={forecast[0]}
          location={location}
          lastSync={lastSync}
        />

        <View style={styles.chart}>
          <ForecastChart data={chartData} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  centralContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chart: {
    flexDirection: 'row',
    alignSelf: 'center'
  }
})

export default connect(mapStateToProps)(Weather)
