/**
 * @author rongqb@yonyou.com
 * @date 20180730
 */
import axios from 'axios';
import config from 'app_src/config/';
import * as userActions from 'app_src/actions/user';

export function getList(params) {
    if (params &&
        params.activityId) {
        axios.get(`/rest/v1/activity/${params.activityId}/projection/list`)
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