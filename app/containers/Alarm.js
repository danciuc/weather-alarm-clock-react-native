import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators } from '../redux/alarm'

import List from '../components/alarm/List'
import EditDialog from '../components/alarm/EditDialog'

const mapStateToProps = (state) => {
  const {alarmReducer} = state

  return {
    alarms: alarmReducer.alarms,
    editIndex: alarmReducer.editIndex,
    showAddDialog: alarmReducer.showAddDialog
  }
}

class Alarm extends Component {

  static propTypes = {
    alarms: PropTypes.array.isRequired,
    editIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Alarms'
  }

  onEditAlarm = (hour, minute, label) => {
    this.props.dispatch(actionCreators.editAlarm(hour, minute, label))
  }

  onRemoveAlarm = (index) => {
    this.props.dispatch(actionCreators.removeAlarm(index))
  }

  onToggleAlarmActive = (index) => {
    this.props.dispatch(actionCreators.toggleAlarmActive(index))
  }

  onToggleEditDialog = (index) => {
    this.props.dispatch(actionCreators.toggleEditDialog(index))
  }

  onToggleAddDialog = () => {
    this.props.dispatch(actionCreators.toggleAddDialog())
  }

  render() {
    const {alarms, editIndex, showAddDialog, navigation} = this.props

    return (
      <View style={styles.container}>
        {/* Alarms list */}
        <List
          alarms={alarms}
          editIndex={editIndex}
          onEditAlarm={this.onEditAlarm}
          onRemoveAlarm={this.onRemoveAlarm}
          onToggleAlarmActive={this.onToggleAlarmActive}
          onToggleEditDialog={this.onToggleEditDialog}
        />
        {/* Add alarm button */}
        { editIndex < 0 &&
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={this.onToggleAddDialog}
              style={styles.add}
            >
              <Text style={styles.addSign}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
              <Text>Weather</Text>
            </TouchableOpacity>
          </View>
        }
        {/* Add alarm dialog */}
        { showAddDialog &&
          <EditDialog
            onEditAlarm={this.onEditAlarm}
            onToggle={this.onToggleAddDialog}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  add: {
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginVertical: 10,
    backgroundColor: 'green',
    borderRadius: 100,
  },
  addSign: {
    fontSize: 70,
    color: 'white',
    alignSelf: 'center',
  },
})

export default connect(mapStateToProps)(Alarm)
