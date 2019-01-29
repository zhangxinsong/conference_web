/**
 * 参会人员管理
 * rongqb@yonyou.com 20180806
 */
export default [{
    // name: 'guest',
    path: 'guest',
    component: () =>
        import ('../../../view/index/guest/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
        name: 'guestIndex',
        path: '',
        alias: 'index',
        component: () =>
            import ('app_component/index/guest/index'),
        props: route => ({
            ...route.params,
            ...route.query
        }),
    }, {
        name: 'guestImport',
        path: 'import',
        component: () =>
            import ('app_component/index/guest/import'),
        props: route => ({
            ...route.params,
            ...route.query
        }),
    }]
}];