import activityRouter from './activity/';
import baseRouter from './base/';
import guideRouter from './guide/';
import signinRouter from './signin/';
import guestRouter from './guest/';
import barrageRouter from './barrage/';
import applicationRouter from './application/';
import testRouter from './test/';
import bankRouter from './bank/';

export default [{
    name: 'index',
    path: '/index/:id',
    redirect: to => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
        return `${to.path}`;
    },
    component: () =>
        import ('../../view/index/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [
        ...baseRouter,
        ...activityRouter,
        ...guideRouter,
        ...signinRouter,
        ...guestRouter,
        ...barrageRouter,
        ...applicationRouter,
        ...testRouter,
        ...bankRouter
    ]
}];