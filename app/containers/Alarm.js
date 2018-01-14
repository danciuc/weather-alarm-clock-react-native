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

  constructor(props) {
    super(props)
    this.state = {
      userRole: props.navigation.state.params ? props.navigation.state.params.userRole : null
    }
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
    const {userRole} = this.state

    const isAdmin = userRole == 'admin'

    return (
      <View style={styles.container}>
        {/* Alarms list */}
        <List
          isAdmin={isAdmin}
          alarms={alarms}
          editIndex={editIndex}
          onEditAlarm={this.onEditAlarm}
          onRemoveAlarm={this.onRemoveAlarm}
          onToggleAlarmActive={this.onToggleAlarmActive}
          onToggleEditDialog={this.onToggleEditDialog}
        />
        {/* Add alarm and Weather buttons */}
        { editIndex < 0 &&
          <View style={styles.bottom}>
            { isAdmin &&
              <TouchableOpacity
                onPress={this.onToggleAddDialog}
                style={[styles.button, styles.add]}
              >
                <Text style={styles.addSign}>+</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              onPress={() => navigation.navigate('Weather')}
              style={[styles.button, styles.weather]}
            >
              <Text style={styles.weatherText}>WEATHER</Text>
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
    justifyContent: 'space-around',
  },
  button: {
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginVertical: 10,
    borderRadius: 100,
  },
  add: {
    backgroundColor: 'green',
  },
  weather: {
    backgroundColor: 'deepskyblue',
  },
  weatherText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  addSign: {
    fontSize: 70,
    color: 'white',
    alignSelf: 'center',
  },
})

export default connect(mapStateToProps)(Alarm)
