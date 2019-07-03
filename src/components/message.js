import React from 'react'
import { mapStateToProps, mapDispatchToProps, messagesContainer } from './container';
import { connect } from 'react-redux';

const SysMessage = (props) => (
  <div className="message system">
    {props.message.text}
  </div>
)

const TextMessage = (props) => (
  <div className="message">
  <span className="message-username">{props.message.user}</span>
  <span className="message-content">{props.message.text}</span>
  </div>
)

const Message = (props) => {
  console.log(props.messageList)
  return (
    <div>
    {props.messageList.map(message => (message.type === "sys" ? <SysMessage key={message.id} message={message}/> : <TextMessage key={message.id} message={message}/>))}
    </div>
  )
}

const MessageCMP = connect(mapStateToProps, mapDispatchToProps)(messagesContainer(Message))
export default MessageCMP