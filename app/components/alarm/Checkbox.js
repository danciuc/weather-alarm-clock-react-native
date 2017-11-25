import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class Checkbox extends Component {

  static propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  }

  render() {
    const {isChecked, onToggle} = this.props

    return (
      <TouchableOpacity onPress={onToggle}>
        <View style={[styles.box, isChecked && styles.checked]}>
          {isChecked && <View style={styles.innerBox} />}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginTop: 16,
  },
  checked: {
    borderColor: 'limegreen',
  },
  innerBox: {
    flex: 1,
    backgroundColor: 'green',
    margin: 2,
    borderRadius: 10,
  }
})
