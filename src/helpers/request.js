import axios from 'axios'
import baseURLConfig from './config-baseURL'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
             option.params = data
        } else {
             option.data = data
        }
        axios(option).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(error => {
            console.error({msg:'网络异常'})
            reject({msg:'网络异常'})
            
        })
    })
}


