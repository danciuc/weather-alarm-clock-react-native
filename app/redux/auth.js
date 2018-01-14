import firebase from 'firebase'

const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL'
}

export const actionCreators = {
  login: (email, password, navigation) => async (dispatch) => {
    if (!email || !password) {
      dispatch({ type: types.LOGIN_FAIL, payload: {
        error: "Email and password are required"
      }})
      return
    }

    dispatch({ type: types.LOGIN_REQUEST })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref(`/Users/${user.uid}/role`)
          .on('value', (snapshot) => {
            const role = snapshot.val()

            dispatch({ type: types.LOGIN_SUCCESS, payload: {user: user, userRole: role} })

            if (navigation) navigation.navigate('Alarm', {userRole: role})
          })
      })
      .catch((error) => {
        dispatch({ type: types.LOGIN_FAIL, payload: {
          email: email,
          error: authFailMessage(error.code)
        }})
      })
  },

  register: (email, password, firstName, lastName, navigation) => async (dispatch) => {
    if (!email || !password || !firstName || !lastName) {
      dispatch({ type: types.REGISTER_FAIL, payload: {
        error: "All fields are required"
      }})
      return
    }

    dispatch({ type: types.REGISTER_REQUEST })

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref('Users').child(user.uid)
        .set({ firstName, lastName })
        .then(() => {
          firebase.database().ref(`/Users/${user.uid}/role`)
            .on('value', (snapshot) => {
              const role = snapshot.val()

              dispatch({ type: types.REGISTER_SUCCESS, payload: {user: user, userRole: role} })

              if (navigation) navigation.navigate('Alarm', {userRole: role})
            })
        });
      })
      .catch((error) => {
        dispatch({ type: types.REGISTER_FAIL, payload: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          error: authFailMessage(error.code)
        }})
      })
  }
}

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email is invalid.'
    case 'auth/user-disabled':
      return 'User is disabled.'
    case 'auth/user-not-found':
      return 'User not found.'
    case 'auth/wrong-password':
      return 'Password is invalid.'
    case 'auth/email-already-in-use':
      return 'Email address is already in use.'
    case 'auth/weak-password':
      return 'Password is not strong enough.'
    default:
      return 'Authentication failed.'
  }
};

const initialState = {
  error: "",
  loading: false,
  user: null,
  userRole: null
}

export const authReducer = (state=initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case types.LOGIN_REQUEST: {
      return { ...state, ...initialState, loading: true }
    }

    case types.LOGIN_SUCCESS: {
      return { ...state, ...initialState, ...payload }
    }

    case types.LOGIN_FAIL: {
      return { ...state, ...initialState, ...payload }
    }

    case types.REGISTER_REQUEST: {
      return { ...state, ...initialState, loading: true }
    }

    case types.REGISTER_SUCCESS: {
      return { ...state, ...initialState, ...payload }
    }

    case types.REGISTER_FAIL: {
      return { ...state, ...initialState, ...payload }
    }

    default: {
      return state
    }
  }
}
