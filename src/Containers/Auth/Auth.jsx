import React from 'react'
import is from 'is_js'
import { connect } from 'react-redux'
import {auth} from '../../store/actions/auth'

import s from './Auth.module.scss'

import Button from '../../Components/UI/Button/Button.jsx'
import Input from '../../Components/UI/Input/Input'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.changeInputHandle = this.changeInputHandle.bind(this)
    this.loginHandler = this.loginHandler.bind(this)
    this.registerHandler = this.registerHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)


    this.state = {
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          placeholder: 'email',
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          placeholder: 'password',
          validation: {
            required: true,
            minLength: 6
          }
        }
      }
    }
  }

  changeInputHandle(event, controlName) {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(cn => {
      isFormValid = formControls[cn].valid
    })

    this.setState(() => ({ formControls, isFormValid }))
  }

  validateControl(value, validation) {
    if (!validation) return true

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // isValid = re.test(String(value).toLowerCase()) && isValid
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  loginHandler() {
    const {email: {value: emailValue}, password: {value: passwordValue}} = this.state.formControls
    this.props.auth(emailValue, passwordValue, true)

    // try {
    //   const authData = {
    //     email: this.state.formControls.email.value,
    //     password: this.state.formControls.password.value,
    //     returnSecureToken: true
    //   }
    //   const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARnowBuE6d-B83yQotuWE-WhNLlCc7A_M`, authData)
    //   console.log(response.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  registerHandler() {
    const {email: {value: emailValue}, password: {value: passwordValue}} = this.state.formControls
    this.props.auth(emailValue, passwordValue, false)

    // try {
    //   const authData = {
    //     email: this.state.formControls.email.value,
    //     password: this.state.formControls.password.value,
    //     returnSecureToken: true
    //   }
    //   const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARnowBuE6d-B83yQotuWE-WhNLlCc7A_M`, authData)
    //   console.log(response.data);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  submitHandler(event) {
    event.preventDefault()
  }

  renderInputs() {
    const inputs = Object.keys(this.state.formControls).map((name, i) => {
      const contol = this.state.formControls[name]
      return (
        <Input
          key={name + i}
          {...contol}
          shouldValidate={!!contol.validation}
          onChangeHandle={(event) => { this.changeInputHandle(event, name) }} />
      );
    })

    return inputs
  }

  render() {
    return (
      <div className={s['auth']}>
        <div className={s["auth__body"]}>
          <h2>Авторизация</h2>

          <form className={s['auth-form']} onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button
              onClick={this.loginHandler}
              type="green"
              disabled={!this.state.isFormValid}>Войти</Button>
            <Button
              onClick={this.registerHandler}
              type="bisque"
              disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)