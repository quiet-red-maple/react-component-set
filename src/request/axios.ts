import axios from 'axios';
import { message } from 'antd';

export const error = (response: any) => {
    message.error(response.data.msg);
    throw new Error(response.data);
};

export const server = axios.create({
  // baseURL:'http://some-domain.com/api/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
});

// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = localStorage.getItem("user");
  let token = null;
  if (user) {
    const users = JSON.parse(user);
    token = users.token
  }
  config.headers.token = token;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const wrapServer = (opt: any) => {
  return server
    .request({
      method: 'post',
      ...opt,
    })
    .then(response => {
      const data = response.data;
      if (data) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
    .catch(info => {
      return error(info);
    });
};

export const wrapServer1 = (opt: any) => {
  return server
    .request({
      method: 'post',
      ...opt,
    })
    .then(response => {
      const data = response.data;
      if (data) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
    .catch(info => {
      return error(info);
    });
};