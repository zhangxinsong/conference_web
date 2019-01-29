/*	   
    1 引入
        import Vue from 'vue';
        import {selectMan} from 'yyzone';
        import 'yyzone/src/assets/styles/common.less';
        Vue.use( selectMan );

    2 通过 this.$seletMan.open( options ) ;方法打开 ;

    3 options参数
        {
            callback(res){
                ---------------> 确定回调返回数据
            },
            qzId : 917,
            memberId : 111, ---->获取和自己相关的内部群 需要传memberId ;
            title: '标题' , ----> 标题
            depMan:{
                show:true,   -----> 是否显示
                limit:100,   -----> 选择上限(limit=1 为单选)
                selected:[]  -----> 回显数据
            },
            dep:{
                show:false,
                limit:100,
                selected:[]
            },
            team:{
                show:false,
                limit:100,
                selected:[]
            },
            man:{
                show:false,
                limit:100,
                selected:[]
            },
        }
*/

********************** 示例 *************************

    import Vue from 'vue';
    import {selectMan} from 'yyzone';
    import 'yyzone/src/assets/styles/common.less';
    Vue.use( selectMan );

    new Vue({
        template:'<div></div>',
        mounted(){

            this.$seletMan.open({
                callback( res ){
                    console.log(JSON.stringify(res))
                },
                "qzId":917,
                "memberId":231546,//获取和自己相关的内部群 需要传memberId ;
                "title": "-----我是标题------",
                "depMan": {
                    "show": 1,
                    "limit": 5,
                    "selected": [{
                        "type": 0,
                        "deptId": 155805,
                        "userName": "李楠楠",
                        "deptName": "郑州风控部",
                        "avatar": "http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/14330/3256827/201806/12/1528813226fUuT.jpg",
                        "memberId": 3256827,
                        "id": null,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 0,
                        "deptId": 148775,
                        "userName": "啊白测试",
                        "deptName": "ERP解决方案部(2016)",
                        "avatar": "http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/4497/4233/201708/24/15035402332b63e32b8c6b1e06d8d23775107b7030.jpg",
                        "memberId": 4233,
                        "id": null,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 0,
                        "deptId": 148775,
                        "userName": "陈晓彬",
                        "deptName": "ERP解决方案部(2016)",
                        "avatar": "http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/default_avatar.jpg",
                        "memberId": 186229,
                        "id": null,
                        "children": [],
                        "checked": false
                    }]
                },
                "dep": {
                    "show": 1,
                    "limit": 5,
                    "selected": [{
                        "type": 1,
                        "deptId": 147849,
                        "szId": 917,
                        "deptName": "ccccccccccc",
                        "parentId": "0",
                        "userNum": null,
                        "haveSub": 1,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 1,
                        "deptId": 147848,
                        "szId": 917,
                        "deptName": "ERP事业部(2016)111",
                        "parentId": "0",
                        "userNum": null,
                        "haveSub": 1,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 1,
                        "deptId": 148775,
                        "szId": 917,
                        "deptName": "ERP解决方案部(2016)",
                        "parentId": "0",
                        "userNum": null,
                        "haveSub": 1,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 1,
                        "deptId": 148780,
                        "szId": 917,
                        "deptName": "华东银行ABU-销售部(2016)",
                        "parentId": "147857",
                        "userNum": null,
                        "haveSub": 0,
                        "children": [],
                        "checked": false
                    }, {
                        "type": 1,
                        "deptId": 148781,
                        "szId": 917,
                        "deptName": "华东银行ABU-解决方案部(2016)",
                        "parentId": "147857",
                        "userNum": null,
                        "haveSub": 0,
                        "children": [],
                        "checked": false
                    }]
                },
                "team": {
                    "show": 1,
                    "limit": 5,
                    "selected": [{
                        "type": 3,
                        "gid": "7856",
                        "groupName": "梁50+人",
                        "description": null,
                        "groupMemberCount": 51,
                        "groupLogo": "http://ykj-esn-front-test.oss-cn-beijing.aliyuncs.com/esn/images/defaultGroup.gif",
                        "checked": false
                    }]
                },
                "man": {
                    "show": 1,
                    "limit": 5,
                    "selected": [{
                        "type": 0,
                        "deptId": 153404,
                        "userName": "严克燕",
                        "deptName": "631技术实施部",
                        "avatar": "http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/default_avatar.thumb.jpg",
                        "memberId": 3254649,
                        "id": null,
                        "checked": false
                    }, {
                        "type": 0,
                        "deptId": 154666,
                        "userName": "李鹏",
                        "deptName": "开发部",
                        "avatar": "http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/default_avatar.thumb.jpg",
                        "memberId": 3256562,
                        "id": null,
                        "checked": false
                    }]
                }
            });


        },
    })
