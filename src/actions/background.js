/**
 * @author rongqb@yonyou.com
 * @date 20180801
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

/**
 * 获取所有背景图
 * @param {*} params 
 */
export function getList(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/background`, {
                params: {
                    /**
                     * SIGN_UP, 报名背景图
                     * SIGN_IN, 签到背景图
                     * LIVE, 背景设置
                     * LOTTERY, 抽奖背景图
                     * BARRAGE, 弹幕背景图
                     * COMMON, 公共背景图
                     */
                    backgroundType: (params.backgroundType || 'COMMON').toUpperCase(),
                }
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

/**
 * 插入背景图,多图添加
 * @param {*} params 
 */
export function updateList(params = {}) {
    if (params &&
        params.background &&
        params.conferenceId) {
        axios.post(`/rest/v1/conference/${params.conferenceId}/background`, {
                /**
                 * SIGN_UP, 报名背景图
                 * SIGN_IN, 签到背景图
                 * LIVE, 背景设置
                 * LOTTERY, 抽奖背景图
                 * BARRAGE, 弹幕背景图
                 * COMMON, 公共背景图
                 */
                backgroundType: (params.backgroundType || 'COMMON').toUpperCase(),
                background: {
                    background: params.background || '',
                    backgroundId: params.backgroundId || '',
                    thumbBackground: params.thumbBackground || (params.background ? `${params.background}.thumb.jpg` : '')
                }
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

/**
 * 插入一张背景图，上传完背景图片后调用
 * @param {*} params 
 */
export function add(params = {}) {
    if (params &&
        params.background &&
        params.conferenceId) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/background`, {
                background: params.background || '',
                backgroundId: params.backgroundId || '',
                thumbBackground: params.thumbBackground || (params.background ? `${params.background}.thumb.jpg` : '')
            }, {
                params: {
                    backgroundType: (params.backgroundType || 'COMMON').toUpperCase(),
                }
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

/**
 * 删除指定的背景图
 * @param {*} params 
 */
export function remove(params = {}) {
    if (params &&
        params.backgroundId &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/background/${params.backgroundId}`, {
                params: {
                    backgroundType: (params.backgroundType || 'COMMON').toUpperCase(),
                }
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