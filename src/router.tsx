import React from 'react';
import { Icon } from 'antd';
import {
  Upload,
  TableForm,
  GpsMap,
  ReduxHook,
  TradingView,
  DragSort,
  IndexDB,
  // Flow
} from './pages';

const configRouter = [
  {
    key: 'upload',
    name: '上传组件',
    icon: <Icon type="cloud-upload" />,
    dom: Upload,
  },
  {
    key: 'table',
    name: '可编辑表格',
    icon: <Icon type="form" />,
    dom: TableForm,
  },
  {
    key: 'map',
    name: '高德GPS轨迹',
    icon: <Icon type="environment" />,
    dom: GpsMap,
  },
  {
    key: 'redux',
    name: '基于Hooks的Redux',
    icon: <Icon type="database" />,
    dom: ReduxHook,
  },
  {
    key: 'trading',
    name: 'tradingView',
    icon: <Icon type="line-chart" />,
    dom: TradingView,
  },
  {
    key: 'drag',
    name: '拖拽排序',
    icon: <Icon type="ordered-list" />,
    dom: DragSort,
  },
  {
    key: 'indexDB',
    name: 'indexDB实践',
    icon: <Icon type="database" />,
    dom: IndexDB,
  }
]

export default configRouter