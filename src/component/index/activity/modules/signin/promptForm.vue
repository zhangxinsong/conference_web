<template>
    <div class="signin-prompt-form"  style="width:570px">
        
        <template v-for="(item,index) in form">
            <template v-if="['successMessageTemplate','failureMessageTemplate','alreadySignInMessageTemplate'].indexOf(item.id) != -1">
                <h6 class="title row-group" :key="index" v-if="item.id == 'successMessageTemplate'">{{lang.check_in_tips}}</h6>
                <Row>
                    <Col span="5" :class="['left-item']">{{item.label}}</Col>
                    <Col span="19" :class="['right-item']">
                        <i-input v-if="item.type == 'text'"  v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :style="item.style"></i-input>
                    </Col>
                </Row>
            </template>
            <template v-else-if="['noticyEnable','appNotifyMessageTemplate','messageUrl'].indexOf(item.id) != -1">
                <h6 class="title row-group" :key="index" v-if="item.id == 'noticyEnable'">{{lang.send_message_to_the_checked_in_users}}</h6>
                <RadioGroup v-model="item.value" v-if="item.type == 'radio'" @on-change="onChange(item)">
                    <Radio v-for="(radio,i) in item.radios" :key="i" :label="radio.label">{{radio.name}}</Radio>
                </RadioGroup>
                <Row v-if="map['noticyEnable'].value == 'true' && (item.type == 'text' || item.type == 'textarea')"  :key="index">
                    <Col span="5" :class="['left-item']">{{item.label}}</Col>
                    <Col span="19" :class="['right-item']">
                        <i-input v-if="item.type == 'text'" type="text"  v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :style="item.style"></i-input>
                        <i-input v-else-if="item.type == 'textarea'" type="textarea" :autosize="item.autosize" v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :style="item.style"></i-input>
                    </Col>
                </Row>
            </template>
        </template>


        <h6 class="title row-group">{{lang.add_the_checked_in_users_into_the_team}}</h6>
        <Row>
            <Col span="8" v-if="map['joingGroupEnable']">
                <RadioGroup v-model="map['joingGroupEnable'].value" @on-change="onChange(map['joingGroupEnable'])">
                    <Radio v-for="(radio,i) in map['joingGroupEnable'].radios" :key="i" :label="radio.label">{{radio.name}}</Radio>
                </RadioGroup>
            </Col>
            <Col span="16" v-if="map['joinGroupID'] && map['joingGroupEnable'].value == 'true'">
                <Select v-model="map['joinGroupID'].value" :filterable="map['joinGroupID'].filterable" @on-query-change="map['joinGroupID'].onChange">
                    <Option v-for="(option,i) in map['joinGroupID'].options" :key="i" :value="option.value">{{option.label}}</Option>
                </Select>
            </Col>
        </Row>

         <Row :class="['row-group']">
            <Col>
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
                <i-button :class="['cancel']" @click="onCancel" style="margin-left: 5px;">{{lang.cancel}}</i-button>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import form_mixin from 'app_src/mixin/form';
import * as signinActions from 'app_src/actions/activity/signin';
import * as commonActions from 'app_src/actions/common';

