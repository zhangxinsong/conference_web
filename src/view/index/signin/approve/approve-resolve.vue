<template>
	<div class="approve-resolve">
		<div class="handdle">
            <Form :model="formItem" :label-width="80" :inline="true">
                <FormItem :label="lang.approval_result" style="margin-left: 16px;">
                    <Select v-model="auditStatus" @on-change="changeStatus" class="select">
                        <Option value="PASS,REJECT">{{ lang.all }}</Option>
                        <Option value="PASS">{{ lang.agreed }}</Option>
                        <Option value="REJECT">{{ lang.rejected }}</Option>
                    </Select>
                </FormItem>
                <FormItem class="handdle-selectName" label="" style="margin-top: 2px">
                    <Input v-model="fieldsValue" style="width: 230px;">
                        <Select v-model="fieldsName" slot="prepend" class="select">
                            <Option value="__name">{{ lang.name }}</Option>
                            <Option value="__mobile">{{ lang.mobile }}</Option>
                        </Select>
                    </Input>
                </FormItem>
                <FormItem class="handdle-code" :label="lang.invitation_code">
                    <Input v-model="formItem.invitationCode" placeholder="" style="width: 120px;"></Input>
                </FormItem>
                <FormItem class="handdle-btn" label="">
                    <Button @click="findSignupList(0)" class="cancel" style="margin: 0 8px">{{ lang.query_one }}</Button>
                    <Button type="primary" @click="exportData">{{ lang.download }}</Button>
                </FormItem>
            </Form>
        </div>
		<Table :columns="header" :data="signupList" ref="table"></Table>
        <Row :class="['footer']">
            <Col span="4" :class="['tip']">
                {{ lang.include }}{{total}} {{ lang.record }}
            </Col>
            <Col span="20">
                <Page :current="page" :total="total" :page-size="size" v-if="this.total <10 ? false : true" show-elevator style="float: right" @on-change="handlePage"></Page>
            </Col>
        </Row>
	</div>
