/**
 * @author rongqb@yonyou.com
 * @date 20180811
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

/**
 * 获取大会应用列表
 * @param {*} params 
 */
export function getList(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/app`)
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
 * 更改大会应用状态
 * @param {*} params 
 */
export function update(params = {}) {
    if (params &&
        params.appId &&
        params.conferenceId) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/app/${params.appId}/status`, null, {
                params: {
                    enable: !!params.enable,
                    memberId: params.memberId
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