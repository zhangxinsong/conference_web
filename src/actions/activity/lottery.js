/**
 * @author rongqb@yonyou.com
 * @date 20180730
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getList(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/lottery/setting/list`)
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

export function updateLottery(params = {}) {
    if (params &&
        params.activityId) {
        const info = userActions.getUserInfo();
        (axios[params.activityId ? 'put' : 'post'])(`/rest/v1/activity/${params.activityId}/lottery/setting`, {
            projection: {
                projectionBackground: params.projectionBackground || '',
                thumbBackground: params.thumbBackground || (params.projectionBackground ? `${params.projectionBackground}.thumb.jpg` : ''),
                projectionType: params.projectionType || 'TURN_TABLE', //3D THREED_TURN_TABLE
            },
            scopeSetting: {
                deptId: info.userInfo && info.userInfo.deptId || '',
                qzId: info.userInfo && info.userInfo.qzId || '',
                scope: params.scope || '',
            },
            winnerMessageTemplate: params.winnerMessageTemplate || '',
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
};