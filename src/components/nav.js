import React from 'react'
import {navContainer, mapDispatchToProps, mapStateToProps} from './container'
import { connect } from 'react-redux';

const Nav = (props) => (
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <h4 className="navbar-users">{`Usercount: ${props.connectedUsers}`}</h4>
  </nav>
)

const NavCMP = connect(mapStateToProps, mapDispatchToProps)(navContainer(Nav))

export default NavCMP