/**
 * user接口
 * @author sunzhjc@yonyou.com
 * @date 20180726
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getGuideListData(params = {}) {
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/guide/list`, {
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

export function getGuideInfo(params = {}) {
    if (params &&
        params.conferenceId &&
        params.guideId) {
        (axios[params.requireType == 4 ? 'delete' : 'get'])(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}`, {
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

export function saveGuideData(params = {}) { //保存指南信息
    if (params &&
        params.conferenceId &&
        params.guideId) {
        axios.post(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}/item`, {
                conferenceId: params.conferenceId,
                guideId: params.guideId,
                title: params.title,
                content: params.content
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
export function updateGuideData(params = {}) { //更新指南信息
    if (params &&
        params.conferenceId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}/item/${params.id}`, {
                title: params.title,
                content: params.content
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

export function delGuideData(params = {}) { //删除指南信息
    if (params &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}/item/${params.id}`)
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

export function getSelectGuide(params = {}) { //保存大会信息
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/guide/initial/list`, {
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



export function addGuideItem(params = {}) { //创建大会指南
    if (params &&
        params.conferenceId) {
        axios.post(`/rest/v1/conference/${params.conferenceId}/guide/`, {
                conferenceId: params.conferenceId,
                icon: params.icon,
                name: params.name,
                items: []
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

export function addEditGuideItem(params = {}) { //保存编辑指南
    if (params &&
        params.conferenceId,
        params.guideId) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/guide/${params.guideId}/name`, {
                icon: params.icon || '',
                name: params.name
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