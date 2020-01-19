import axios from 'axios'

const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  baseURL: 'http://localhost:9090'
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})


/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}


