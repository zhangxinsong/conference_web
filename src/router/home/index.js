export default [{
    path: '',
    name: 'login',
    component: () => 
        import ('../../view/login/'),
},
{
    path: '/home',
    // name: 'home', //命名路由
    alias: 'home', //路由别名
    component: () =>
        import ('../../view/home/'),
    beforeEnter: (to, from, next) => {
        console.log('router.home.beforeEnter', to, from);
        //     try {
        //         // todo
        //     } catch (e) {
        //         // todo
        //     } finally {
        next();
        //     }
    },
    children: [{
        path: '',
        component: () =>
            import ('../../view/home/list/'),
    }, {
        path: 'detail',
        name: 'detail',
        component: () =>
            import ('../../view/home/detail/detail'),
        props: route => ({...route.query })
    }, {
        path: 'update',
        name: 'update',
        component: () =>
            import ('../../view/home/detail/'),
        props: route => ({...route.query })
    }]
}];