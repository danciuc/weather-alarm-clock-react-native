import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { actionCreators } from '../redux/alarm'

import List from '../components/alarm/List'
import EditDialog from '../components/alarm/EditDialog'

const mapStateToProps = (state) => ({
  alarms: state.alarms,
  showEditDialog: state.showEditDialog
})

class Alarm extends Component {

  static propTypes = {
    alarms: PropTypes.array.isRequired,
    showEditDialog: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  onEditAlarm = (hour, minute, label, index) => {
    this.props.dispatch(actionCreators.editAlarm(hour, minute, label, index))
  }

  onRemoveAlarm = (index) => {
    this.props.dispatch(actionCreators.removeAlarm(index))
  }

  onToggleAlarmActive = (index) => {
    this.props.dispatch(actionCreators.toggleAlarmActive(index))
  }

  onToggleEditDialog = () => {
    this.props.dispatch(actionCreators.toggleEditDialog())
  }

  render() {
    const {alarms, showEditDialog} = this.props

    return (
      <View style={styles.container}>
        {/* Alarms list */}
        <List
          alarms={alarms}
          showEditDialog={showEditDialog}
          onEditAlarm={this.onEditAlarm}
          onRemoveAlarm={this.onRemoveAlarm}
          onToggleAlarmActive={this.onToggleAlarmActive}
          onToggleEditDialog={this.onToggleEditDialog}
        />
        {/* Add alarm button */}
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={this.onToggleEditDialog}
            style={styles.add}
          >
            <Text style={styles.addSign}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Add alarm dialog */}
        { showEditDialog &&
          <EditDialog
            onEditAlarm={this.onEditAlarm}
            onToggleEditDialog={this.onToggleEditDialog}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
