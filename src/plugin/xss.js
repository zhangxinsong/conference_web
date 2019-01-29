/**
 * axios 全局处理
 * @author rongqb@yonyou.com
 * @date 20180714
 * @api: https://jsxss.com/zh/starter/quickstart.html
 */
import Vue from 'vue';

try {
    Vue.prototype.$xss = require('xss'); //xss 
} catch (e) {}