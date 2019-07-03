import React, {Component} from 'react';

import {updateMessage, updateMessageList, updateUsername} from '../redux/actions';

export const mapStateToProps = (initial) => {
  const {username, message, messageList} = initial;
  return {username, message, messageList}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateUsername: (e) => {
      dispatch(updateUsername({
        username: e.target.value,
      }))
    },
    handleUpdateMessage: (e) => {
      dispatch(updateMessage({
        message: e.target.value,
      }))
    },
    handleUpdateMessageList: (newMessage) => {
      console.log("worked")
      dispatch(updateMessageList(newMessage))
    }
  }
}


export const messagesContainer = (Messages) => (
  class extends Component {
    render() {
      const { messageList } = this.props;
      return (
      <Messages
        messageList={messageList}
        />
      )
    }
  }
)

export const footerContainer = (Footer) => (
  class extends Component {
    render() {
      const conn = new WebSocket('ws://localhost:3001')
      const { username, message, messageList, handleUpdateMessageList, handleUpdateMessage, handleUpdateUsername} = this.props;
      return (
        <Footer 
        socket={conn}
        messageList={messageList}
        username={username}
        message={message}
        handleUpdateMessageList={handleUpdateMessageList}
        handleUpdateMessage={handleUpdateMessage}
        handleUpdateUsername={handleUpdateUsername}
        />
      )
    }
  }
)