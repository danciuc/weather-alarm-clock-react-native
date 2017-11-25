import {ToastAndroid} from 'react-native'

const types = {
  EDIT_ALARM: 'EDIT_ALARM',
  REMOVE_ALARM: 'REMOVE_ALARM',
  TOGGLE_ALARM_ACTIVE: 'TOGGLE_ALARM_ACTIVE',
  TOGGLE_EDIT_DIALOG: 'TOGGLE_EDIT_DIALOG',
  TOGGLE_ADD_DIALOG: 'TOGGLE_ADD_DIALOG'
}

export const actionCreators = {
  editAlarm: (hour, minute, label='') => {
    return {
      type: types.EDIT_ALARM,
      payload: {
        hour: hour,
        minute: minute,
        label: label
      }
    }
  },

  removeAlarm: (index) => {
    return {type: types.REMOVE_ALARM, payload: index}
  },

  toggleAlarmActive: (index) => {
    return {type: types.TOGGLE_ALARM_ACTIVE, payload: index}
  },

  toggleEditDialog: (index) => {
    return {type: types.TOGGLE_EDIT_DIALOG, payload: index}
  },

  toggleAddDialog: () => {
    return {type: types.TOGGLE_ADD_DIALOG}
  }
}

const initialState = {
  alarms: [
    {hour: '10', minute: '00', label: 'Alarm 1', active: true},
    {hour: '7', minute: '09', label: 'Alarm 2', active: false},
    {hour: '6', minute: '07', label: 'Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2', active: false}
  ],
  editIndex: -1,
  showAddDialog: false
}

export const reducer = (state=initialState, action) => {
  const {type, payload} = action
  const {alarms, showAddDialog, editIndex} = state

  switch(type) {
    case types.EDIT_ALARM: {
      return _editAlarm(state, payload)
    }

    case types.REMOVE_ALARM: {
      return {
        ...state,
        alarms: alarms.filter((_, index) => index !== payload)
      }
    }

    case types.TOGGLE_ALARM_ACTIVE: {
      return {
        ...state,
        alarms: alarms.map((alarm, index) => {
          if (index === payload) {
            return {...alarm, active: !alarm.active}
          }

          return alarm
        })
      }
    }

    case types.TOGGLE_EDIT_DIALOG: {
      const index = payload === undefined ? -1 : payload
      return {
        ...state,
        editIndex: index
      }
    }

    case types.TOGGLE_ADD_DIALOG: {
      return {
        ...state,
        showAddDialog: !showAddDialog
      }
    }

    default: {
      return state
    }
  }
}

_editAlarm = (state, payload) => {
  const {alarms, editIndex} = state
  const index = editIndex > -1 ? editIndex : alarms.length

  const existingAlarms = alarms.filter((alarm, i) => {
    return i != index
      && alarm.hour == payload.hour
      && alarm.minute == payload.minute
  })

  if (existingAlarms.length) {
    ToastAndroid.show(
      `An alarm set for ${payload.hour}:${payload.minute} already exist!`,
      ToastAndroid.SHORT
    )
    return state
  }

  alarms[index] = {
    hour: payload.hour,
    minute: payload.minute,
    label: payload.label,
    active: true
  }

  return {
    ...state,
    showAddDialog: false,
    editIndex: -1,
    alarms: alarms
  }
}
