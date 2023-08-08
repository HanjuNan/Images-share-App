import axios from "axios"
import md5 from 'md5'


// console.log(import.meta.env.VITE_BASE_API);



const service = axios.create({
    //根据项目的状态,自动切换请求的服务地址
    baseURL: 'import.meta.env.VITE_BASE_API',
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