export default [{
    path: 'list',
    // name: 'home', //命名路由
    alias: 'question', //路由别名
    component: () =>
        import ('../../../view/index/test/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
        path: '',
        component: () =>
            import ('../../../view/index/test/test-list/test-list.vue'),
    }, {
        path: 'setTest',
        name: 'setTest',
        component: () =>
            import ('../../../view/index/test/set-test/set-test.vue'),
    }, {
        path: 'list',
        name: 'list',
        component: () =>
            import ('../../../view/index/test/test-list/test-list.vue'),
    }]
}];