export enum ACTION_TYPE {
  SET_DATA = 'SET_DATA',
}

export const setData = (params: any) => {
  return {
    type: ACTION_TYPE.SET_DATA,
    payload: params
  };
};

export default {
  ACTION_TYPE,
};