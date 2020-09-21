import React from 'react'
import {logout} from '../../store/actions/auth'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import s from './Logout.module.scss'
 
class Logout extends React.Component {
  componentDidMount() {
    this.props.logout()
  }

 render() {
  return (
   <Redirect to="/" />
  );
 }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)