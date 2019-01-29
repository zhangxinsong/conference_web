/**
 * 获取多语环境语言包
 * rongqb@yonyou.com
 * 20180711
 */
import BaseList from 'app_src/utils/baseList';

let languages, language, langtypes, destroyTimer;

const getLangs = () => {
    languages = languages || new BaseList();
    if (!languages.length) {
        const requireContext = require.context(
            './', true, /\.js$/
        )
        requireContext.keys().forEach(fileName => {
            const child = requireContext(fileName);
            const childName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
            if (childName != 'index') {
                const lang = child.default || child;
                if (lang &&
                    lang.id) {
                    languages.set(lang.id, lang);
                }
            }
        });
    }
    clearTimeout(destroyTimer);
    destroyTimer = setTimeout(function() {
        languages = null;
    }, 10000);
    return languages;
}

export default {
    get(lang) {
        let langs = getLangs();
        let target;
        if (lang &&
            typeof lang == 'string') {
            langs.forEach(item => {
                try {
                    if (item.exp.test(lang)) {
                        target = Object.assign(target || {}, item);
                    }
                } catch (e) {}
            });
        }
        if (!target ||
            !lang ||
            typeof lang != 'string') {

            if (window.navigator &&
                window.navigator.language) {
                lang = window.navigator.language;
                langs.forEach(item => {
                    try {
                        if (item.exp.test(lang)) {
                            target = Object.assign(target || {}, item);
                        }
                    } catch (e) {}
                });
            }
        }
        if (!target) {
            const temp = langs.get('en') || langs.getFirst();
            target = Object.assign(target || {}, temp);
        }
        return target;
    },
    getCurrent() {
        if (!language) {
            language = this.reset();
        }
        return language;
    },
    getAll() {
        let langs = getLangs();
        if (!langtypes ||
            !langtypes.length) {
            langtypes = langtypes || [];
            langtypes.length = 0;
            langs.forEach(item => {
                if (item.id &&
                    item.name) {
                    langtypes.push({
                        id: item.id,
                        name: item.name,
                        exp: item.exp
                    });
                }
            });
        }
        return langtypes;
    },
    reset(lang) {
        let target = this.get(lang);
        language = Object.assign(language || {}, target || {});
        return language;
    }
};