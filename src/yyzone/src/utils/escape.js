const htmlEscape = function(str) { //普通字符转换成转意符
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
}
const escapeHtml = function(str) { //转意符换成普通字符
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

export default {
    htmlEscape,
    escapeHtml
}