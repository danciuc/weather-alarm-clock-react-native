import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import Checkbox from './Checkbox'
import EditDialog from './EditDialog'

export default class List extends Component {

  static propTypes = {
    alarms: PropTypes.array.isRequired,
    showEditDialog: PropTypes.bool.isRequired,
    onEditAlarm: PropTypes.func.isRequired,
    onRemoveAlarm: PropTypes.func.isRequired,
    onToggleAlarmActive: PropTypes.func.isRequired,
    onToggleEditDialog: PropTypes.func.isRequired
  }

  onEditAlarm = (index) => {

  }

  renderAlarm = (alarm, index) => {
    const {onEditAlarm, onToggleAlarmActive, onRemoveAlarm} = this.props

    return (
      <View key={index} style={styles.item}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => this.onEditAlarm(index)}>
            <Text style={[styles.time, !alarm.active && styles.timeInactive]}>
              {alarm.hour}:{alarm.minute}
            </Text>
            <Text>{alarm.label}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSection}>
          <Checkbox
            isChecked={alarm.active}
            onToggle={() => onToggleAlarmActive(index)}
          />
          <TouchableOpacity onPress={() => onRemoveAlarm(index)}>
            <Text style={styles.remove}>&times;</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {alarms, showEditDialog, onEditAlarm, onToggleEditDialog} = this.props

    if (alarms.length === 0) {
      return (
        <ScrollView>
          <Text style={styles.notFound}>No alarms found</Text>
        </ScrollView>
      )
    }

    return (
      <View>
        <ScrollView>
          {alarms.map(this.renderAlarm)}
        </ScrollView>
        {false &&
          <EditDialog
            onEditAlarm={onEditAlarm}
            onToggleEditDialog={onToggleEditDialog}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  leftSection: {
    flex: 4,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  timeInactive: {
    fontSize: 22,
    color: 'dimgray'
  },
  remove: {
    fontSize: 40,
    marginLeft: 15,
    marginBottom: 2,
    color: 'red'
  },
  notFound: {
    fontSize: 20,
    paddingTop: 40,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
})
