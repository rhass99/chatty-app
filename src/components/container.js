import React, {Component} from 'react';

import {updateMessage, updateMessageList, updateUsername} from '../redux/actions';

export const mapStateToProps = (initial) => {
  const {username, message, messageList, socket} = initial;
  return {username, message, messageList, socket}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateUsername: (e) => {
      dispatch(updateUsername(e.target.value))
    },
    handleUpdateMessage: (e) => {
      dispatch(updateMessage(e.target.value))
    },
    handleUpdateMessageList: (newMessage) => {
      dispatch(updateMessageList(newMessage))
      dispatch(updateMessage(''))
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
      const { username, message, messageList, handleUpdateMessageList, handleUpdateMessage, handleUpdateUsername, socket} = this.props;
      return (
        <Footer
        socket={socket}
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