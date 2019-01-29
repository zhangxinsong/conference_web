/**
 * @author rongqb@yonyou.com
 * @date 20180723
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function signInExport(params) {
    if (params &&
        params.activityId &&
        params.conferenceId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/export/${params.conferenceId}`)
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

export function notSignInExport(params) {
    if (params &&
        params.activityId &&
        params.conferenceId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/export/not/${params.conferenceId}`)
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

export function signInRecord(params) {
    if (params &&
        params.activityId) {
        axios.post(`/rest/v1/activity/${params.activityId}/signin/record`)
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

export function getSignInQrCode(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/record/incremental/${Date.now()}`)
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

export function getRecordList(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/record${params.unsign === true? '/unsign':''}/list`, {
                params: {
                    start: params.start || 0,
                    size: params.size || 20,
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

export function getSettingList(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/setting`)
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

export function getSettingQrCode(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/signin/setting/qrcode`)
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

export function updateSetting(params) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/signin/setting`, {
                // enable: !!params.enable,
                honorSetting: {
                    enable: !!params.honorEnable,
                    honorCode: params.honorCode || '',
                },
                joinGroupSetting: {
                    enable: !!params.joingGroupEnable,
                    joinGroupID: params.joinGroupID || '',
                },
                notifySetting: {
                    enable: !!params.noticyEnable,
                    appNotifyMessageTemplate: params.appNotifyMessageTemplate || '',
                    successMessageTemplate: params.successMessageTemplate || '',
                    failureMessageTemplate: params.failureMessageTemplate || '',
                    alreadySignInMessageTemplate: params.alreadySignInMessageTemplate || '',
                    messageUrl: params.messageUrl || '',
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

export function updateScope(params) {
    if (params &&
        params.activityId) {
        axios.patch(`/rest/v1/activity/${params.activityId}/signin/setting/scope`, null, {
                params: {
                    scope: params.scope || 'SIGNUP_AND_GUEST'
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

export function updateEnable(params) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/signin/setting/required`, null, {
                params: {
                    enable: !!params.enable
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


export function updateProjectionSetting(params) {
    if (params &&
        params.activityId) {
        axios.put(`/rest/v1/activity/${params.activityId}/signin/setting/projection`, {
                projection: {
                    projectionBackground: params.projectionBackground || '',
                    projectionType: params.projectionType || '',
                    thumbBackground: params.thumbBackground || (params.projectionBackground ? `${params.projectionBackground}.thumb.jpg` : '')
                },
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