import { wrapServer } from '../../request/axios';
import api from '../../request/api';

export enum ACTION_TYPE {
  GETDATA = 'GETDATA',
}

export const getData = (params: any) => {
  return {
    type: ACTION_TYPE.GETDATA,
    promise: wrapServer({
      method: 'get',
      url: api.getData,
      params,
    }),
  };
};

export default {
  ACTION_TYPE,
};