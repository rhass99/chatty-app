import React from 'react'
import {footerContainer, mapDispatchToProps, mapStateToProps} from './container'
import { connect } from 'react-redux';

const Footer = (props) => {
  // props.socket.onmessage = (message) => {console.log(message)}
  console.log(props.messageList)
  return (  
    <footer className="chatbar">
      <input 
      className="chatbar-username" 
      placeholder="Your Name (Optional)"
      onChange={props.handleUpdateUsername}
      />
      <input 
      className="chatbar-message" 
      placeholder="Type a message and hit ENTER"
      onChange={props.handleUpdateMessage}
      onKeyPress=
      {
        (e) => {
          if (e.key === 'Enter') {
            props.handleUpdateMessageList(
              {
              id: Math.random().toString().replace('0.', ''),
              type: "sys",
              text: "This is a text",
              user: "rami"
              }
            )
          }
        } 
      }
      />
    </footer>
  )
}

const FooterCMP = connect(mapStateToProps, mapDispatchToProps)(footerContainer(Footer))
export default FooterCMP