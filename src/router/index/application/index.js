export default [{
    name: 'appManage',
    path: 'application',
    component: () =>
        import ('../../../view/index/application/'),
    props: route => ({
        ...route.params,
        ...route.query
    })
}];