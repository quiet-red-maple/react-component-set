import React from 'react';
import { Menu, Layout } from 'antd';
import { Route } from 'react-router-dom';
import configRouter from './router';
import './layout.css';

const { Header, Content } = Layout;

interface Props {
  history: any;
}

const Layouts = (props: Props) => {

  const gotoPage = (e: any) => {
    console.log(e)
    if (e.key === 'upload') {
      props.history.push(`/`)
      return
    }
    props.history.push(`/${e.key}`)
  }

  const MenuDom = configRouter.map((item, index) => {
    return (
      <Menu.Item key={item.key}>
        {item.icon}
        <span>{item.name}</span>
      </Menu.Item>
    )
  })

  const contentDom = configRouter.map((item, index) => {
    if (item.key === 'upload') {
      return <Route exact path={'/'} component={item.dom} key={index} />
    }
    return <Route path={`/${item.key}`} component={item.dom} key={index} />
  })

  let defaultSelectedKeys = window.location.pathname.split('/')[1];

  if (!defaultSelectedKeys) {
    defaultSelectedKeys = 'upload'
  }

  return (
    <div style={{ height: '100%' }}>
      <Header className="header">
        <div className="login">
          组件封装预览
        </div>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{ width: '100%' }}
        >
          <Menu.Item key="header">
          </Menu.Item>
        </Menu>
      </Header>
      <div className="layout_content" style={{ height: 'calc(100% - 64px)' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          onClick={gotoPage}
        >
          {MenuDom}
        </Menu>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {contentDom}
        </Content>
      </div>
    </div>
  );
}

export default Layouts