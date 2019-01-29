import zhs from './lang/zh-CN'
import zht from './lang/zh-TW'
import en from './lang/en-US'

let langObject = {
    zhs,
    zht,
    en
}

let langType = 'zhs'
let lang = langObject[langType]

export const t = function (opt) {
    if(typeof opt != 'string') return ''

    let array = opt.split('.')
    let value = lang
    array.forEach((key) => {
        value = value[key] || null
    })
    return value || opt || ''
}

export const locale = function (l) {
    langType = l
    lang = langObject[l] || langObject.zhCN
}

export default {
    t,
    locale
}
