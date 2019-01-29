/**
 * 基础信息管理
 * rongqb@yonyou.com 20180719
 */
export default [{
    // name: 'baseManage',
    path: '',
    alise: 'base',
    component: () =>
        import ('../../../view/index/base/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
            name: 'baseDetail',
            path: '',
            component: () =>
                import ('../../../view/home/detail/detail'),
            props: route => ({
                ...route.params,
                ...route.query
            }),
        },
        {
            name: 'baseUpdate',
            path: 'update',
            component: () =>
                import ('../../../view/home/detail/form'),
            props: route => ({
                ...route.params,
                ...route.query
            }),
        },
    ]
}];