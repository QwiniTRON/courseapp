import React from 'react'

import s from './Drawer.module.scss'

import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop.jsx'


export default class Drawer extends React.Component {
  constructor(props) {
    super(props)

    this.handleNavigate = this.handleNavigate.bind(this)
  }

  handleNavigate() {
    this.props.onBackdropClick()
  }

  renderLinks(links) {
    return links.map((l, i) => (
      <li key={i}><NavLink onClick={this.handleNavigate} to={l.to} exact={l.exact}>{l.label}</NavLink></li>
    ))
  }

  render() {
    const cls = [s['drawer']]

    if (!this.props.isOpen) {
      cls.push(s['close'])
    }

    let links = [
      { to: '/', exact: true, label: 'Список' }
    ]

    if (this.props.isAuth) {
      links.push({ to: '/quiz-creator', exact: true, label: 'создать опрос' })
      links.push({ to: '/logout', exact: true, label: 'Выйти' })
    } else {
      links.push({ to: '/auth', exact: true, label: 'авторизация' })
    }

    return (
      <>
        {this.props.isOpen && <Backdrop onClick={this.props.onBackdropClick} />}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
          <p className={s["author"]}>QwiniTRON</p>
        </nav>
      </>
    );
  }
}