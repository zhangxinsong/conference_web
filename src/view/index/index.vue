<template>
    <div class="index">
        <div class="left">
            <router-link class="logo" to="/home">
                <i class="icon-conference-logo"></i>
            </router-link>
            <fs-menu :id="id" :activityId="activityId"></fs-menu>
        </div>
        
        <div class="right">
            <router-view></router-view>
        </div>

        <component :is="component" :id="id" :activityId="activityId" v-model="isShowCompnent"></component>
    </div>
</template>

<script>
import * as homeActions from 'app_src/actions/home';
export default {
    components: {
        'fs-menu': ()=> import('app_component/index/menu/'),
        'fs-activity-manage': ()=> import('app_component/index/activity/manage'),
    },
    props:['id', 'activityId'],
    data () {
        return {
           data: null,
           component: '',
           isShowCompnent: null 
        }
    },
    methods: {
        getConferenceInfo(){
            homeActions.getConferenceInfo({
                conferenceId: this.id,
                success: res =>{
                    this.data = res;
                }
            })
        }  
    },
    created(){
        if(this.id){
            this.getConferenceInfo();
        }
        this.$eventbus.$off('global-compnent').$on('global-compnent', (component, isShow) =>{
            this.isShowCompnent = typeof isShow == 'boolean'? isShow: true;
            this.component = component || null;
        });
    },
    destroyed () {
        this.$eventbus.$off('global-compnent');
    }
}
</script>

<style lang="less" scoped>
.index {
    .left {
        position: absolute;
        width: 175px;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: #ffffff;
        border-right: 1px solid #f5f5f5;
        height: 100%;
        overflow-y: auto;
        box-shadow: 0 0px 30px #ECECEC;
        z-index: 1;
    }

    .right {
        position: absolute;
        left: 176px;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .logo {
        margin: 23px auto 10px;
        background-color: #F0F0F0;
        border-radius: 50%;
        width: 46px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        display: block;
        font-size: 24px;
        color: #E14D47;
        > i {
            color: #E14D47;
        }
    }
}
</style>

