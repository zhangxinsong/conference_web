export default [{
    path: 'bank',
    component: () => 
        import ('../../../view/index/bank/'),
    props: route => ({
        ...route.params,
        ...route.query
    }),
    children: [{
        path: '',
        name: 'bankList',
        component: () =>
            import ('../../../view/index/bank/question-bank/question-bank.vue'),
    },{
        path: 'questionList',
        name: 'questionList',
        component: () =>
            import ('../../../view/index/bank/question-list/question-list.vue'),
    },{
        path: 'addQuestion',
        name: 'addQuestion',
        component: () =>
            import ('../../../view/index/bank/add-question/add-question.vue'),
    }]
}];