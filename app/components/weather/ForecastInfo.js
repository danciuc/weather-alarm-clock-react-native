import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'

export default class ForecastInfo extends Component {

  static propTypes = {
    onSync: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    lastSync: PropTypes.string.isRequired
  }

  render() {
    const {data, location, lastSync, onSync} = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.location}>{location}</Text>

        <View style={styles.sync}>
          <Text style={styles.lastSync}>{lastSync}</Text>
          <TouchableOpacity
            style={styles.syncNow}
            onPress={onSync}
          >
            <Text>Sync Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.detail}>Current temperature: {data.temp} °C</Text>
          <Text style={styles.detail}>Humidity: {data.humidity} %</Text>
          <Text style={styles.detail}>Wind speed: {data.wind} m/s</Text>
          <Text style={styles.detail}>Description: {data.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  lastSync: {
    fontSize: 18,
    color: 'black'
  },
  sync: {
    flexDirection: 'row'
  },
  syncNow: {
    marginLeft: 30,
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray'
  },
  details: {
    marginTop: 10
  },
  detail: {
    fontSize: 14,
    color: 'dimgray'
  }
})
