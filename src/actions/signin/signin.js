/**
 * signin接口
 * @author sunzhjc@yonyou.com
 * @date 20180727
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function saveSignupData(params = {}) { //保存报名配置
    if (params &&
        params.conferenceId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/signup/setting`, {
                closingTime: params.closingTime,
                startTime: params.startTime,
                needInvitationCode: !!params.needInvitationCode
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

export function getSignupData(params = {}) { //获取报名配置
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/signup/setting`, {
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


export function updataSignupData(params = {}) { //更新报名配置
    if (params &&
        params.conferenceId &&
        params.guideId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}`, {
                params: {
                    conferenceId: params.conferenceId,
                    guideId: params.guideId
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


export function addInvitationCode(params = {}) { //添加邀请码
    if (params &&
        params.conferenceId) {
        axios.post(`/rest/v1/conference/${params.conferenceId}/signup/invitation`, params.code ? {
                conferenceId: params.conferenceId,
                channel: params.channel,
                code: params.code
            } : {
                conferenceId: params.conferenceId,
                channel: params.channel
            })
            .then(function(response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function(error) {
                params.error && params.error(error.response);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
};

export function getInvitationCodeList(params = {}) { //获取邀请码列表
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/signup/invitation/list`, {
                params: {
                    conferenceId: params.conferenceId,
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

export function disableInvitationCode(params = {}) { //停启用邀请码
    if (params) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/signup/invitation/enable/${params.invitationCodeId}?enable=${params.enable}`)
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


export function editInvitationCode(params = {}) { //编辑邀请码
    if (params &&
        params.conferenceId &&
        params.invitationCodeId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/signup/invitation/${params.invitationCodeId}`, {
                conferenceId: params.conferenceId,
                channel: params.channel,
                invitationCodeId: params.invitationCodeId,
                code: params.code
            })
            .then(function(response) {
                params.success && params.success(response);
                params && (params = null);
            })
            .catch(function(error) {
                params.error && params.error(error.response);
                params && (params = null);
            });
    } else {
        params.error && params.error();
        params && (params = null);
    }
};


export function getSignupList(params = {}) { //获取大会报名记录
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/signup/record/list`, {
                params: {
                    conferenceId: params.conferenceId,
                    auditStatuses: params.auditStatuses,
                    invitationCode: params.invitationCode,
                    fieldName: params.fieldName,
                    fieldValue: params.fieldValue,
                    size: params.size,
                    start: params.start
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



export function editSignupList(params = {}) { //大会人员驳回同意操作
    if (params &&
        params.conferenceId &&
        params.mobiles) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/signup/record/audit/status`, {
                mobiles: params.mobiles,
                status: params.status
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

export function exportExcel(params = {}) { //报名人员导出excel
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/signup/export`, {
                params: {
                    conferenceId: params.conferenceId,
                    auditStatuses: params.auditStatuses,
                    invitationCode: params.invitationCode,
                    fieldName: params.fieldName,
                    fieldValue: params.fieldValue
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
// export function updateActivity(params = {}) {
//     if (params &&
//         params.conferenceId) {
//         (axios[params.activityId ? 'put' : 'post'])(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId || ''}`, {
//             activityDate: params.activityDate,
//             endTime: params.endTime,
//             name: params.name,
//             startTime: params.startTime,
//         })
//         .then(function(response) {
//                 params.success && params.success(response);
//                 params && (params = null);
//             })
//             .catch(function(error) {
//                 params.error && params.error(error);
//                 params && (params = null);
//             });
//     } else {
//         params.error && params.error();
//         params && (params = null);
//     }
// };

// export function deleteActivity(params = {}) {
//     if (params &&
//         params.conferenceId &&
//         params.activityId) {
//         axios.delete(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId}`)
//             .then(function(response) {
//                 params.success && params.success(response);
//                 params && (params = null);
//             })
//             .catch(function(error) {
//                 params.error && params.error(error);
//                 params && (params = null);
//             });
//     } else {
//         params.error && params.error();
//         params && (params = null);
//     }
// };

// export function getActivity(params = {}) {
//     if (params &&
//         params.conferenceId &&
//         params.activityId) {

//         axios.get(`/rest/v1/conference/${params.conferenceId}/activity/${params.activityId}`)
//             .then(function(response) {
//                 params.success && params.success(response);
//                 params && (params = null);
//             })
//             .catch(function(error) {
//                 params.error && params.error(error);
//                 params && (params = null);
//             });
//     } else {
//         params.error && params.error();
//         params && (params = null);
//     }
// };