import {
  UPDATE_MSG, UPDATE_MSGLIST, UPDATE_USERNAME, UPDATE_USERCOUNT
} from './constants';

const chatReducer = (state={}, {type, payload}) => {
  switch(type) {
    case UPDATE_MSG:
      return {
        ...state,
        message : payload
      }
    case UPDATE_MSGLIST:
      return {
        ...state,
        messageList : [...state.messageList, payload]
      }
    case UPDATE_USERNAME:
      return {
        ...state,
        username : payload
      }
    case UPDATE_USERCOUNT:
      return {
        ...state,
        connectedUsers: payload
      }
    default:
      return state;
  }
}

export default chatReducer;