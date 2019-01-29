/**
 * 参会人员接口
 * @author rongqb@yonyou.com
 * @date 20180806
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

/**
 * 新增/更新参会人员
 * @param {*} params 
 */
export function update(params = {}) {
    if (params &&
        params.conferenceId) {
        (axios[params.guestId ? 'put' : 'post'])(`/rest/v1/conference/${params.conferenceId}/guest/${params.guestId || ''}`, {
            company: params.company || '',
            email: params.email || '',
            mobile: params.mobile || '',
            name: params.name || '',
            position: params.position || '',
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
 * 新增/更新参会人员
 * @param {*} params 
 */
export function remove(params = {}) {
    if (params &&
        params.conferenceId &&
        params.guestId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/guest/${params.guestId || ''}`, {
                company: params.company || '',
                email: params.email || '',
                mobile: params.mobile || '',
                name: params.name || '',
                position: params.position || '',
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
 * @param {*} params 
 */
export function getList(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/guest/list`, {
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
 * 导入参会人员
 * @param {*} params 
 */
export function getImportUrl(conferenceId) {
    if (conferenceId) {
        const info = userActions.getUserInfo();
        return `${config.apiHost}rest/v1/conference/${conferenceId}/guest/import?token=${info.token}`;
    }
}

/**
 * 下载参会人员导入模板
 * @param {*} params 
 */
export function getTemplateUrl(conferenceId) {
    if (conferenceId) {
        const info = userActions.getUserInfo();
        return `${config.apiHost}rest/v1/conference/${conferenceId}/guest/template?token=${info.token}`;
    }
}