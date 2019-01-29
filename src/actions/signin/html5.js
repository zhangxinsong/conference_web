/**
 * html5接口
 * @author sunzhjc@yonyou.com
 * @date 20180727
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';


export function getSetType(params = {}) { //保存报名配置
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/signup/form`, {
                conferenceId: params.conferenceId
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

export function getBGListData(params = {}) { //获取背景图片
    if (params &&
        params.conferenceId) {
        axios.get(`/rest/v1/conference/${params.conferenceId}/background`, {
                params: {
                    backgroundType: params.backgroundType,
                    background: params.background
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

export function addBGListData(params = {}) { //添加背景图片
    if (params &&
        params.conferenceId) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/background?backgroundType=${params.backgroundType}`, {
                background: params.background,
                thumbBackground: params.thumbBackground || (params.background ? `${params.background}.thumb.jpg` : ''),
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


export function delHtmlType(params = {}) { //删除报名字段
    if (params &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/signup/form/field/${params.fieldId}`)
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

export function addHtmlType(params = {}) { //添加自定义字段
    if (params &&
        params.conferenceId) {
        axios.patch(`/rest/v1/conference/${params.conferenceId}/signup/form`, {
                label: params.label,
                order: params.order
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

export function saveHtmlSet(params = {}) { //保存html设置
    if (params &&
        params.conferenceId) {
        axios.put(`/rest/v1/conference/${params.conferenceId}/signup/form`, {
                backgroundImage: params.backgroundImage,
                thumbBackground: params.thumbBackground || (params.backgroundImage ? `${params.backgroundImage}.thumb.jpg` : ''),
                fields: params.fields,
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

export function delBGData(params = {}) { //删除背景图片
    if (params &&
        params.conferenceId) {
        axios.delete(`/rest/v1/conference/${params.conferenceId}/background/${params.backgroundId}?backgroundType=${params.backgroundType}`)
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