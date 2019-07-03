import {
  UPDATE_MSG, UPDATE_MSGLIST, UPDATE_USERNAME
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