import './diwork-sdk'
export default function(param) {
    let lang = navigator.language || navigator.userLanguage || 'zhs';
    lang = lang.toLocaleLowerCase();
    if (lang.indexOf('zh-') != -1) {
        if (lang.indexOf('cn') != -1) {
            lang = 'zhs'
        } else {
            lang = 'zht'
        }
    } else {
        lang = 'en'
    }

    // 没有传来源
    if(!param.source) {
        if (!param.callback) return lang
        param.callback && param.callback(lang)
    }

    // 移动端
    if(param.source && param.source === 'mobile') {
        const ua = navigator.userAgent
        const uaLanguage = ua.match(/youZoneLanguage=(\w*)/);
        if (uaLanguage && uaLanguage[1]) {
            switch (uaLanguage[1]) {
                case 'tw':
                    lang = 'zht'
                    break;
                case 'en':
                    lang = 'en'
                    break;
                default:
                    lang = 'zhs'
                    break;
            }
        }
        return lang
    } 

    // web端
    if (param.source && param.source === 'web') {
        if (window.jDiwork && window.jDiwork.getContext) {
            window.jDiwork.getContext(function (data) {
                if(data && data.locale) {
                    const diworkLang = data.locale || ''
                    if (diworkLang) {
                        switch (diworkLang) {
                            case 'zh_TW':
                                lang = 'zht'
                                break;
                            case 'en_US':
                                lang = 'en'
                                break;
                            default:
                                lang = 'zhs'
                                break;
                        }
                    } 
                }
                param.callback && param.callback(lang)
            })
        } else {
            param.callback && param.callback(lang)
        }
    }
}
