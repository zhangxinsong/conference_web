/**
 * @author rongqb@yonyou.com
 * @date 20180723
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function updatePrize(params) {
    if (params &&
        params.activityId) {
        (axios[params.prizeId ? 'put' : 'post'])(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/${params.prizeId || ''}`, {
            amount: params.amount || 0,
            image: params.image || '',
            prize: params.prize || '',
            prizeName: params.prizeName || '',
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

export function getList(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/list`)
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

export function deletePrize(params) {
    if (params &&
        params.activityId &&
        params.prizeId) {
        axios.delete(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/${params.prizeId}`, {
                amount: params.amount || 0,
                image: params.image || '',
                prize: params.prize || '',
                prizeName: params.prizeName || '',
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
 * 更新奖品对应黑名单
 * @param {*} params 
 */
export function updateBlackList(params) {
    if (params &&
        params.activityId &&
        params.prizeId) {
        axios.put(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/${params.prizeId}/blacklist`, {
                blacklist: params.blacklist || []
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
 * 获取奖品黑名单列表
 * @param {*} params 
 */
export function getBlackList(params) {
    const info = userActions.getUserInfo();
    if (params &&
        params.activityId &&
        params.prizeId &&
        info.userInfo) {
        axios.get(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/${params.prizeId}/${info.userInfo.qzId}/blacklist/list`, {
                params: {
                    size: params.size || 20,
                    start: params.start || 0,
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
 * 删除奖品黑名单，单个用户删除
 * @param {*} params 
 */
export function removeFromBlackList(params) {
    if (params &&
        params.activityId &&
        params.memberId &&
        params.prizeId) {
        axios.delete(`/rest/v1/activity/${params.activityId}/lottery/setting/prize/${params.prizeId}/blacklist/${params.memberId}`)
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
 * 获取活动获奖名单
 * @param {*} params 
 */
export function getWinnerList(params) {
    if (params &&
        params.prizeId &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/lottery/record/${params.prizeId}/list`, {
                params: {
                    size: params.size || 20,
                    start: params.start || 0,
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