/**
 * 全局mixin
 * @author rongqb@yonyou.com
 * @date 20180720
 */
import Vue from 'vue';
import * as userActions from 'app_src/actions/user';

import lang from 'app_src/languages/';

/**
 * 全局消息提示，为了满足UI需求
 * rongqb@yonyou.com 20180815 
 * @param {*} type 
 * @param {*} options 
 * @param {*} scope 
 */
const messageBox = function(type, options, scope) {
    if (typeof options == 'string') {
        options = {
            content: options
        };
    }
    scope.$Message[type](Object.assign({
        closable: true,
        duration: 5
    }, options, {
        render(h, content) {
            return h('span', {
                class: 'my-icon'
            }, [h('span', {
                class: `icon-alert-${type=='warning'?'info':type}`
            }, [h('span', {
                    class: 'path1'
                }),
                h('span', {
                    class: 'path2'
                })
            ])])
        }
    }));
};

const mixin = {
    data() {
        return {
            language: lang.getCurrent()
        }
    },
    computed: {
        lang() {
            return this.language && this.language.config;
        }
    },
    methods: {
        // xssFilter(content, options) {
        //     if (this.$xss && typeof content == 'string') {
        //         try {
        //             return this.$xss(content, Object.assign({
        //                 stripIgnoreTagBody: ['script'],
        //                 allowCommentTag: false,
        //                 onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
        //                     if (!/^on/i.test(name)) {
        //                         return `${name}="${value}"`;
        //                     }
        //                 }
        //             }, options));
        //         } catch (e) {
        //             return content;
        //         }
        //     }
        //     return content;
        // },
        // htmlEscape: function(str) { //普通字符转换成转义符
        //     if (str && typeof str == 'string') {
        //         return str.replace(/[\<\>\&\"\']/g, function(c) {
        //             return {
        //                 '<': '&#60;',
        //                 '>': '&#62;',
        //                 '&': '&#38;',
        //                 '"': '&#34;',
        //                 '\'': '&#39;'
        //             }[c];
        //         });
        //     }
        //     return str;
        // },
        // escapeHtml: function(str) { //转义符换成普通字符
        //     if (str && typeof str == 'string') {
        //         let arrEntities = {
        //             'lt': '<',
        //             'gt': '>',
        //             'nbsp': ' ',
        //             'amp': '&',
        //             'quot': '"',
        //             '#60': '<',
        //             '#62': '>',
        //             '#38': '&',
        //             '#34': '"',
        //             '#39': '\''
        //         };
        //         return str.replace(/&(lt|gt|nbsp|amp|quot|\#(?:60|62|38|34|39));?/ig, function(all, t) {
        //             return arrEntities[t];
        //         });
        //     }
        //     return str;
        // },
        openExternal() {
            try {
                if (window.open.apply(window, arguments) == null) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            return true;
        },
        dateFormat(timeStamp, format) {
            return new Date(timeStamp).format(format);
        },
        alert_success(options) {
            messageBox('success', options, this);
        },
        alert_error(options) {
            messageBox('error', options, this);
        },
        alert_warning(options) {
            messageBox('warning', options, this);
        },
    }
};

Vue.mixin(mixin);