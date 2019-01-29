/**
 * @author rongqb@yonyou.com
 * @date 20180723
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getList(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/activity/list`, {
                params: {
                    conferenceId: params.conferenceId
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
};

export function updateActivity(params = {}) {
    if (params &&
        params.conferenceId) {
        (axios[params.activityId ? 'put' : 'post'])(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId || ''}`, {
            activityDate: params.activityDate,
            startTime: params.startTime,
            name: params.name,
            endTime: params.endTime,
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

export function deleteActivity(params = {}) {
    if (params &&
        params.conferenceId &&
        params.activityId) {

        axios.delete(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId}`)
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

export function getActivity(params = {}) {
    if (params &&
        params.conferenceId &&
        params.activityId) {

        axios.get(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId}`)
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

export function setMainActivity(params = {}) {
    if (params &&
        params.conferenceId &&
        params.activityId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId}/${params.principal}`)
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