/**
 * 路由配置文件
 * rongqb 20180610
 */
import homeRouter from './home/';
import indexRouter from './index/';

export default [{
    path: '/',
    redirect: '/login',
    redirect: to => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
    },
    component: () =>
        import ('../app'),
    children: [
        // ----------home------------
        ...homeRouter,
        // ----------index-------------
        ...indexRouter,
    ]
}];