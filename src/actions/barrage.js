/**
 * @author rongqb@yonyou.com
 * @date 20180805
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

/**
 * 获取互动投屏配置
 * @param {*} params 
 */
export function getList(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/barrage/setting`)
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

/**
 * 清空互动投屏配置
 * @param {*} params 
 */
export function clear(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/barrage/record?memberId=${params.memberId}`)
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

/**
 * 更新活动弹幕设置
 * @param {*} params 
 */
export function update(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/barrage/setting?memberId=${params.memberId}`, {
                backgroundUrl: params.backgroundUrl,
                thumbBackground: params.thumbBackground || (params.backgroundUrl ? `${params.backgroundUrl}.thumb.jpg` : ''),
                barrageSize: params.barrageSize,
                barrageSpeed: params.barrageSpeed,
                circulation: params.circulation,
                conferenceId: params.conferenceId,
                // ctime: params.ctime || 0,
                // utime: params.utime || 0,
                fullScreen: !!params.fullScreen,
                id: params.id || '',
            })
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