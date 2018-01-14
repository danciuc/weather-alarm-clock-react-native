import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class FormTextInput extends Component {

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
  }

  render() {

    return (
      <View>
        <TextInput
          style={styles.text}
          placeholderTextColor="#BDBDBD"
          autoCapitalize="words"
          {...this.props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 5
  }
})
