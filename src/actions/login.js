import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';


export function login(params = {}) {
    if (params) {
        axios.get(`/rest/start/signin/admin?loginName=${params.loginName}&password=${params.password}`, {
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

export function signUp(params = {}) {
    if (params) {
        axios.post(`/rest/start/signup/admin`, {
            loginName: params.loginName,
            password: params.password
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