import {
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/actionsTypes'


const initState = {
  token: null
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, token: action.idToken }

    case AUTH_LOGOUT:
      return { ...state, token: null }

    default:
      return state
  }
}