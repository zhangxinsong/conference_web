/**
 * 报名管理
 * rongqb@yonyou.com 20180719
 */
export default [{
    name: 'signinManage',
    path: 'signin',
    component: () =>
        import ('../../../view/index/signin/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
            name: 'signinSetting',
            path: 'setting',
            component: () =>
                import ('../../../view/index/signin/setting/'),
            props: route => ({
                ...route.params,
                ...route.query
            })
        },
        {
            name: 'signinHtml5',
            path: 'html5',
            component: () =>
                import ('../../../view/index/signin/html5/'),
            props: route => ({
                ...route.params,
                ...route.query
            })
        },
        {
            name: 'signinApprove',
            path: 'approve',
            component: () =>
                import ('../../../view/index/signin/approve/'),
            props: route => ({
                ...route.params,
                ...route.query
            })
        }
    ]
}];