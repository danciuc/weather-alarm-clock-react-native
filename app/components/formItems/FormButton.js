import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class FormButton extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const {title} = this.props

    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          {...this.props}
        >
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#819FF7'
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})
