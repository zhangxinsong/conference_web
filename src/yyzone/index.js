/*
 * @Author: nizhanjun
 * @Date:   2018-08-14 18:42:57
 * @Last Modified by:   nizhanjun
 * @Last Modified time: 2018-08-14 18:42:57
 */

// import './src/assets/styles/common.less'

// components-------------------------------
import Avatar from './src/component/avatar/'
import {
    CountryCodeMobile,
    CountryCodeWeb
} from './src/component/country-code/'
import Loading from './src/component/loading/'
import Scroller from './src/component/scroller/'


// vue utils---------------------------------
import selectMan from './src/component/select-man/'


// function----------------------------------
import getLang from './src/utils/get-lang'
import getColor from './src/utils/get-color'
import getQuery from './src/utils/get-query'
import {
    htmlEscape,
    escapeHtml
} from './src/utils/escape'
import {
    locale
} from './src/locale/locale'

export {
    // components----------------------------
    Avatar,
    CountryCodeMobile,
    CountryCodeWeb,
    Loading,
    Scroller,
    // utils---------------------------------
    selectMan,
    // function------------------------------
    getLang,
    getColor,
    getQuery,
    locale,
    htmlEscape,
    escapeHtml
}
