import getQuery from './get-query'
export default function ({callback, url}) {
    const code = getQuery(window.location.href, 'code') // 获取验证code
    const cookie = ''
    const token = ''
    let $sign = JSON.parse(localStorage.getItem('$sign')) || {}
    if(code) { // 如果code存在
        if($sign && $sign.code !== code) { // 存储当中的code不等于当前code，通过code获取userInfo，token
            $sign = {
    
            }
        }
    }
    
    if (cookie) { // 如果cookie存在
        if ($sign && token.cookie !== cookie) { // 如果token存在 并且保存进入的cookie等于获取到的cookie直接使用token
            $sign = {

            }
        }
    }

    if (callback && typeof callback === 'function') {
        return callback($sign)
    }
    return $sign
}
