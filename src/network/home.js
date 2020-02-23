import {request} from './request';

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  // 请求那种数据的函数两个参数为什么是type和page 
  // /home/data?type=sell&page=1   type决定请求类型 page决定请求范围
  return request({
    url:'/home/data',
    params:{
      type,
      page
    },
  })
}
