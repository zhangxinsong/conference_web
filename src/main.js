/**
 * main.js
 * @author rongqb@yonyou.com
 * @date 20180714
 */

// import css
import './assets/css/reset';
import './assets/css/style'; //字体图标
import './assets/css/common'; //公共样式
import './assets/css/iView'; //iView 样式覆盖


// import module
import Vue from 'vue';
import iView from 'iview';
import store from './store/index.js';

/**
 * 初始化多语类型
 * rongqb@yonyou.com 20180830
 */
import { getWebLang } from 'yyzone'
import lang from 'app_src/languages/';
import locale_zh_TW from 'iview/dist/locale/zh-TW';
import locale_zh_CN from 'iview/dist/locale/zh-CN';
import locale_en_US from 'iview/dist/locale/en-US';

import router from './router/';
import { sync } from 'vuex-router-sync';
import URLSearchParams from 'url-search-params';

import {selectMan} from './yyzone';
import './yyzone/src/assets/styles/common.less'

Vue.use( selectMan );


// import storage from './assets/libs/store.js-master/dist/store.legacy.min';


//import global directives 
import './directive/';

// import global filters
import './filter/';

// import global filters
import './mixin/';

//import global components 
import './component/';

// import global http config 
import './config/http';

// import global xss 
import './plugin/xss';

// import global xss 
import './plugin/eventbus';

// import global xss 
import './plugin/confirm';

// import navive extend
import './plugin/nativeExtend';


// global
// window.jQuery = jQuery;
// window.storage = storage;
// window.Vue = Vue;


// plugin 
// Vue.use(ElementUI);
// Vue.use(iView);


// sync(store, router);

getWebLang({
    callback: function (data) {
        const current = lang.reset(data);
        console.log(current, 'current')

        if (current.id == 'zht') {
            Vue.use(iView, { locale: locale_zh_TW });
        } else if (current.id == 'en') {
            Vue.use(iView, { locale: locale_en_US });
        } else {
            Vue.use(iView, { locale: locale_zh_CN });
        }

        new Vue({
            store,
            router
        }).$mount('#app');
    }
})

// const getLangEnv = function() {
//     return (window.WEB_DIWORK_GLOBAL_CONFIG && window.WEB_DIWORK_GLOBAL_CONFIG.lang) ||
//         (window.diworkContext && window.diworkContext().locale) || '';
// }
// const current = lang.reset(getLangEnv());

// if (current.id == 'zh_TW') {
//     Vue.use(iView, { locale: locale_zh_TW });
// } else if (current.id == 'zh_CN') {
//     Vue.use(iView, { locale: locale_zh_CN });
// } else {
//     Vue.use(iView, { locale: locale_en_US });
// }