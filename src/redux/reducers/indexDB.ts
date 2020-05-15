import { indexDB } from '../actions';

const { ACTION_TYPE } = indexDB;

export const initStates = {
  data: [],
  loading: {},
};

export default (state = initStates, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.SET_DATA:
      return {
        ...state,
        data: payload
      }
    default:
      return state;
  }
};