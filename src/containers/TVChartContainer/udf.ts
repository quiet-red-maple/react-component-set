import WebsocketHeartbeatJs from 'websocket-heartbeat-js';

// 格式化数据
function formatBarData(data: any) {
  data.forEach((item: any) => {
    item.time *= 1000;
  });
  return data;
}

const resolutions: any = {
  '1': '1m',
  '3': '3m',
  '5': '5m',
  '15': '15m',
  '30': '30m',
  '60': '1h',
  '120': '2h',
  '240': '4h',
  '360': '6h',
  '720': '12h',
  'D': '1d',
  'W': '1w',
  'M': '1M'
}

export default class UDFCompatibleDatafeed {
  getData: any;
  _udfConfig: any;
  _symbolInfo: any;
  _lastKlineTime: any;
  allSymbol: any;
  _ws: any;

  constructor(getData: any, udfConfig: any, symbolInfo: any) {
    this.getData = getData;
    this._udfConfig = udfConfig;
    this._symbolInfo = symbolInfo;
    this._lastKlineTime = null;
    this.allSymbol = [];
    this._ws = null;
  }
  // 此方法可以设置图表库支持的图表配置。这些数据会影响到图表支持的功能，所以它被称为服务端定制。
  onReady = (callback: any) => {
    setTimeout(() => {
      callback(this._udfConfig);
    }, 0)

    // // 查询所有币对列表
    // this._vue.$api.getAllSymbol()
    //   .then(
    //     res => {
    //       if (!res.error) {
    //         const newSymbolList = res.map((item, index) => {
    //           return {
    //             "symbol": item.name,
    //             "full_name": item.name,
    //             "description": item.name,
    //             "ticker": item.name,
    //             "exchange": "ABT",
    //             "type": "stock"
    //           }
    //         })
    //         this.allSymbol = newSymbolList
    //       }
    //     }
    //   )
  }
  // search symbols 如果不需要返回空数组
  searchSymbols(userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) {
    // onResultReadyCallback(this.allSymbol);
    onResultReadyCallback([]);
  }

  // resolve symbol config 方法介绍：通过商品名称解析商品信息(SymbolInfo)。
  resolveSymbol(symbolName: any, onResolve: any, onError: any) {
    setTimeout(() => {
      onResolve(this._symbolInfo.symbolResolveConf);
    }, 0);
  }

  // 获取历史数据并渲染kline (初始化，切换interval，缩小界面k线不够时 都会调用)
  getBars(symbolInfo: any, resolution: any, rangeStartDate: any, rangeEndDate: any, onResult: any, onError: any, firstDataRequest: any) {
    if (firstDataRequest) {
      if (this._ws) {
        this._ws.close();
      }
      let ws_url = this._symbolInfo.wsURL + '?name=kline_' + resolutions[resolution] + '@' + symbolInfo.name;
      this._ws = new WebsocketHeartbeatJs({ url: ws_url });
      this._ws.onreconnect = function () {
        console.log('kline websocket reconnecting...');
      };
    }
    const nowData = new Date().valueOf();
    let params = {
      symbol: symbolInfo.name.toLowerCase(),
      interval: resolutions[resolution],
      start: rangeStartDate,
      end: firstDataRequest ? parseInt((nowData / 1000).toString()) : rangeEndDate
    };
    this.getData.props.getKline(params).then((res: any) => { // 获取时间段内的k线历史数据
      if (!res.error) {
        let _data = formatBarData(res.payload);
        if (_data.length) {
          this._lastKlineTime = _data[_data.length - 1].time;
          onResult(_data, { noData: false });
        } else {
          onResult([], { noData: true }); // 没有数据要停止，否则k线右上角一直显示 加载中……
        }
      } else {
        onResult([], { noData: true });
      }
    });
  }
  // 更新kline
  subscribeBars(symbolInfo: any, resolution: any, onTick: any, listenerGuid: any, onResetCacheNeededCallback: any) {
    let name = 'kline_' + resolutions[resolution] + '@' + symbolInfo.name.toLowerCase();
    this._ws.onmessage = (e: any) => { // ws的onmessage只能修改一次
      if (e.data === 'heartbeat') {
        return;
      }
      let data = JSON.parse(e.data);
      if (data.name === name) {
        data.data.time = data.data.time * 1000;
        if (this._lastKlineTime && this._lastKlineTime <= data.data.time) { // 最新的一条数据必须比最后一条的时间大
          this._lastKlineTime = data.data.time;
          onTick(data.data)
        }
      } else {
        console.log('unknown websocket message', e);
      }
    };
  }
  // 退订kline
  unsubscribeBars(listenerGuid: any) {
    this._ws.close();
    this._ws = null;
  }
  // 处理深度
  calculateHistoryDepth(resolution: any, resolutionBack: any, intervalBack: any) {
    return undefined;
  }

}