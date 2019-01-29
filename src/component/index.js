/**
 * 全局compnent
 * @author rongqb@yonyou.com
 * @date 20180714
 */

import Vue from 'vue';
import VueQr from 'vue-qr'

Vue.component('fs-image', () =>
    import ('./common/image/'));

Vue.component('fs-loading', () =>
    import ('./common/loading/'));

Vue.component('fs-qr-code', VueQr);

Vue.component('fs-qr-code-modal', () =>
    import ('./common/qrcode/'));

Vue.component('fs-select-member', () =>
    import ('./common/select-member/'));