import React from 'react'
import { connect } from 'react-redux'

import s from './Layout.module.scss'

import MenuToggler from '../../Components/Navigation/MenuToggle/MenuToggle.jsx'
import Drawer from '../../Components/Navigation/Drawer/Drawer.jsx'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }))
  }

  render() {
    return (
      <div className={s.layout}>
        <Drawer
          isOpen={this.state.menuOpen}
          onBackdropClick={this.toggleMenu}
          isAuth={this.props.isAuth}
        />
        <MenuToggler
          isOpen={this.state.menuOpen}
          onToggle={this.toggleMenu} />

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token
  }
}


export default connect(mapStateToProps)(Layout)