/**
 * 公共接口
 * @author rongqb@yonyou.com
 * @date 20180714
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

/**
 * 获取当前空间所有团队
 * @param {*} params 
 */
export function getTeamList(params = {}) {
    const info = userActions.getUserInfo();
    const qzId = info.userInfo && info.userInfo.qzId || '';
    if (params && qzId) {
        axios.get(`rest/v1/upesn/${qzId}/group/list`, {
                params: {
                    keyword: params.keyword || ''
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
 * 获取当前空间所有团队
 * @param {*} params 
 */
export function getTeamById(params = {}) {
    const info = userActions.getUserInfo();
    const qzId = info.userInfo && info.userInfo.qzId || '';
    if (params &&
        qzId &&
        params.groupId) {
        axios.get(`rest/v1/upesn/${qzId}/group/${params.groupId}`)
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