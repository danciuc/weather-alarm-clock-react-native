import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class Error extends Component {

  static propTypes = {
    error: PropTypes.string.isRequired,
  }

  render() {
    const {error} = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 5
  },
  text: {
    color: 'red',
    fontSize: 15
  }
})
