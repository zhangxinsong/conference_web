/**
 * @author rongqb@yonyou.com
 * @date 20180723
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getList(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/agenda/list`)
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

export function updateAgenda(params = {}) {
    if (params &&
        params.activityId) {
        (axios[params.agendaId ? 'put' : 'post'])(`/rest/v1/activity/${params.activityId}/agenda/${params.agendaId || ''}`, {
            title: params.title,
            subTitle: params.subTitle,
            startTime: params.startTime,
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

export function deleteAgenda(params = {}) {
    if (params &&
        params.activityId) {
        axios.delete(`/rest/v1/activity/${params.activityId}/agenda/${params.agendaId || ''}`)
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

export function getQrCode(params = {}) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/agenda/qrcode`)
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

export function withAmPmTitle(params = {}) {
    if (params &&
        params.activityId) {
        axios.patch(`/rest/v1/activity/${params.activityId}/agenda/withAmPmTitle/${!!params.enable}`)
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