/**
 * @author rongqb@yonyou.com
 * @date 20180805
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getSetting(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/feed/setting`)
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

export function updateSetting(params = {}) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/feed/setting`, {
                background: params.background,
                thumbBackground: params.thumbBackground || (params.background ? `${params.background}.thumb.jpg` : ''),
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

export function getList(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/feed/record/list`, {
                params: {
                    startTime: params.startTime || 0,
                    endTime: params.endTime || Date.now(),
                    keyword: params.keyword || '',
                    size: params.size || 20,
                    start: params.start || 0,
                    status: params.status || 'PASS', //pending, PASS, REJECT 
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
 * 审核单条动态
 * @param {*} params 
 */
export function auditing(params = {}) {
    if (params &&
        params.activityId &&
        params.feedId) {
        axios.patch(`/rest/v1/activity/${params.activityId}/feed/record/${params.feedId}/status`, {
                params: { 
                    status: params.status || 'PASS', //PENDING, PASS, REJECT 
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
 * 批量审核活动动态
 * @param {*} params 
 */
export function batchAuditing(params = {}) {
    if (params &&
        params.activityId &&
        params.feedIds) {
        axios.put(`/rest/v1/activity/${params.activityId}/feed/record/batch/status`, params.feedIds, {
                params: {
                    status: params.status || 'PASS', //PENDING, PASS, REJECT 
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
 * 增量拉取发言数据, 投屏用
 * @param {*} params 
 */
export function incremental(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/feed/record/incremental/${params.ts || Date.now()}`)
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