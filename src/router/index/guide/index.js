/**
 * 大会指南管理
 * rongqb@yonyou.com 20180719
 */
export default [{
    name: 'guideManage',
    path: 'guide',
    component: () =>
        import ('../../../view/index/guide/'),
    props: route => ({
        ...route.params,
        ...route.query
    })
}];