export default {
    mixins: [form_mixin],
    props: ['activityId', 'value', 'group'],
    data () {
        return {
            confirming: false,
            searchTimer: null
        };
    },
    methods: {
        onChange(data){
            if(data){
                if(data.id == 'noticyEnable'){
                    this.map['appNotifyMessageTemplate'].required = !!(data.value == 'true');
                }else if(data.id == 'enable'){
                    this.map['joinGroupID'].required = !!(data.value == 'true');
                }
            }
        },
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                signinActions.updateSetting({
                    activityId: this.activityId,
                    ...this.formData,
                    success: res =>{
                        this.confirming = false;
                        this.initData(res);
                        this.$emit('input', Object.assign({}, this.value || {}, res));
                        this.$emit('onChange');
                    },
                    error: res =>{
                        this.confirming = false;
                    }
                });
            }
        },
        onCancel(){
            this.$emit('onChange');
        },
        initForm(params){
            const _this = this;
            params = params || this.data || {};

            this.cache.assign('successMessageTemplate',{
                id: 'successMessageTemplate',
                label: this.lang.greetings+'：',
                type: 'text',
                required: true,
                value: params['successMessageTemplate'] || this.lang.checked_in_successfully,
                placeholder: this.lang.enter_greetings,
                maxlength: 100
            });

            this.cache.assign('failureMessageTemplate',{
                id: 'failureMessageTemplate',
                label: this.lang.fail_greetings + '：',
                type: 'text',
                required: true,
                value: params['failureMessageTemplate'] || this.lang.check_in_failed,
                placeholder: this.lang.enter_fail_greetings,
                maxlength: 100
            });

            this.cache.assign('alreadySignInMessageTemplate',{
                id: 'alreadySignInMessageTemplate',
                label: this.lang.duplicated_check_in_tips+'：',
                type: 'text',
                required: true,
                value: params['alreadySignInMessageTemplate'] || this.lang.checked_in_successfully,
                placeholder: this.lang.duplicate_checkin_prompt,
                maxlength: 100
            });

            this.cache.assign('noticyEnable',{
                id: 'noticyEnable',
                type: 'radio',
                required: true,
                radios: [
                    {
                        name: this.lang.do_not_push_app_message,
                        label: 'false',
                    },
                    {
                        name: this.lang.push_notification,
                        label: 'true',
                    },
                ],
                value: typeof params['noticyEnable'] == 'boolean'? `${params['noticyEnable']}`: 'false',
            });

            this.cache.assign('appNotifyMessageTemplate',{
                id: 'appNotifyMessageTemplate',
                label: this.lang.message_content+'：',
                type: 'textarea',
                required: !!(this.map['noticyEnable'].value == 'true'),
                value: params['appNotifyMessageTemplate'] || '',
                placeholder: this.lang.please_enter_message_content_to_push,
                maxlength: 500,
                autosize: {
                    minRows: 3,
                    maxRows: 5
                }
            });

            this.cache.assign('messageUrl',{
                id: 'messageUrl',
                label: this.lang.URL+'：',
                type: 'text',
                required: !!(this.map['noticyEnable'].value == 'true'),
                value: params['messageUrl'] || '',
                placeholder: this.lang.please_enter_URL,
                maxlength: 100
            });

            this.cache.assign('joingGroupEnable',{
                id: 'joingGroupEnable',
                type: 'radio',
                required: true,
                radios: [
                    {
                        name: this.lang.do_not_join_team,
                        label: 'false',
                    },
                    {
                        name: this.lang.join_team,
                        label: 'true',
                    },
                ],
                value: typeof params['joingGroupEnable'] == 'boolean'? `${params['joingGroupEnable']}`: 'false',
            });

            const joinGroup = this.cache.assign('joinGroupID',{
                id: 'joinGroupID',
                label: this.lang.lucky_draw_scope+'：',
                type: 'select',
                required: !!(this.map['joingGroupEnable'].value == 'true'),
                options: [{
                    value: params['joinGroupID'] || '',
                    label: this.group && this.group.name || '',
                }],
                value: params['joinGroupID'] || '',
                filterable: true,
                onChange(keyword){
                    clearTimeout(_this.searchTimer);
                    _this.searchTimer = setTimeout(function(){
                        const joinGroupID = _this.cache.get('joinGroupID');
                        if(joinGroupID){
                            commonActions.getTeamList({
                                keyword,
                                success: res =>{
                                    joinGroupID.options.length = 0;
                                    res && res.data.forEach(item =>{
                                        joinGroupID.options.push({
                                            value: item.gid,
                                            label: item.name
                                        });
                                    });
                                }
                            });
                        }
                    }, 1000);
                }
            });

            joinGroup.onChange('');
        },
        initData(params){
            const _this = this;
            params = params || this.value;

            if(params){
                this.data = {
                    joingGroupEnable: !!(params.joinGroupSetting && params.joinGroupSetting.enable),
                    joinGroupID: params.joinGroupSetting && params.joinGroupSetting.joinGroupID || '',

                    noticyEnable: !!(params.notifySetting && params.notifySetting.enable),
                    messageUrl: params.notifySetting && params.notifySetting.messageUrl || '',
                    appNotifyMessageTemplate: params.notifySetting && params.notifySetting.appNotifyMessageTemplate || '',
                    successMessageTemplate: params.notifySetting && params.notifySetting.successMessageTemplate || '',
                    failureMessageTemplate: params.notifySetting && params.notifySetting.failureMessageTemplate || '',
                    alreadySignInMessageTemplate: params.notifySetting && params.notifySetting.alreadySignInMessageTemplate || '',

                    honorEnable: !!(params.honorSetting && params.honorSetting.enable),
                    honorCode: params.honorSetting && params.honorSetting.honorCode || '',
                };
            }
            this.initForm();
        }
    },
    created() {
        this.initData();
    }
}
</script>

<style lang="less">
.signin-prompt-form {
    ul.cover-list {
        li:last-child {
            & > .ivu-upload {
                height: 100%;
                .ivu-upload-drag {
                    height: 100%;
                    padding-top: 40px;
                    border: none;
                }
            }
        }
    }
    .ivu-radio-wrapper:not(:last-child) {
        margin-right: 30px;
    }
    .ivu-radio-wrapper {
        color: #555555;
    }
}
</style>


<style lang="less" scoped>
.signin-prompt-form {
    .row-group:not(:first-child) {
        margin-top: 20px;
    } 
    .left-item {
        color: #888888;
        // width: 100px;
        text-align: right; 
        // padding-right: 10px;
        line-height: 30px;
    }
    
    .right-item {
        color: #555555;
    }

    .title {
        color: #888888;
        // width: 100px;
        line-height: 30px;
    }
    h6.title {
        color: #111111;
    }

    .ivu-row {
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group:not(:first-child) {
            margin-top: 20px;
        }
    }
}
</style>