</template>
<script>
import { eventBus } from 'app_src/assets/js/eventBus.js'
import { getUserInfo } from 'app_src/actions/user';
import * as signupActions from 'app_src/actions/signin/signin';
import config from 'app_src/config/';
	export default{
		data(){
			return {
                size: 10,
                page: 1,
                total: 0,
                auditStatus: "PASS,REJECT",
                fieldsValue: '',
                fieldsName: '__name',
                formItem: {
                	invitationCode: ''
                },
                signupList: []
			}
        },
        props:{
            id: String
        },
        mounted() {
            this.getSignupList(this.auditStatus.split(','));
            eventBus.$on('signuplist', (val) => {
                this.getSignupList(this.auditStatus.split(','));
            })
        },
        computed:{
            start(){
                return this.size * Math.max(this.page - 1, 0);
            },
            header(){
                const _this = this;
                const header = [];
                header.push(
                    {
                        title: this.lang.mobile,
                        key: 'mobile',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                        textAlign:'left',
                                        fontSize: '14px',
                                        color: '#555555'
                                    },
                                    domProps:{
                                        innerText: params.row.fields[1].value
                                    }
                                })
                               
                            ]);
                        }
                    },
                    {
                        title: this.lang.name,
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                        textAlign:'left',
                                        fontSize: '14px',
                                        color: '#555555'
                                    },
                                    domProps:{
                                        innerText: params.row.fields[0].value
                                    }
                                })
                               
                            ]);
                        }
                    },
                    {
                        title: this.lang.registration_time,
                        key: 'ctime',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                        textAlign:'left',
                                        fontSize: '14px',
                                        color: '#555555'
                                    },
                                    domProps:{
                                        innerText: new Date(params.row.utime).format('yyyy-MM-dd hh:mm')
                                    }
                                })
                               
                            ]);
                        }
                    },
                    {
                        title: this.lang.invitation_code,
                        key: 'inviteCode',
                        render: (h, params) => {
                            let inviteCode = ""
                            params.row.fields.forEach((val, i)=>{
                                if(val.fieldId == "__invite_code"){
                                    inviteCode = val.value;
                                }
                            })
                            return h('div', [
                                h('p', {
                                    style: {
                                        textAlign: 'left',
                                        fontSize: '14px',
                                        color: '#555555'
                                    },
                                    domProps:{
                                        innerText: inviteCode
                                    }
                                })
                               
                            ]);
                        }
                    },
                    {
                        title: this.lang.details,
                        key: 'details',
                        render: (h, params) => {
                            let authDeptNames = [];
                            params.row.fields.forEach((val, i)=>{
                                if(i>=3 && val.value){
                                        authDeptNames.push(h('p', {
                                        style: {
                                            "textAlign": 'left',
                                            "fontSize": '14px',
                                            "color": '#555555',
                                            "line-height":"20px"
                                        },
                                        domProps:{
                                            innerText: val.fieldName + ":" + val.value
                                        }
                                    }))
                                }
                            })
                            return h('div', {
                                style: {
                                    "padding-top": "10px",
                                    "padding-bottom": "10px"
                                },
                            }, authDeptNames);
                        }
                    },
                    {
                        title: this.lang.operation,
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                params.row.status == 'REJECT' ? h('span', {
                                    attrs:{
                                        class: 'handle-btn'
                                    },
                                    domProps:{
                                        innerText: this.lang.cancel
                                    },
                                    on: {
                                        click: () => {
                                            this.editSignupList(params.row.fields[1].value);
                                        }
                                    }
                                }) : null
                            ]);
                        }
                    }
                );
                return header;
            }
        },
        methods: {
            getSignupList(status){ //获取大会的报名记录
                signupActions.getSignupList({
                    conferenceId: this.id,
                    auditStatuses: status,
                    fieldName: this.fieldsName,
                    fieldValue: this.fieldsValue,
                    invitationCode: this.formItem.invitationCode,
                    start: this.start,
                    size: this.size,
                    success: res =>{
                        if(res){
                            this.total = res.total || 0;
                            this.signupList = res.data || [];
                        }
                    },
                })
            },
            editSignupList(mobile){ //操作请求
                this.$confirm({
                    title: this.lang.confirm_cancel,
                    content: this.lang.confirm_cancel_two,
                    onConfirm: () =>{
                        signupActions.editSignupList({
                            conferenceId: this.id,
                            mobiles: [mobile],
                            status: "PENDING",
                            success: res =>{
                                this.page = 1;
                                this.getSignupList(this.auditStatus.split(','));
                                eventBus.$emit("signuplistone",this.signupList.length);
                            }
                        })
                    }
                });  
            },
            findSignupList(){   //查询操作
                this.page = 1;
                this.getSignupList(this.auditStatus.split(','));
            },
            changeStatus(status){
                this.page = 1;
                this.getSignupList(status.split(','))
            },
            handlePage(page){ //点击页号操作
                this.page = page;
                this.getSignupList(this.auditStatus.split(','));
            },
            auditStatusOne(){
                if(this.auditStatus == "REJECT"){
                    return "auditStatuses[]=REJECT";
                }else if(this.auditStatus == "PASS"){
                    return "auditStatuses[]=PASS";
                }else{
                    return "auditStatuses[]=PASS&auditStatuses[]=REJECT";
                }
            },
            exportData(){  //下载数据
                const info = getUserInfo();
                const result = this.openExternal(`${config.apiHost}rest/v1/conference/${this.id}/signup/export?conferenceId=${this.id}&${this.auditStatusOne()}&invitationCode=${this.formItem.invitationCode}&fieldValue=${this.fieldsValue}&fieldId=${this.fieldsName}&token=${info && info.token || ''}`, '_blank');
                if(!result){
                    this.alert_warning(this.download_failure);
                }
            }
        }
	}
</script>
<style lang="less">
	.approve-resolve{
        padding: 10px;
        .handdle{
            padding: 10px 0 20px;
            .ivu-form-item{
                margin-right: 16px;
                margin-bottom: 0;
            }
            .handdle-selectName {
                .ivu-form-item-content {
                    margin-left: 0 !important;
                }
            }
            .handdle-code {
                margin-left: -27px;
            }
            .handdle-btn {
                margin-left: -10px;
                .ivu-form-item-content {
                    margin-left: 0 !important;
                }
            }
            .ivu-select-selection {
                border-radius: 3px;
            }
            .ivu-input {
                border-radius: 3px;
            }
        }
        .select{
            width: 80px;
            color:#555;
        }
        .allreject{
            color:#555555;
            background-color:#e4e4e4
        }
        .ivu-form .ivu-form-item-label{
            color: #555555;
            font-size: 14px;
        }
        .ivu-select-selected-value{
            color:#555555;
            font-size: 14px;
        }
        .ivu-input-group-prepend, .ivu-input-group-append{
            background-color: #ffffff; 
            border-radius: 3px;
        }
        .ivu-table-cell{
            padding-left: 29px;
            span{
                font-size: 14px;
                color: #888888;
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
        .handle-btn{
            cursor: pointer;
            font-size: 14px;
            margin: 0 5px;
            color: #007ACE !important;
        }
        .handle-text{
            color: #555555;
            font-size: 14px;
            line-height: 20px;
            font-family:MicrosoftYaHei;
        }
        .handle-text-first{
            margin-top: 20px;
        }
        .handle-text-last{
            margin-bottom: 20px;
        }
        .total-data{
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            margin: 20px 20px 20px 30px;
            .tip {
                font-size: 12px;
                color: #888888;
            }
        }
	}
</style>