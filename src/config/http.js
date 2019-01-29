/**
 * axios 全局处理
 * @author rongqb@yonyou.com
 * @date 20180714
 * @api: https://www.kancloud.cn/yunye/axios/234845
 * Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
 * Features：
 *  1.从浏览器中创建 XMLHttpRequests
    2.从 node.js 创建 http 请求
    3.支持 Promise API
    4.拦截请求和响应
    5.转换请求数据和响应数据
    6.取消请求
    7.自动转换 JSON 数据
    8.客户端支持防御 XSRF
 */
import Vue from 'vue';
import axios from 'axios';
import config from './index';
import lang from 'app_src/languages/';
import { getUserInfo, clearUserInfo } from 'app_src/actions/user';

axios.defaults.timeout = 10000;

/**
 * 添加请求拦截器
 * 在请求或响应被 then 或 catch 处理前拦截它们。
 * 一处拦截器： axios.interceptors.request.eject(interceptor);
 * 一处拦截器： axios.interceptors.response.eject(interceptor);
 */
axios.interceptors.request.use(
    options => {
        let url = options.url,
            apiHost = config.apiHost || '';
        if (!/^https?:\/\//i.test(url)) { // 全局拦截

            url = url.replace(/^\/*/, '\/');
            // if (__ENV__ === 'development') { //开发环境
            //     url = window.location.origin + url;
            // } else {
            url = apiHost + url;
            // }
        }

        // try {
        //     options.url = url.replace(/(?<!(?:https?\:))\/+/gi, '\/'); //全局去掉多余的斜杠
        // } catch (e) {
        try {
            options.url = url.replace(/\/+/gi, '\/').replace(/(https?\:)\/+/, '$1//');
        } catch (e) {
            options.url = url;
        }
        // }
        //除了获取token的接口请求都要自动带上token
        return options;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(
    response => {
        console.log('axios.response:', response);
        return response.data;
    },
    error => {
        console.error('axios.error:', error);
        /**
         * 认证失败
         */
        if (error) {
            if ((error.request &&
                    error.request.status == 401) ||
                (error.response &&
                    error.response.status == 401)) {
                clearUserInfo();
            }
            if (error.response &&
                error.response.status > 500) {

            }
        }
        return Promise.reject(error);
    }
);

/**
 * axios 请求选项
 *  axios.request(config)
    axios.get(url[, config])
    axios.delete(url[, config])
    axios.head(url[, config])
    axios.post(url[, data[, config]])
    axios.put(url[, data[, config]])
    axios.patch(url[, data[, config]])
 * 
 * 这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。
 * {
    // `url` 是用于请求的服务器 URL
    url: '/user',

    // `method` 是创建请求时使用的方法
    method: 'get', // 默认是 get

    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',

    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }],

    // `headers` 是即将被发送的自定义请求头
    headers: {'X-Requested-With': 'XMLHttpRequest'},

    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
        ID: 12345
    },

    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },

    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: {
        firstName: 'Fred'
    },

    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 1000,

    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的

    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    adapter: function (config) {
    },

    // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    auth: {
            username: 'janedoe',
            password: 's00pers3cret'
        },

        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: 'json', // 默认的

        // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
        xsrfCookieName: 'XSRF-TOKEN', // default

        // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
        xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function(progressEvent) {
            // 对原生进度事件的处理
        },

        // `onDownloadProgress` 允许为下载处理进度事件
        onDownloadProgress: function(progressEvent) {
            // 对原生进度事件的处理
        },

        // `maxContentLength` 定义允许的响应内容的最大尺寸
        maxContentLength: 2000,

        // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
        validateStatus: function(status) {
            return status >= 200 && status < 300; // 默认的
        },

        // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
        // 如果设置为0，将不会 follow 任何重定向
        maxRedirects: 5, // 默认的

        // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
        // `keepAlive` 默认没有启用
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),

        // 'proxy' 定义代理服务器的主机名称和端口
        // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
        // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
        proxy: {
            host: '127.0.0.1',
            port: 9000,
            auth::{
                username: 'mikeymike',
                password: 'rapunz3l'
            }
        },

        // `cancelToken` 指定用于取消请求的 cancel token
        // （查看后面的 Cancellation 这节了解更多）
        cancelToken: new CancelToken(function(cancel) {})
    } 
}
*/

Vue.prototype.$axios = axios;