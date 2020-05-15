import { handle } from 'redux-pack';
import { USER } from '../actions';

const { ACTION_TYPE } = USER;

export const initStates = {
  data: [],
  loading: {},
};

export default (state = initStates, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.GETDATA:
      return handle(state, action, {
        start: prevState => ({ ...prevState, loading: true }),
        failure: prevState => ({ ...prevState, data: state.data }),
        success: prevState => ({...prevState, data: payload.data }),
        finish: prevState => ({ ...prevState, loading: false }),
      });
    default:
      return state;
  }
};