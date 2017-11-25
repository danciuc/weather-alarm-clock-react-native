const types = {
  EDIT_ALARM: 'EDIT_ALARM',
  REMOVE_ALARM: 'REMOVE_ALARM',
  TOGGLE_ALARM_ACTIVE: 'TOGGLE_ALARM_ACTIVE',
  TOGGLE_EDIT_DIALOG: 'TOGGLE_EDIT_DIALOG'
}

export const actionCreators = {
  editAlarm: (hour, minute, label='', index) => {
    return {
      type: types.EDIT_ALARM,
      payload: {
        hour: hour,
        minute: minute,
        label: label,
        index: index
      }
    }
  },

  removeAlarm: (index) => {
    return {type: types.REMOVE_ALARM, payload: index}
  },

  toggleAlarmActive: (index) => {
    return {type: types.TOGGLE_ALARM_ACTIVE, payload: index}
  },

  toggleEditDialog: () => {
    return {type: types.TOGGLE_EDIT_DIALOG}
  }
}

const initialState = {
  alarms: [
    {hour: '10', minute: '00', label: 'Alarm 1', active: true},
    {hour: '7', minute: '09', label: 'Alarm 2', active: false},
    {hour: '7', minute: '09', label: 'Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2 Alarm 2', active: false}
  ],
  showEditDialog: false
}

export const reducer = (state=initialState, action) => {
  const {type, payload} = action
  const {alarms, showEditDialog} = state

  switch(type) {
    case types.EDIT_ALARM: {
      // If index is null, it means that we got a new alarm so we should add it to the list
      const {index} = payload
      if (index === null) index = alarms.length

      alarms[index] = {
        hour: payload.hour,
        minute: payload.minute,
        label: payload.label,
        active: true
      }

      return {
        ...state,
        showEditDialog: false,
        alarms: alarms
      }
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
      return {
        ...state,
        showEditDialog: !showEditDialog
      }
    }

    default: {
      return state
    }
  }
}
