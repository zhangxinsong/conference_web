<template>
    <fs-content-layout class="signup">
        <template slot="title">{{lang.registration_configuration}}</template>
        <template slot="content">
        	<Form :model="formItem" :label-width="130" class="setting">
                <FormItem :label="lang.require_invitation_code">
                    <Select 
                        v-model="setting.needInvitationCode" 
                        @on-change="changeIsInvitationCode"
                        style="width: 220px;"
                    >
                        <Option :value="1">{{lang.required}}</Option>
                        <Option :value="0">{{lang.not_needed}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="lang.start_time_one">
                    <DatePicker 
                        :value="setting.startTime" 
                        type="datetime" 
                        format="yyyy-MM-dd HH:mm" 
                        :placeholder="lang.please_start_time" 
                        @on-change="changeStartTime"
                        style="width: 220px"
                        :clearable="false"
                        :editable="false"
                    ></DatePicker>
                </FormItem>
                <FormItem :label="lang.end_time">
                    <DatePicker 
                        :value="setting.closingTime" 
                        type="datetime" 
                        format="yyyy-MM-dd HH:mm"
                        :placeholder="lang.select_time" 
                        @on-change="changeClosingTime"
                        style="width: 220px"
                        :clearable="false"
                        :editable="false"
                    ></DatePicker>
                </FormItem>
                <FormItem label="">
                    <Button type="error" @click="saveSignupData" :loading="loading">{{lang.save}}</Button>
                </FormItem>
            </Form>
            <div class="invitation-body">
                <div class="septer"></div>
                <div class="invitation-code" v-if="setting.needInvitationCode">
                    <div class="inv-header">
                        <span class="inv-title">{{lang.invitation_code}}</span>
                        <Button type="error" class="add-code" @click="addCodePop(editType = 0)">{{lang.add_invitation_code}}</Button>
                        <Button class="custom-code" @click="costomCodePop(editType = 0)">{{lang.custom_invitation_code}}</Button>
                    </div>
                    <Table size="large" :columns="header" :data="codeList"></Table>
                </div>
            </div>
            <Modal
                v-model="isAddCode"
                :title="lang.create_invitation_code"
                width="370"
            > 
                <div class="addcode-pop">
                    <Input v-model="codeDTO.channel" :placeholder="lang.please_enter_invitation_code"></Input>
                </div>
                <div slot="footer" class="btn-wrap">
                    <Button type="primary" class="cancel" @click="cancelAddInvitationCode">{{lang.cancel}}</Button>
                    <Button type="error" class="btn-error" @click="addInvitationCode">{{lang.select}}</Button>
                </div>
            </Modal>
            <Modal
                v-model="isCustomCode"
                :title="lang.custom_invitation_code"
                width="500"
                @on-visible-change="modalChange"
            > 
                <div class="customcode-pop">
                    <span>*<label>{{lang.invitation_code_channel}}</label></span>
                    <Input v-model="codeDTO.channel" :placeholder="lang.please_enter_invitation_code" style="width:340px"></Input>
                </div>
                <div class="customcode-pop">
                    <span>*<label>{{lang.create_invitation_code}}</label></span>
                    <Input v-model="codeDTO.code" :placeholder="lang.alphabetdigit" style="width:340px" @on-change="changeCode"></Input>
                </div>
                <div slot="footer" class="btn-wrap">
                    <Button type="primary" class="cancel" @click="cancelAddInvitationCode">{{lang.cancel}}</Button>
                    <Button type="error" class="btn-error" :disabled="this.isChangeCode" @click="addInvitationCode('custom')">{{lang.select}}</Button>
                </div>
            </Modal>
        </template>
    </fs-content-layout>
</template>

<script>
import * as signupActions from 'app_src/actions/signin/signin';
export default {
    data(){
        return {
            isAddCode: false,//是否显示添加邀请码
            isCustomCode: false,//是否显示自定义邀请码
            loading: false,//保存loding
            formItem: {
                value: false, //是否需要邀请码
                label: '不需要',
                time: new Date()
            },
            codeDTO: {
                channel: '', //渠道
                code: '' //自定义邀请码
            },
            setting: {
                startTime: '', //开始日期
                closingTime: '', //截止日期
                needInvitationCode: 0, //是否需要邀请码
            },
            editType: 0,//0添加邀请码，1编辑邀请码
            codeInfo: '',//存储编辑邀请码的信息
            codeList: [],
            isChangeCode: true
        }
    },
    props:{
        id: String
    },
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout')
    },
    computed:{
        header(){
            const _this = this;
            const header = [];
            header.push(
                {
                    title: this.lang.channel,
                    key: 'channel'
                },
                {
                    title: this.lang.invitation_code,
                    key: 'code'
                },
                {
                    title: this.lang.status,
                    key: 'enable',
                    render: (h, params) => {
                        let row = params.row;
                        if(row.enable){
                            return h('span',this.lang.enabled)
                        }else{
                            return h('span',this.lang.deactivated)
                        }
                    }
                },
                {
                    title: this.lang.applicants,
                    key: 'signUpNum'
                },
                {
                    title: this.lang.number_of_approved_persons,
                    key: 'checkPassNum'
                },
                {
                    title: this.lang.operation,
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        let row = params.row;
                        return h('div',[
                            h('span', {
                                attrs:{
                                    class: 'handle-btn'
                                },
                                domProps:{
                                    innerText: this.lang.edit
                                },
                                on: {
                                    click: ()=>{
                                        this.editType = 1;//编辑邀请码
                                        row.customizable ? this.costomCodePop(row) : this.addCodePop(row);
                                    }
                                }
                            }),
                            h('span', {
                                attrs:{
                                    class: 'handle-btn'
                                },
                                domProps:{
                                    innerHTML: row.enable ? this.lang.disable : this.lang.enable_two
                                },
                                on: {
                                    click: ()=>{
                                        this.disableInvitationCode(row);
                                    }
                                }
                            })
                        ])
                    }
                }
            )
            return header;
        }
    },
    mounted(){
        this.getSignupData();
    },
    methods: {
        getSignupData(){ //获取报名配置
            signupActions.getSignupData({
                conferenceId: this.id,
                success: res =>{
                    if(!!res){
                        this.setting.needInvitationCode = res.needInvitationCode ? 1 : 0;
                        this.setting.startTime = !!res.startTime && new Date(res.startTime) || '';
                        this.setting.closingTime = !!res.closingTime && new Date(res.closingTime)|| '';
                        if(res.needInvitationCode){
                            this.getInvitationCodeList();
                        }
                    }
                }
            })
        },
        updateSignupData(){ //更新报名配置
            signupActions.updateSignupData({
                conferenceId: this.id,
                success: res =>{
                    this.data = res;
                }
            })
        },
        saveSignupData(){ //保存报名配置
            this.loading = true;
            let closingTimestamp = new Date(this.setting.closingTime).getTime();
            let startTimestamp = new Date(this.setting.startTime).getTime();
            if(closingTimestamp < startTimestamp){
                this.alert_warning(this.lang.endtime_less_starttime);
                this.loading = false;
                return false;
            }
            signupActions.saveSignupData({
                conferenceId: this.id,
                closingTime: closingTimestamp,
                startTime: startTimestamp,
                needInvitationCode: this.setting.needInvitationCode,
                success: res =>{
                    this.data = res;
                    this.loading = false;
                    this.alert_success(this.lang.save_success);
                },
                error: error => {
                    this.loading = false;
                }
            })
        },
        addCodePop(item){ //添加邀请码
            this.isAddCode = true;
            if(this.editType == 1){ //编辑邀请码
                this.codeInfo = item;
                this.codeDTO.channel = item.channel || '';
            }else{
                this.codeDTO.channel = ""; //添加邀请码
                this.codeInfo = '';
            }
        },
        costomCodePop(item){
            this.isCustomCode = true;
            if(this.editType == 1){ //编辑邀请码
                this.codeInfo = item;
                this.codeDTO.channel = item.channel || '';
                this.codeDTO.code = item.code || '';
                this.isChangeCode = true;
            }else{
                this.codeDTO.channel = ""; //添加邀请码
                this.codeInfo = '';
            }
        },
        addInvitationCode(custom){//添加邀请码
        // console.log(custom);
            if(this.codeDTO.channel.length == 0){
                this.alert_warning(this.lang.invitation_code_is_required);
                return false;
            }else if(this.codeDTO.channel.length > 20){
                this.alert_warning(this.lang.exceed_characters);
                return false;
            }else if(custom == 'custom' && this.codeDTO.code.length == 0){
                this.alert_warning(this.lang.invitation_code_is_required);
                return false;
            }else if(custom == 'custom' && /^[\u4e00-\u9fa5]{0,}$/.test(this.codeDTO.code)){
                this.alert_warning(this.lang.p_num_zimu);
                return false;
            }else if(custom == 'custom' && this.codeDTO.code.length < 6 || this.codeDTO.code.length > 10){
                this.alert_warning(this.lang.input6invitationcodes);
                return false;
            }
            if(this.editType == 1){ //编辑邀请码
                var item = this.codeInfo;
                if(item.code == this.codeDTO.code){
                    this.alert_warning(this.lang.p_change_code);
                    return false;
                }
                signupActions.editInvitationCode({
                    conferenceId: item.conferenceId,
                    channel: this.codeDTO.channel,
                    code: item.customizable ? this.codeDTO.code : item.code,
                    invitationCodeId: item.id,
                    success: res =>{
                        this.data = res;
                        this.isAddCode = false;
                        this.isCustomCode = false;
                        this.isChangeCode = true;
                        this.getInvitationCodeList();
                    },
                    error: (err) =>{
                        if(err.data.code == '40305'){
                            this.alert_warning(this.lang.invitation_code_repeat);
                        }
                    }
                })
            }else{//添加邀请码
                signupActions.addInvitationCode({
                    conferenceId: this.id,
                    channel: this.codeDTO.channel,
                    code: this.isAddCode ? null : this.codeDTO.code,
                    success: res =>{
                        this.data = res;
                        this.isAddCode = false;
                        this.isCustomCode = false;
                        this.isChangeCode = true;
                        this.getInvitationCodeList();
                    },
                    error: (err) =>{
                        if(err.data.code == '40305'){
                            this.alert_warning(this.lang.invitation_code_repeat);
                        }
                    }
                }) 
            }
        },
        changeCode(){
            this.isChangeCode = false;
        },
        getInvitationCodeList(){//获取邀请码列表
            signupActions.getInvitationCodeList({
                conferenceId: this.id,
                success: res =>{
                    this.codeList = res.data;
                }
            })
        },
        disableInvitationCode(item){//停启用邀请码
            this.$confirm({
                title: this.lang.tips,
                content: this.lang.confirm_to+` ${item.enable ? this.lang.disable : this.lang.enable_two} `+this.lang.invitation_code+'?',
                onConfirm: () =>{
                    signupActions.disableInvitationCode({
                        conferenceId: item.conferenceId,
                        enable: !item.enable,
                        invitationCodeId: item.id,
                        success: res =>{
                            this.getInvitationCodeList();
                        }
                    })
                }
            });
        },
        cancelAddInvitationCode(){ //取消添加邀请码
            this.isAddCode = false;
            this.isCustomCode = false;
            this.codeDTO.channel = '';
            this.codeDTO.code = '';
        },
        modalChange(i){
            if(!i){
                this.codeDTO.channel = '';
                this.codeDTO.code = '';
            }
        },      
        changeIsInvitationCode(item){
            if(item == 1){
                this.getInvitationCodeList();
            }
        },
        changeClosingTime(time){//修改截止时间
            this.setting.closingTime = time;
        },
        changeStartTime(time){//修改截止时间
            this.setting.startTime = time;
        },
    }
}
</script>

