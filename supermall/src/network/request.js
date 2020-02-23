import axios from 'axios'

export function request(config){
    const instance = axios.create({
    // baseURL:'http://123.207.32.32:8000/api/hy/',
    baseURL:'http://106.54.54.237:8000//api/hy/',
    timeout:5000
  })
  // axiso的拦截器
  // 用来做请求加载时的过渡动画(圆圈一直转之类的)
  // 或者检测是否携带了特殊信息 比如登录时的tonken之类的 
  // 经常用
  // 1.请求拦截
  instance.interceptors.request.use(aaa =>{
    // console.log(aaa);
    return aaa
  }),err =>{
    // console.log(err);
  }

  // 2.响应拦截
  instance.interceptors.response.use(res =>{
    // console.log(res);
    return res.data
  }),err =>{
    console.log(err);
  }

    return instance(config)
    // 这里记住 instance返回的是个Promise 底层就这么写的 
}
