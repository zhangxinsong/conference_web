<template>
    <div class="form">
        <slot name="title"></slot>

        <template v-if="loading">
            <fs-loading type="0"></fs-loading>
        </template>
        <template v-else>
            <i-row :class="['row']">
                <i-col span="4" class="label">
                    {{lang.conference}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    {{data.name}}
                </i-col>
            </i-row>  

            <i-row :class="['row']">
                <i-col span="4" class="label">
                    {{lang.conference_time}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    {{`${new Date(data.startTime).format('yyyy-MM-dd')} ${lang.to} ${new Date(data.endTime).format('yyyy-MM-dd')}` }}
                </i-col>
            </i-row>  

            <i-row :class="['row']">
                <i-col span="4" class="label">
                    {{lang.conference_subject}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    {{data.topic}}
                </i-col>
            </i-row>

            <i-row :class="['row']">
                <i-col span="4" class="label">
                    {{lang.conference_ads_picture}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    <!-- <img :src="data.image" v-if="data.image" class="cover" @error="data.image = ''"/> -->
                    <fs-image :src="data.image" v-if="data.image" :scale="2" :width="270"></fs-image>
                </i-col>
            </i-row>  

            <!-- <i-row :class="['row']">
                <i-col span="4" class="label" style="position: relative; top: 8px">
                    {{lang.admin}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    <div class="admin-list" v-for="item in adminMembers" :key="item.memberId">
                        <div class="admin-list-avatar" :style="{backgroundImage:'url('+ item.avatar +')'}"></div>
                        <div class="admin-list-info">
                            <div class="admin-list-info-name">{{item.name}}</div>
                            <div class="admin-list-info-deptName">{{item.deptName}}</div>
                        </div>
                    </div>
                </i-col>
            </i-row>

            <i-row :class="['row']">
                <i-col span="4" class="label" style="position: relative; top: 8px">
                    {{lang.mainadmin}}：
                </i-col>
                <i-col span="19" style="padding-left: 12px;" class=“txt-elips”>
                    <div class="admin-list" v-for="item in helpSignMembers" :key="item.memberId">
                        <div class="admin-list-avatar" :style="{backgroundImage:'url('+ item.avatar +')'}"></div>
                        <div class="admin-list-info">
                            <div class="admin-list-info-name">{{item.name}}</div>
                            <div class="admin-list-info-deptName">{{item.deptName}}</div>
                        </div>
                    </div>
                </i-col>
            </i-row>  -->

            <!-- <i-row :class="['row']">
                <i-col span="4" class="label">
                <label>发言投屏：</label>
                </i-col>
                <i-col span="20" style="padding-left: 12px;" class=“txt-elips”>
                    <img :src="data.image" v-if="data.image" class="cover"/>
                </i-col>
            </i-row> 

            <i-row :class="['row']">
                <i-col span="4" class="label">
                <label>大会投屏：</label>
                </i-col>
                <i-col span="20" style="padding-left: 12px;" class=“txt-elips”>
                    {{`${new Date(data.startTime).format('yyyy-MM-dd')} 至 ${new Date(data.endTime).format('yyyy-MM-dd')}` }}
                </i-col>
            </i-row>  -->

            <i-row  :class="['row']" v-if="data.conferenceId">
                <i-col span="20" style="padding-left: 48px;" offset="2">
                    <i-button class="confirm" @click="onConfirm">{{lang.edit}}</i-button>
                </i-col>
            </i-row>
        </template>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import * as homeActions from 'app_src/actions/home';

export default {
    props: {
        id: String,
    },
    data () {
        return {
            data: {},
            loading: false,
            // adminMembers: [],
            // helpSignMembers: []
        }
    },
    methods: {
        onConfirm(){
            this.$emit('onConfirm');
        },
        onCancel(){
            this.$emit('onCancel');
        },
        getConferenceInfo(){
            this.loading = true;
            homeActions.getConferenceInfo({
                conferenceId: this.id,
                success: res =>{
                    this.data = res;
                    this.loading = false;
                    // this.adminMembers = this.data['adminMembers'];
                    // this.helpSignMembers = this.data['helpSignInMembers'];
                },
                error: res =>{
                    this.loading = false;
                }
            })
        }  
    },
    created(){
        if(this.id){
            this.getConferenceInfo();
        }
    },
}
</script>

<style scoped lang="less">
   .form {
        padding: 30px 40px 30px 20px !important;
        width: 920px !important;
        color: #555555;
        .label {
            font-size:14px;
            color:#888888;
            // line-height: 30px;
            text-align: right;
        }

        .row {
            padding: 10px 0;
        }

        img.cover {
            display: block;
            width: 270px;
            border-radius: 4px;
        }   

        input {
            &.illegal {
                border-color: #E14C46;
            }
        }

        button {
            width:68px;
            height:30px;
            border-radius:4px;
            border: none;
            &:hover{
                border: none;
            }
            &.confirm {
                background:#E14C46;
                color: #ffffff;
                &.diseditable {
                    cursor: not-allowed;
                    opacity: .5!important;
                }
            }
            &.cancel {
                background: #E4E4E4;
                color: #555555;
            }
        } 

        .tip {
            font-size: 12px;
            color: #888888;
            padding-top: 10px;
            display: block;
        }

        .admin-list {
            float: left;
            overflow: hidden;
            margin-right: 30px;
            margin-bottom: 20px;
            max-width: 190px;
            height: 39px;

            &-avatar {
                float: left;
                width: 36px;
                height: 36px;
                margin-right: 12px;
                border-radius: 50%;
                background-size: cover;
                background-repeat: no-repeat;
            }

            &-info {
                float: left;
                max-width: 118px;
                
                &-name {
                    color: #111111;
                    font-size: 14px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }

                &-deptName {
                    color: #888888;
                    font-size: 12px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
    }
</style>



