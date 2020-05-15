import React from 'react';
import UDFCompatibleDatafeed from "./udf";
 
const win: any = window;

interface Props {
  getKline: (data: any) => any;
}

class TVChartContainer extends React.Component<Props> {

  tvWidget: any;

  state = {
    interval: '30',
    containerId: "tv_chart_container",
    datafeedUrl: "ws://39.104.136.10:8000",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
    theme: 'Light',
    timezone: "Asia/Shanghai",
    resolutions: [
      "1",
      "3",
      "5",
      "15",
      "30",
      "60",
      "120",
      "240",
      "360",
      "720",
      "1D",
      "3D",
      "1W",
      "1M"
    ],
    symbol: "abt_usdt"
  }

  widget = win.TradingView.widget;

  getLanguageFromURL = () => {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // let that = this;
  initData = {
    interval: this.state.interval,
    wsURL: `${this.state.datafeedUrl}/stream`,
    // 建立ws链接后首次订阅消息
    chart: {
      resolutions: this.state.resolutions,
      // resolutionsToKtype: this.state.resolutionsToKtype
    },
    // symbol 配置
    symbolResolveConf: {
      name: this.state.symbol,
      minmov: 1,
      minmov2: 0,
      pointvalue: 1,
      session: "0000-2359:1234567", // 交易日配置
      has_intraday: true, // 是否有日内数据
      description: this.state.symbol,
      type: "stock", // 股票
      // exchange: "ABT", // 交易所
      supported_resolutions: this.state.resolutions,
      intraday_multipliers: this.state.resolutions, // 这是一个包含日内分辨率(分钟单位)的数组，激活分钟,要想取到多少分钟需要在这同时设置
      pricescale: 10000, // 右侧数价格精度
      // has_weekly_and_monthly: true,
      has_daily: true,
      has_seconds: true,
      ticker: this.state.symbol,
      volume_precision: 3, // 交易量精度
      timezone: this.state.timezone, // 时区
      // base_name: [that.chartParams.symbol],
      // legs: [that.chartParams.symbol],
      // full_name: that.chartParams.symbol,
      // pro_name: that.chartParams.symbol,

      seconds_multipliers: ["1s", "5s"],
      has_empty_bars: true
    }
  };

  widgetOptions = {
    symbol: this.state.symbol, // 币对名称
    // BEWARE: no trailing slash is expected in feed URL
    // datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl), // k线数据
    datafeed: new UDFCompatibleDatafeed(
      this,
      {
        supports_search: true,
        supports_group_request: true,
        supported_resolutions: this.initData.chart.resolutions,
        intraday_multipliers: this.initData.chart.resolutions,
        supports_marks: true,
        supports_timescale_marks: true
      },
      this.initData
    ), // k线数据
    interval: this.state.interval, // 默认k线间隔
    container_id: this.state.containerId, // dom元素id
    timezone: this.state.timezone,    //默认时区
    library_path: this.state.libraryPath, // tradingView静态文件路径
    locale: this.getLanguageFromURL() || "zh", // 语言
    disabled_features: [
      // 禁用功能
      // "control_bar", // 底部导航按钮
      "volume_force_overlay", // 数量是否于k线图显示在一起（底部总量）
      "header_compare", // 左上角币种对比
      // "timeframes_toolbar", // 左下脚时间选择
      // "header_undo_redo", // 撤销按钮
      "header_saveload", // 右上角保存按钮
      "header_interval_dialog_button", //
      // "header_symbol_search", // 币对查询
      "use_localstorage_for_settings"
    ],
    enabled_features: [
      // 启用功能
      "study_templates",
      "seconds_resolution" // 启用秒周期
    ],
    charts_storage_url: this.state.chartsStorageUrl, // 高级别保存加载
    charts_storage_api_version: this.state.chartsStorageApiVersion, // 后台版本
    client_id: this.state.clientId, // 高级别保存加载
    user_id: this.state.userId, // 高级别保存加载
    fullscreen: this.state.fullscreen, // 默认是否全屏功能
    autosize: this.state.autosize, // 自适应大小
    studies_overrides: this.state.studiesOverrides, // 自定义默认指标的样式及输入值
    theme: this.state.theme, // 主题
    customFormatters: {
      timeFormatter: {
        format: function (date: any) {
          var _format_str = "%h:%m";
          return _format_str
            .replace("%h", date.getUTCHours())
            .replace("%m", date.getUTCMinutes())
            .replace("%s", date.getUTCSeconds());
        }
      },
      dateFormatter: {
        format: function (date: any) {
          const month = date.getUTCMonth() + 1
          return (
            date.getUTCFullYear() +
            "-" +
            month +
            "-" +
            date.getUTCDate()
          );
        }
      }
    }
  };

  componentDidMount = () => {
    const tvWidget = new this.widget(this.widgetOptions);

    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      // 当图表初始化并准备就绪时，图表库将调用提供的回调。 你可以从这一刻安全地调用所有其他方法。
      tvWidget.headerReady().then(() => {
        // 返回一个Promise对象，该对象应该在图表库头部widget API准备就绪时用于处理其他事件（例如: createButton）。
        // const button = tvWidget.createButton();
        // button.setAttribute("title", "Click to show a notification popup");
        // button.classList.add("apply-common-tooltip");
        // button.addEventListener("click", () =>
        //   tvWidget.showNoticeDialog({
        //     title: "Notification",
        //     body: "TradingView Charting Library API works correctly",
        //     callback: () => {
        //       // eslint-disable-next-line no-console
        //       // console.log('Noticed!');
        //     }
        //   })
        // );
        // button.innerHTML = "Check API";
        tvWidget
          .chart()
          .onIntervalChanged()
          .subscribe(null, (interval: any, obj: any) => {
            if (!tvWidget.canSendNext) {
              return false;
            }
            tvWidget.canSendNext = false;
            // 限制点击频率
            setTimeout(() => {
              tvWidget.canSendNext = true;
            }, 300);
            this.setState({
              ...this.state,
              interval: interval
            })
          });
        let color = [
          "#ff5fc4",
          "#965fc4",
          "#84aad5",
          "#55b263",
          "#b7248a",
          "#ff5fc4"
        ]; // 均线颜色
        let tarr: any = this.state.resolutions;
        tarr.forEach(function (t: any, n: any) {
          // 控制显示哪些均线
          if (n > 0 && n < 5) {
            tvWidget
              .chart()
              .createStudy("Moving Average", !1, !1, [t], function () { }, {
                "plot.color.0": color[n]
              });
          }
        });
      });
    });
  }

  componentWillUnmount = () => {
    // 页面销毁前清除图表
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div className="TVChartContainer" id="tv_chart_container" style={{height: 'calc(80vh)'}}/>
    )
  }
}

export default TVChartContainer