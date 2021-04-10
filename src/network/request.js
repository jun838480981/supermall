import axios from 'axios'

// 4。直接return 实例对象，实例对象上有then
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // axios的拦截器 
  // 请求拦截的作用
  instance.interceptors.request.use(config => {
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求是，都希望在界面中显示一个请求的图标
    // 3.某些网络请求（比如登录(token)）.必须携带一些特殊的信息
    // console.log(config);    //自定义命名
    return config;   // 拦截后需要将拦截信息返回
  }, err => {
    console.log(err);
  }
  )

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    console.log(err);
  }
  ) 
  
  // 2.发送真正的网络请求
  return instance(config)
  // 返回出去，再返回值那边进行then获取结果
}

// 3.通过Proimse进行回调
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://152.136.185.210:7878/api/m5/home',
//       timeout: 5000
//     })
    
//     // 2.发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }


// 2.通过config中的函数进行会带哦
// export function request(config) {
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/m5/home',
//     timeout: 5000
//   })
  
//   // 2.发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err => {
//       config.failure(err)
//     })
// }

// 1.通过回调函数封装
// export function request(config, success, failure) {
//   // 1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/m5/home',
//     timeout: 5000
//   })
  
//   // 2.发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }