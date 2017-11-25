import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TimePickerAndroid, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import PopupDialog, { DialogButton } from 'react-native-popup-dialog';

export default class EditDialog extends Component {

  constructor(props) {
    super(props)

    const {hour, minute, label} = this.props
    this.state = {
      hour: hour,
      minute: minute,
      label: label
    }
  }

  static propTypes = {
    onToggleEditDialog: PropTypes.func.isRequired,
    onEditAlarm: PropTypes.func.isRequired
  }

  getTime = async () => {
    const {onToggleEditDialog} = this.props
    const {hour, label} = this.state
    let {minute} = this.state

    if (minute !== undefined) minute = parseInt(minute)

    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: hour,
        minute: minute,
        is24Hour: true,
      })

      if (action !== TimePickerAndroid.dismissedAction) {
        if (minute < 10) minute = '0' + minute
        this.setState({hour: hour, minute: minute})
      } else {
        onToggleEditDialog()
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message)
    }
  }

  componentWillMount() {
    this.getTime()
  }

  render() {
    const {onToggleEditDialog, onEditAlarm} = this.props
    const {hour, minute, label} = this.state

    if (!hour) return null

    return (
      <PopupDialog
        height={null}
        show={true}
        ref={(popupDialog) => {this.popupDialog = popupDialog}}
        onDismissed={onToggleEditDialog}
        dialogStyle={styles.container}
      >
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.time}>{hour}:{minute}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Label: </Text>
            <TextInput
              onChangeText={(text) => this.setState({label: text})}
              value={label}
            />
          </View>
        </View>
        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onToggleEditDialog}>
            <Text style={styles.action}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onEditAlarm(hour, minute, label, null)}>
            <Text style={styles.action}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    top: '5%',
    left: 0,
    zIndex: 1000,
    padding: 20,
    minHeight: 200,
  },
  time: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    paddingTop: 15,
  },
  content: {
    margin: 25,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  action: {
    marginHorizontal: 30,
    fontSize: 20,
    fontWeight: 'bold',
  }
})
