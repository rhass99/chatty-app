import {createStore} from 'redux';

import chatReducer from './reducers';
import initialState from './initialState';

export default createStore(chatReducer, initialState);