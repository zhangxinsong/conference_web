<template>
    <fs-content-layout class="activity">
        <template slot="title">
            {{data && data.name}}
            <Checkbox class="main-activity" :disabled="principalExist" v-model="single" @on-change="setMainActivity">{{lang.setup_main_activity}}</Checkbox>
        </template>
        <template slot="content">
            <Tabs v-model="currentTab">
                <TabPane :label="item.label" :name="item.name" v-for="(item,index) in tabs" :key="index"></TabPane>
            </Tabs>
            <div class="fixed-menus">
                <Button :class="item.class" v-for="(item,index) in fixedMenu" :key="index" @click="$eventbus.$emit(item.event)">
                    {{item.name}}
                </Button>
            </div>
            <div class="module">
                <router-view></router-view>
            </div>
        </template>
    </fs-content-layout>
</template>

<script>
import * as activityActions from 'app_src/actions/activity/';

export default {
    provide: function () {
        return {
            getActivity: this.getActivity
        }
    },
    props: ['activityId','id'],
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
    },
    data () {
        return {
            data: null,
            tabs: null,
            single: true,
            principalExist: false,
        }
    },
    computed: {
        fixedMenu(){
            const menus = {
                agenda: [{
                    class: 'confirm normal',
                    name: this.lang.preview,
                    event: 'tab_agenda_preview'
                }],
                signin: [{
                    class: 'cancel normal',
                    name: this.lang.check_in_statistics,
                    event: 'tab_signin_statistics'
                },
                {
                    class: 'confirm normal',
                    name: this.lang.check_in_screen_mirroring,
                    event: 'tab_signin_projection'
                }],
                statistics: [
                // {
                //     class: 'cancel',
                //     name: '设置',
                //     event: 'tab_signin_setting'
                // },
                {
                    class: 'confirm normal',
                    name: this.lang.export_data,
                    event: 'tab_statistics_export'
                }],
                lottery: [{
                    class: 'confirm normal',
                    name: this.lang.lucky_draw_screen_mirroring,
                    event: 'tab_lottery_projection'
                }],
                feed: [{
                    class: 'confirm normal',
                    name: this.lang.screen_mirroring,
                    event: 'tab_feed_projection'
                }],
                // barrage: [{
                //     class: 'confirm',
                //     name: this.lang.barrage_screen_mirroring,
                //     event: 'tab_barrage_projection'
                // }],
            };
            return menus[this.$route.name] || [];
        },
        currentTab: {
            get(){       
                if(this.$route.name == 'statistics'){
                    return 'signin';
                }
                return this.$route.name || 'agenda';
            },
            set(value){
                if(value 
                && typeof value == 'string'){
                    this.$router.push({
                        path: `${this.$route.fullPath.replace(/(\/activity\/[^\\\/]+)(\/[^\\\/]+)*$/, `$1/${value}`)}`
                    });
                }
            }
        }
    },
    watch: {
        activityId: {
            handler(value){
                this.getData();
            },
            immediate: true
        }  
    },
    methods: {
        setMainActivity(i){
            activityActions.setMainActivity({
                    conferenceId: this.data.conferenceId,
                    activityId: this.data.id,
                    principal: i,
                    success: res =>{
                        if(i){
                            this.alert_warning(this.lang.setup_main_activity_s);
                        }else{
                            this.alert_warning(this.lang.cancel_main_activity_s);
                        }              
                    },
                    error: err =>{
                        this.alert_warning(this.lang.existing_main_activity);
                        this.single = false;
                    }
                })
        },
        getActivity(){
            return this.data;
        },
        getData(){
            activityActions.getActivity({
                conferenceId: this.id,
                activityId: this.activityId,
                success: res =>{
                    this.data = res;
                    this.single = this.data.principal;
                    if(this.data.principal){
                        this.principalExist = false;
                    }else{
                        this.principalExist = this.data.principalExist;
                    }
                }
            });
        },
        initTabs(){
            const _this = this;

            this.tabs = [{
                    label: this.lang.agenda,
                    name: 'agenda',
                },
                {
                    label: this.lang.check_in_mgmt,
                    name: 'signin',
                },
            //    {
            //         label: this.lang.face_recognition,
            //         name: 'faceDetect'
            //     }, 
                // {
                //     label: this.lang.live_mgmt,
                //     name: 'live'
                // },
                // {
                //     label: this.lang.lucky_draw,
                //     name: 'lottery'
                // },
                {
                    label: this.lang.screen_mirroring,
                    name: 'feed'
                },
                // {
                //     label: this.lang.interactive_barrage,
                //     name: 'barrage'
                // },
            ];
        }  
    },
    created () {
        this.initTabs();

        this.$eventbus.$on('activity_list_update', res=>{
            res && res.forEach(item=>{
                if(item.id == this.activityId){
                    this.$set(this ,'data', item);
                }
            });
        });

        this.$eventbus.$off('onActivityUpdated').$on('onActivityUpdated', res=>{
            if(res && res.id == this.activityId){
                if(res){
                    this.data = res;
                }else{
                    this.getData();
                }
            }
        });   
    }
}
</script>

<style lang="less">
.activity {
    .ivu-tabs-nav-wrap {
        padding: 0 20px;
        background-color: #F3F3F3;
        .ivu-tabs-nav {
            height: 50px;
            line-height: 50px;
            .ivu-tabs-tab {
                padding: 0 16px;
            }
        }
    }
    // .ivu-tabs-ink-bar{
    //     height: 3px;
    //     width: 32px !important;
    //     left: 28px;
    //     bottom: 3px;
    // }

    .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #E14C46;
    }

    .ivu-tabs-nav-prev,
    .ivu-tabs-nav-next {
        line-height: 50px;
    }

    .ivu-tabs-nav-prev {
        left: 5px;
    }

    .ivu-tabs-nav-next {
        right: 5px;
    }

    
}
</style>

<style lang="less" scoped>
.activity {
    .module {
        position: absolute;
        top: 49px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
    }
    .main-activity{
        margin-left: 20px;
        color: #555;
        font-size: 14px;
    }
    .content {
        position: relative;
        .fixed-menus {
            position: absolute;
            top: 10px;
            right: 40px;

            button {
                margin-left: 10px;
            }
        }
    }
}
</style>
