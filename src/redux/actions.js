import {
  UPDATE_MSG, UPDATE_MSGLIST, UPDATE_USERNAME, UPDATE_USERNAMELIST
} from './constants';

export const updateMessage = (payload) => ({
  type: UPDATE_MSG,
  payload
});

export const updateMessageList = (payload) => ({
  type: UPDATE_MSGLIST,
  payload
});

export const updateUsername = (payload) => ({
  type: UPDATE_USERNAME,
  payload
});