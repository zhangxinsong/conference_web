import Vue from 'vue';
let xss;
try {
    xss = require('xss');
} catch (error) {}


const filters = {
    xssFilter(content, options) {
        if (xss && typeof content == 'string') {
            try {
                return xss(content, Object.assign({
                    stripIgnoreTagBody: ['script'],
                    allowCommentTag: false,
                    onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
                        if (!/^on/i.test(name)) {
                            return `${name}="${value}"`;
                        }
                    }
                }, options));
            } catch (e) {
                return content;
            }
        }
        return content;
    },
    htmlEscape: function(str) { //普通字符转换成转意符
        if (str && typeof str == 'string') {
            return str.replace(/[\<\>\&\"\']/g, function(c) {
                return {
                    '<': '&#60;',
                    '>': '&#62;',
                    '&': '&#38;',
                    '"': '&#34;',
                    '\'': '&#39;'
                }[c];
            });
        }
        return str;
    },
    escapeHtml: function(str) { //转意符换成普通字符
        if (str && typeof str == 'string') {
            let arrEntities = {
                'lt': '<',
                'gt': '>',
                'nbsp': ' ',
                'amp': '&',
                'quot': '"',
                '#60': '<',
                '#62': '>',
                '#38': '&',
                '#34': '"',
                '#39': '\''
            };
            return str.replace(/&(lt|gt|nbsp|amp|quot|\#(?:60|62|38|34|39));?/ig, function(all, t) {
                return arrEntities[t];
            });
        }
        return str;
    }
};

for (let x in filters) {
    if (filters.hasOwnProperty(x)) {
        Vue.filter(x, filters[x]);
    }
}