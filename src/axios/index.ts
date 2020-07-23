import Axios from 'axios';
import store from '../store'
import { Toast } from 'vant';

const axios = Axios.create()

axios.defaults.baseURL = store.state.urlPrefix; // 请求的默认域名
// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
  }
  config.data = JSON.stringify(config.data); // 处理数据
  return config;
},
  err => {
    return Promise.reject(err);
  });
// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.data.success === false) {
    Toast('网络请求错误')
  }
  return res.data;
}, err => {
  console.log(err)
  console.log('网络连接错误，请重试！');
  Toast('网络连接错误')
})

export default axios