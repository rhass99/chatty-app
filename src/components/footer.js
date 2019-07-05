import React from 'react'
import {footerContainer, mapDispatchToProps, mapStateToProps} from './container'
import { connect } from 'react-redux';

const Footer = (props) => {
  // Client ws Listener
  props.socket.onmessage = ((message) => {
    const msg = JSON.parse(message.data)
    console.log(msg[0])
    switch(msg[0].purpose) {
      case("count"):
        console.log(msg[0].count);
        //push to redux
        props.handleUpdateConnectedUsers(msg[0].count)
        break;
      case("text"):
        JSON.parse(message.data).forEach(x => props.handleUpdateMessageList(x))
    }
  })

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
      value={props.message}
      onChange={props.handleUpdateMessage}
      onKeyPress={
        (e) => {
          if (e.key == 'Enter') {
            props.socket.send(JSON.stringify(
              {
              text: props.message,
              user: props.username
              })
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