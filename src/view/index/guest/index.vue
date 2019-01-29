<template>
    <fs-content-layout class="activityone">
        <template slot="title">{{lang.attendee_mgmt}}</template>
        <template slot="content">
            <Tabs v-model="currentTab">
                <TabPane :label="item.label" :name="item.name" v-for="(item,index) in tabs" :key="index"></TabPane>
            </Tabs>
            <div class="fixed-menus">
                <Button :class="item.class" class="normal" v-for="(item,index) in fixedMenu" size="small" :key="index" @click="$eventbus.$emit(item.event)">
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
    props: ['id'],
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
    },
    data () {
        return {
            data: null,
            tabs: null
        }
    },
    computed: {
        fixedMenu(){
            const menus = {
                guestIndex: [{
                    class: 'confirm',
                    name: this.lang.new_attendee,
                    event: 'tab_guest_add'
                }]
            };
            return menus[this.$route.name] || [];
        },
        currentTab: {
            get(){
                return this.$route.name || 'guestIndex';
            },
            set(value){
                if(value 
                && typeof value == 'string'){
                    this.$router.push({
                        name: value
                    });
                }
            }
        }
    },
    methods: {
        getData(){
            activityActions.getActivity({
                conferenceId: this.id,
                activityId: this.activityId,
                success: res =>{
                    this.data = res;
                }
            });
        },
        initTabs(){
            const _this = this;

            this.tabs = [{
                    label: this.lang.attendee_list,
                    name: 'guestIndex',
                },
                {
                    label: this.lang.importing_users,
                    name: 'guestImport',
                }
            ];
        }  
    },
    created () {
        this.initTabs();
    }
}
</script>

<style lang="less">
.activityone {
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

<style lang="less">
.activityone {
    .module {
        position: absolute;
        top: 49px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
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
        .ivu-page {
            margin-right: 8px;
        }
    }
    .ivu-table-wrapper {
        border: 0;
        .ivu-table {
            &-tip {
                table tbody tr td > span {
                    color: #bfbfbf;
                }
            }
        }
    }
}
</style>
