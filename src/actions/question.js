/**
 * question接口
 * @author zhangxs9@yonyou.com
 * @date 20181204
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function questionBankList(params = {}) { //获取题库列表
    if (params) {
        axios.get(`/rest/v1/question/blank/list?size=1000`, {
                params: {
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

export function addQuestionBank(params = {}) { //新增题库
    if (params &&
        params.name &&
        params.description) {
        axios.post(`/rest/v1/question/blank`, {
                description: params.description,
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

export function editQuestionBank(params = {}) { //编辑题库
    if (params &&
        params.blankId &&
        params.description &&
        params.name) {
        axios.put(`/rest/v1/question/blank/${params.blankId}`, {
                description: params.description,
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

export function enableQuestionBank(params = {}) { //启用禁用题库
    if (params &&
        params.blankId) {
        axios.put(`/rest/v1/question/blank/${params.blankId}/${params.able ? 'disable' : 'enable'}`, {})
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

export function questionList(params = {}) { //获取题库题目列表
    if (params &&
        params.questionBlankId) {
        axios.get(`/rest/v1/answer/question/${params.questionBlankId}/list?size=10&start=${params.start}`, {
                params: {
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

export function addQuestion(params = {}) { //新增题目
    if (params &&
        params.questionBlankId &&
        params.name) {
        axios.post(`rest/v1/answer/question/${params.questionBlankId}`, {
                description: params.description,
                name: params.name,
                priority: params.priority,
                questionType: params.questionType,
                score: params.score,
                question: params.question,
                answer: params.answer
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

export function deleteQuestion(params = {}) { //删除题目
    if (params &&
        params.questionBlankId &&
        params.questionId ) {
        axios.delete(`/rest/v1/answer/question/${params.questionBlankId}/${params.questionId}`, {})
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

export function getQuestionById(params = {}) { //根据Id获取题目信息
    if (params &&
        params.questionId &&
        params.questionBlankId) {
        axios.get(`/rest/v1/answer/question/${params.questionBlankId}/${params.questionId}`, {
                params: {
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

export function editQuestionById(params = {}) { //根据Id修改题目信息
    if (params &&
        params.questionId &&
        params.questionBlankId) {
        axios.put(`/rest/v1/answer/question/${params.questionBlankId}/${params.questionId}`, {
                description: params.description,
                name: params.name,
                priority: params.priority,
                questionType: params.questionType,
                score: params.score,
                question: params.question,
                answer: params.answer
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

export function getTest(params = {}) { //获取考试列表
    if (params) {
        axios.get(`/rest/v1/answer/exam?size=1000`, {
                params: {
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

export function addTest(params = {}) { //新增考试
    if (params) {
        axios.post(`/rest/v1/answer/exam`, {
                name: params.name,
                examType: params.examType,
                questionBlankId: params.questionBlankId,
                startTime: params.startTime,
                endTime: params.endTime,
                order: params.order,
                singleQuestionCount: params.singleQuestionCount,
                multipleQuestionCount: params.multipleQuestionCount,
                examRegulation: params.examRegulation,
                interval: params.interval || 0,
                examUrl: params.examUrl
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

export function getTestById(params = {}) { //根据Id获取考试
    if (params &&
        params.examId) {
        axios.get(`/rest/v1/answer/exam/${params.examId}`, {})
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

export function editTest(params = {}) { //根据Id修改考试
    if (params &&
        params.examId) {
        axios.put(`/rest/v1/answer/exam/${params.examId}`, {
                name: params.name,
                examType: params.examType,
                questionBlankId: params.questionBlankId,
                startTime: params.startTime,
                endTime: params.endTime,
                order: params.order,
                singleQuestionCount: params.singleQuestionCount,
                multipleQuestionCount: params.multipleQuestionCount,
                examRegulation: params.examRegulation,
                interval: params.interval || 0,
                examUrl: params.examUrl
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

export function deleteTest(params = {}) { //根据Id删除考试
    if (params &&
        params.examId) {
        axios.delete(`/rest/v1/answer/exam/${params.examId}`, {})
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

export function getTemplateUrl(questionBlankId) {   //下载导入模板
    if (questionBlankId) {
        const info = userActions.getUserInfo();
        return `${config.apiHost}rest/v1/answer/question/${questionBlankId}/template?token=${info.token}`;
    }
}

export function getImportUrl(questionBlankId) {   //导入题目
    if (questionBlankId) {
        const info = userActions.getUserInfo();
        return `${config.apiHost}rest/v1/answer/question/${questionBlankId}/import?token=${info.token}`;
    }
}