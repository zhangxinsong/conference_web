/**
 * 活动管理
 * rongqb@yonyou.com 20180719
 */
export default [{
    // name: 'activityManage',
    path: 'activity/:activityId',
    component: () =>
        import ('../../../view/index/activity/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
            path: '',
            component: () =>
                import ('../../../view/index/activity/modules'),
            props: route => ({
                ...route.params,
                ...route.query
            }),
            children: [{
                    name: 'agenda',
                    path: '',
                    alias: 'agenda',
                    component: () =>
                        import ('app_component/index/activity/modules/agenda/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                {
                    name: 'faceDetect',
                    path: 'faceDetect',
                    component: () =>
                        import ('app_component/index/activity/modules/faceDetect/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                // {
                //     name: 'barrage',
                //     path: 'barrage',
                //     component: () =>
                //         import ('app_component/index/activity/modules/barrage/'),
                //     props: route => ({
                //         ...route.params,
                //         ...route.query
                //     }),
                // },
                {
                    name: 'live',
                    path: 'live',
                    component: () =>
                        import ('app_component/index/activity/modules/live/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                {
                    name: 'lottery',
                    path: 'lottery',
                    component: () =>
                        import ('app_component/index/activity/modules/lottery/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                {
                    name: 'signin',
                    path: 'signin',
                    component: () =>
                        import ('app_component/index/activity/modules/signin/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                {
                    name: 'statistics',
                    path: 'statistics',
                    component: () =>
                        import ('app_component/index/activity/modules/signin/statistics'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
                {
                    name: 'feed',
                    path: 'feed',
                    component: () =>
                        import ('app_component/index/activity/modules/feed/'),
                    props: route => ({
                        ...route.params,
                        ...route.query
                    }),
                },
            ]
        },
        {
            name: 'lotteryWinner',
            path: 'lotteryWinner/:prizeId',
            component: () =>
                import ('app_component/index/activity/modules/lottery/winner/'),
            props: route => ({
                ...route.params,
                ...route.query
            }),
        },
        {
            name: 'lotteryBlackList',
            path: 'lotteryBlackList/:prizeId',
            component: () =>
                import ('app_component/index/activity/modules/lottery/blacklist/'),
            props: route => ({
                ...route.params,
                ...route.query
            }),
        }
    ]
}];