<style lang="less">
    .ivu-modal-content {
        border-radius: 3px;
        .ivu-icon-ios-close-empty:before {
            color: #555;
        }
        .ivu-modal-header-inner {
            font-weight: normal;
        }
        .ivu-modal-body {
            .title {
                color: #111;
            }
            .content {
                font-size: 14px;
                color: #555;
            }
        }
        .ivu-modal-footer {
            border-top: none;
        }
    }
    .setting{
        padding: 40px 40px 10px 25px;
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder, 
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value,
        .ivu-input{
            font-size: 14px;
            color: #555;
        }
        .ivu-select-item{
            font-size: 14px !important;
        }
        .ivu-form-item {
            margin-bottom: 20px;
        }
    }
    .ivu-table:before {
        width: 0;
    }
    .ivu-table:after {
        width: 0;
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
    .ivu-form .ivu-form-item-label{
        font-size: 14px;
        color: #888;
    }
    .invitation-body {
        padding-bottom: 50px;
        min-height: calc(100% - 295px);
        background: #fafafa;
        .septer {
            height: 8px;
            background: linear-gradient(180deg, #d8d8d8, #ffffff);
            opacity: 0.3;
        }
        .ivu-table-cell {
            padding-left: 30px;
        }
    }
    .invitation-code{
        padding: 0 10px;
        .inv-header{
            overflow: hidden;
            height: 50px;
            line-height: 50px;
            background: #fff;
            .inv-title{
                float: left;
                color: #111;
                margin-left: 30px;
            }
            .add-code{
                position: relative;
                top: 10px;
                height: 30px;
                float: right;
                margin-right: 37px;
                border-radius: 3px;
            }
            .custom-code{
                position: relative;
                top: 10px;
                height: 30px;
                float: right;
                margin-right: 10px;
                border-radius: 3px;
                background: #D0D0D0;
                color: #555555;
                border: none;
            }
        }
        .ivu-table-large {
            span{
                font-size: 14px;
                color: #888;
            }
            .ivu-table-tbody {
                span {
                    color: #555;
                }
            }
        }
        .handle-btn{
            cursor: pointer;
            margin: 0 5px;
            color: #007ACE !important;
        }
        .ivu-table-tip{
            overflow: hidden !important;
        }
    }
    .addcode-pop{
        padding: 10px 0;
    }
    .customcode-pop{
        padding: 10px 24px 10px 14px;
        font-size: 14px;
        span{
            color: #E14C46;
            line-height: 36px;
        }
        label{
            color: #555555;
        }
        Input{
            height: 36px;
            margin-left: 8px;
        }
    }
</style>
