import { wrapServer1 } from '../../request/axios';
import api from '../../request/api';

export enum ACTION_TYPE {
  GET_KLINE = 'GET_KLINE',
}

export const getKline = (params: any) => {
  const {symbol, interval } = params;
  delete params.symbol;
  delete params.interval;
  return {
    type: ACTION_TYPE.GET_KLINE,
    promise: wrapServer1({
      method: 'get',
      url: `${api.getKline}/${symbol}/${interval}`,
      params
    }),
  };
};

export default {
  ACTION_TYPE,
};