import { combineReducers } from 'redux';

import { default as user } from './user';
import { default as indexDB } from './indexDB';

export default combineReducers({
  user,
  indexDB
})