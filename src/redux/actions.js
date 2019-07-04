import {
  UPDATE_MSG, UPDATE_MSGLIST, UPDATE_USERNAME, UPDATE_USERCOUNT
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

export const updateUserCount = (payload) => ({
  type: UPDATE_USERCOUNT,
  payload
})