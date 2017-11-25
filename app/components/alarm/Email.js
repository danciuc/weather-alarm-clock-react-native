import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native';

import Mailer from 'react-native-mail';

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Email text here'};
  }

  _handleEmail = () => {
    Mailer.mail({
      subject: 'Email test',
      recipients: ['cristian.danciu.01@gmail.com'],
      body: this.state.text
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={styles.button}
          onPress={this._handleEmail}
          title="Send Email"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 25
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '60%'
  }
});
