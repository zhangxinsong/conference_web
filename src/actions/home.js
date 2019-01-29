/**
 * user接口
 * @author rongqb@yonyou.com
 * @date 20180717
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';


export function getList(params = {}) {
    if (params) {
        axios.get(`/rest/v1/conference/list`, {
                params: {}
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

export function createConference(params = {}) {
    if (params) {
        axios[(params.conferenceId ? 'put' : 'post')](`/rest/v1/conference/${params.conferenceId || ''}?memberId=${params.memberId}`, {
                name: params.name,
                topic: params.topic,
                endTime: params.endTime,
                image: params.image || '',
                thumbImage: params.thumbImage || (params.image ? `${params.image}.thumb.jpg` : ''),
                startTime: params.startTime
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

export function deleteConference(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}?memberId=${params.memberId}`)
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

export function getConferenceInfo(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}`)
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