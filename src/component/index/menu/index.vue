<template>
    <div class="menu">
        <Menu ref="menu" :active-name="active.name || ''" :open-names="[active.parent || '']" accordion width="100%" @on-select="onSelect">

            <!-- 大会管理 -->
            <Submenu name="conference_manage">
                <template slot="title">
                    <i class="icon-conference_manage icon"></i>
                    <span class="menu-title-big">{{ lang.conference_mgmt }}</span>
                </template>
                <MenuItem name="baseInfo">
                    {{ lang.basic_info }}
                </MenuItem>
            </Submenu>

            <!-- 大会指南 -->
            <MenuItem name="conference_guide"> 
                <i class="icon-guide icon"></i>
                <span class="menu-title-big">{{ lang.conference_guideline }}</span>
            </MenuItem>

            <!-- 报名管理 -->
            <Submenu name="signin_manage">
                <template slot="title">
                    <i class="icon-signup_manage icon"></i>
                    <span class="menu-title-big">{{ lang.registration }}</span>
                </template>
                <MenuItem name="signin_manage_setting">
                    {{ lang.registration_configuration }}
                </MenuItem>
                <MenuItem name="signin_manage_html5">
                    {{ lang.h5_from_design }}
                </MenuItem>
                <MenuItem name="signin_manage_approve">
                    {{ lang.registration_approval }}
                </MenuItem>
            </Submenu>

            <!-- 活动管理 -->
            <Submenu name="activity_manage">
                <template slot="title">
                    <i class="icon-activity icon"></i>
                    <div style="max-width:95px;display:inline-block;">
                        <span class="menu-title-big-diff">{{ lang.activity_mgmt }}</span>
                        <i class="icon-edit icon" style="font-size: 18px;float:right;position: relative;top: 2px;" @click.stop="$eventbus.$emit('global-compnent', 'fs-activity-manage')"></i>
                    </div>
                </template>
                <MenuItem :name="`activity_${item.id}`" v-for="(item,index) in activities" :key="index" :class="['txt-elips',{'ivu-menu-item-active': active.name == `activity_${item.id}`}]">
                    {{item.name}}
                </MenuItem>
            </Submenu>

            <!-- 大会应用管理 -->
            <MenuItem name="app_manage"> 
                <i class="icon-app_manage icon"></i>
                <span class="menu-title-big">{{ lang.conference_applications }}</span>
            </MenuItem>

             <!-- 参会人员管理 -->
            <MenuItem name="guest_manage"> 
                <i class="icon-guest_manage icon"></i>
                <span class="menu-title-big">{{ lang.attendee_mgmt }}</span>
            </MenuItem>

            <!-- 弹幕投屏管理 -->
            <MenuItem name="barrage_manage"> 
                <i class="icon-barrage icon"></i>
                <span class="menu-title-big">{{ lang.interactive_barrage }}</span>
            </MenuItem>
            <MenuItem name="test_manage"> 
                <i class="icon-barrage icon"></i>
                <span class="menu-title-big">考试列表</span>
            </MenuItem>
            <MenuItem name="bank_manage"> 
                <i class="icon-barrage icon"></i>
                <span class="menu-title-big">题库列表</span>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import * as activityActions from 'app_src/actions/activity';

export default {
    props: {
        id: {
            type: String,
            required: true
        },
        activityId: String
    },
    data () {
        return {
            activities: null      
        }
    },
    computed: {
        path(){
            const data = [
                {
                    name: 'signin_manage_approve',
                    router: `/index/${this.id}/signin/approve`,
                    parent: 'signin_manage'
                },
                {
                    name: 'signin_manage_html5',
                    router: `/index/${this.id}/signin/html5`,
                    parent: 'signin_manage'
                },
                {
                    name: 'signin_manage_setting',
                    router: `/index/${this.id}/signin/setting`,
                    parent: 'signin_manage'
                },
                {
                    name: 'conference_guide',
                    router: `/index/${this.id}/guide`,
                    parent: 'conference_guide'
                },
                {
                    name: 'guest_manage',
                    router: `/index/${this.id}/guest`,
                    parent: 'guest_manage'
                },
                {
                    name: 'app_manage',
                    router: `/index/${this.id}/application`,
                    parent: 'app_manage'
                },
                {
                    name: 'barrage_manage',
                    router: `/index/${this.id}/barrage`,
                    parent: 'barrage_manage'
                },{
                    name: 'test_manage',
                    router: `/index/${this.id}/list`,
                    parent: 'test_manage'
                },{
                    name: 'bank_manage',
                    router: `/index/${this.id}/bank`,
                    parent: 'bank_manage'
                },
                {
                    name: 'baseInfo',
                    router: `/index/${this.id}`,
                    parent: 'conference_manage'
                }
            ];

            if(this.activities){
                this.activities.forEach(item => {
                    data.unshift({
                        name: `activity_${item.id}`,
                        router: `/index/${this.id}/activity/${item.id}`,
                        parent: 'activity_manage'
                    });
                });
            }
            return data;
        },
        active(){
            let active = {};

            if(this.activityId){
                active = {
                    name: `activity_${this.activityId}`,
                    parent: 'activity_manage'
                };
            }else{
                for(let x in this.path){
                    if(this.path.hasOwnProperty(x)){
                        if(this.$route.fullPath 
                        && this.$route.fullPath.indexOf(this.path[x].router) != -1){
                            active = {
                                name: this.path[x].name,
                                parent: this.path[x].parent
                            };
                            break;
                        }
                    }
                }
            }
            return active;
        }  
    },
    methods: {
        activityManage(){
            this.modal_component = 'fs-activity-manage';
            this.isShowModel = true;
        },
        onClick(path){
            console.log(path);
        },
        onSelect(name){
            if(name){
                this.path.forEach(item =>{
                    if(item.name == name){
                        this.$router.push({
                            path: item.router
                        });
                    }
                });
            }
        },
        getActivityList(){
            activityActions.getList({
               conferenceId: this.id,
               success: res =>{
                    this.activities = res && res.data || [];
               }
           }); 
        }
    },
    created () {
        this.getActivityList();

        this.$eventbus.$on('activity_list_update', res =>{
            this.activities = res || [];
            console.log('activity_list_update', res);
        });
    },
    mounted () {
    }
}
</script>

<style lang="less">
.menu {
    .ivu-input{
        font-size: 14px;
        color: #555;
    }
    .ivu-menu-item, 
    .ivu-menu-submenu-title {
        padding: 10px 8px 10px 14px;
        border-left: 3px solid #fff;
    }
    .ivu-menu-light.ivu-menu-vertical 
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #E14C46;
        border-left: 3px solid #E14C46;
        border-right: 0;
        background: #f3f3f3;
        a,span {
            color: #E14C46;
        }
    }
    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background: #fff;
        color: #111;
        span {
            color: #111;
        }
    }
    .ivu-menu-vertical.ivu-menu-light:after {
        width: 0px;
    }
    .menu-title-big{
        display: inline-block;
        max-width: 95px;
    }
    .menu-title-big-diff{
        display: inline-block;
        max-width: 70px;
    }
}
</style>

<style scoped lang="less">
.menu {
    * {
        color: #555555;
    }
    a {
        color: #555555;
    }
    i.icon {
        float: left;
        font-size: 24px;
        vertical-align: middle;
        margin-right: 5px;
    }
}
</style>
