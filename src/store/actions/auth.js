import {
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './actionsTypes'
import axios from 'axios';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARnowBuE6d-B83yQotuWE-WhNLlCc7A_M'
    if (isLogin) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARnowBuE6d-B83yQotuWE-WhNLlCc7A_M'

    const response = await axios.post(url, authData)
    const data = response.data
    const experationDate = new Date(Date.now() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('experationDate', experationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('experationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function authSuccess(idToken) {
  return {
    type: AUTH_SUCCESS,
    idToken
  }
}

export function autoLogin() {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const experationDate = new Date(localStorage.getItem('experationDate'))
      if (experationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((experationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}