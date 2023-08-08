import axios from "axios"
import md5 from 'md5'

/** 获取icode */
const getIcode = () => {
  const e = parseInt(Date.now() / 1e3),
    t = e + 'LGD_Sunday-1991-12-30'
  return { icode: md5(t), time: e }
}

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

/** 请求拦截器 */
const requestHandler = (config) => {
    const { icode, time } = getIcode()
    config.headers.icode = icode
    config.headers.codetype = time
    return config
}

service.interceptors.request.use(requestHandler, (error) => {
return Promise.reject(error)
})

export default service