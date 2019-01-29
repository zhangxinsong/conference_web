/**
 * 弹幕投屏
 * rongqb@yonyou.com 20180831
 */
export default [{
    // name: 'barrage',
    path: 'barrage',
    component: () =>
        import ('../../../view/index/barrage/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
        name: 'barrageIndex',
        path: '',
        alias: 'index',
        component: () =>
            import ('app_component/index/barrage/index'),
        props: route => ({
            ...route.params,
            ...route.query
        }),
    }]
}];