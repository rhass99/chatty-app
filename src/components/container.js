import React, {Component} from 'react';

import {updateMessage, updateMessageList, updateUsername, updateUserCount} from '../redux/actions';

export const mapStateToProps = (initial) => {
  const {username, message, messageList, socket, connectedUsers} = initial;
  return {username, message, messageList, socket, connectedUsers}
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
    },
    handleUpdateConnectedUsers: (userNumber) => {
      dispatch(updateUserCount(userNumber))
    }
  }
}

// Returns the message component with the messageList props
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

// Returns the footer component with the redux actions as props
export const footerContainer = (Footer) => (
  class extends Component {
    render() {      
      const { username, message, messageList, handleUpdateMessageList, handleUpdateMessage, handleUpdateUsername, socket, handleUpdateConnectedUsers} = this.props;
      return (
        <Footer
        socket={socket}
        messageList={messageList}
        username={username}
        message={message}
        handleUpdateMessageList={handleUpdateMessageList}
        handleUpdateMessage={handleUpdateMessage}
        handleUpdateUsername={handleUpdateUsername}
        handleUpdateConnectedUsers={handleUpdateConnectedUsers}
        />
      )
    }
  }
)

// Returns the nav component with the number of online users as props
export const navContainer = (Nav) => (
  class extends Component {
    render() {
      const { connectedUsers } = this.props
      return (
        <Nav 
        connectedUsers={connectedUsers}
        />
      )
    }
  }
)