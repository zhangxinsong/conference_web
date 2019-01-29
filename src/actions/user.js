/**
 * user接口
 * @author rongqb@yonyou.com
 * @date 20180714
 */
import axios from 'axios';
import config from 'app_src/config/';

const conference_user_info_key = 'conference_user_info';

/**
 * 获取用户持久化信息
 * rongqb@yonyou.com 20180716
 */
export function getUserInfo() {
    let info = sessionStorage.getItem(conference_user_info_key);
    if (info) {
        try {
            info = JSON.parse(info);
        } catch (e) {
            info = {};
        }
    }
    return info || {};
}

/**
 * 存储用户持久化信息
 * rongqb@yonyou.com 20180716
 */
export function setUserInfo(params) {
    let info = getUserInfo();
    Object.assign(info, params || {});
    sessionStorage.setItem(conference_user_info_key, JSON.stringify(info));
    return info;
}

/**
 * 清除用户持久化信息
 * rongqb@yonyou.com 20180716
 */
export function clearUserInfo(params) {
    sessionStorage.removeItem(conference_user_info_key);
}


/**
 * 客户端code换token
 * rongqb@yonyou.com 20180717
 */
export function getUserTokenByCode(params = {}) {
    if (params &&
        params.code) {
        axios.post(`/rest/v1/auth/code/${params.code}`)
            .then(function(response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function(error) {
                params.error && params.error(error);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
}