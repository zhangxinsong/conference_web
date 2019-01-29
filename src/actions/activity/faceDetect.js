import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getSetting(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/ai/face/setting`)
            .then(function (response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function (error) {
                params.error && params.error(error);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
}

export function updateMessage(params = {}) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/ai/face/setting/notify`,
                params.notifySettingDTO
            )
            .then(function (response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function (error) {
                params.error && params.error(error);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
}

export function enableFace(params = {}) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/ai/face/setting/enable?enable=${params.enable}`)
            .then(function (response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function (error) {
                params.error && params.error(error);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
}