<template>
    <div class="approve-pending">
        <div class="handdle">
            <Form :model="formItem" :label-width="60" :inline="true" >
                <FormItem label="" style="margin-left: -34px;">
                    <Input v-model="fieldValue" style="width: 230px;">
                        <Select v-model="fieldName" slot="prepend" class="select">
                            <Option value="__name">{{ lang.name }}</Option>
                            <Option value="__mobile">{{ lang.mobile }}</Option>
                        </Select>
                    </Input>
                </FormItem>
                <FormItem :label="lang.invitation_code">
                    <Input v-model="formItem.invitationCode" placeholder="" style="width: 120px;"></Input>
                </FormItem>
                <FormItem label="" style="margin-left: -60px;">
                    <Button @click="clickSelect" class="cancel">{{ lang.query_one }}</Button>
                    <Button type="primary" @click="exportData" style="margin-left: 6px">{{ lang.download }}</Button>
                </FormItem>
                <FormItem label="" class="alledit">
                    <Button @click="allReject" class="cancel normal" style="margin-right: 6px">{{ lang.batch_reject }}</Button>
                    <Button type="primary" class="normal" @click="allPass" style="">{{ lang.batch_agree }}</Button>
                </FormItem>
            </Form>
        </div>
        <Table ref="table" @on-selection-change="changeChose" :columns="header" :data="signupList"></Table>
        <Row :class="['footer']">
            <Col span="4" :class="['tip']">
               {{ lang.include }}{{total}} {{ lang.record }}
            </Col>
            <Col span="20">
                <Page :current="page" :total="total" :page-size="size" v-if="this.total < this.size ? false : true" show-elevator style="float: right" @on-change="onPageChange"></Page>
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
                fieldValue: '',
                fieldName: '__name',
                formItem: {
                	invitationCode: ''
                },
                details: [],
                signupList: [],
                checkedArray: [],
                mobilesArray: []
			}
		},
        props: {
            id: String
        },
        computed:{
            start(){
                return this.size * Math.max(this.page - 1, 0);
            },
            header(){
                const _this = this;
                const header = [];
                header.push({
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.lang.mobile,
                    key: 'mobile',
                    class: 'table-text',
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
                    key: 'utime',
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
                        let inviteCode = "";
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
                            h('span', {
                                attrs:{
                                    class: 'handle-btn'
                                },
                                domProps:{
                                    innerText: this.lang.reject
                                },
                                on: {
                                    click: () => {
                                        this.rejectSignupList(params.index)
                                    }
                                }
                            }),
                            h('span', {
                                attrs:{
                                    class: 'handle-btn'
                                },
                                domProps:{
                                    innerText: this.lang.agree
                                },
                                on: {
                                    click: () => {  
                                        this.passingSignupList(params.index)
                                    }
                                }
                            })
                        ]);
                    }
                });
                return header;
            }
        },
        mounted(){
            this.getSignupList();
            eventBus.$on('signuplistone', (val) => {
                this.getSignupList();
            })
        },
        methods: {
            getSignupList(){ //获取大会的报名记录
                signupActions.getSignupList({
                    conferenceId: this.id,
                    auditStatuses: ['PENDING'],
                    fieldName: this.fieldName,
                    fieldValue: this.fieldValue,
                    invitationCode: this.formItem.invitationCode,
                    size: this.size,
                    start: this.start,
                    success: res =>{
                        if(res){
                            this.total = res.total || 0;
                            this.signupList = res.data || [];
                        }
                    }
                })
            },
            clickSelect(){  //点击查询按钮
                this.page = 1;
                this.getSignupList();
            },
            editSignupList(array,data){ //操作请求
                signupActions.editSignupList({
                    conferenceId: this.id,
                    mobiles: array,
                    status: data,
                    success: res =>{
                        this.total = this.total - array.length;
                        eventBus.$emit("signuplist",this.signupList.length);
                    }
                })
            },
            rejectSignupList(index){ //驳回操作
                let array = [this.signupList[index].fields[1].value];
                this.$confirm({
                    title: this.lang.confirm_to_reject,
                    content: this.lang.reject_the_person,
                    onConfirm: () =>{
                        this.editSignupList(array,'REJECT');
                        this.signupList.splice(index,1);
                    }
                });
            },
            passingSignupList(index){ //同意操作
                let array = [this.signupList[index].fields[1].value];
                this.$confirm({
                    title: this.lang.confirm_to_agree,
                    content: this.lang.agree_the_person,
                    onConfirm: () =>{
                        this.editSignupList(array,'PASS');
                        this.signupList.splice(index,1);
                    }
                });
            },
            changeChose(data){ //获取选中信息
                this.mobilesArray =[]
                this.checkedArray = data;
                this.getMobilesArray();
                console.log(this.mobilesArray)
            },
            getMobilesArray(){ //获取选中mobile
                for(var i = 0; i < this.checkedArray.length; i++) {
                    this.mobilesArray.push(this.checkedArray[i].fields[1].value);
                }
            },
            deleteSignupList(){
                for(var i = 0; i < this.signupList.length; i++) {
                    for(var j = 0; j < this.mobilesArray.length; j++){
                        if(this.signupList[i].fields[1].value == this.mobilesArray[j]){
                            this.signupList.splice(i,1);
                        }
                    }
                }
            },
            allReject(){  //批量驳回
                if(this.checkedArray.length < 2){
                    this.$confirm({
                        title: this.lang.tips,
                        content: this.lang.check_tip,
                        onConfirm: () =>{
                        }
                    });
                }else{
                    this.$confirm({
                        title: this.lang.confirm_to_reject,
                        content: this.lang.reject_the_selected_person,
                        onConfirm: () =>{
                            this.editSignupList(this.mobilesArray,'REJECT');
                            this.deleteSignupList();
                        }
                    });
                }
            },
            allPass(){  //批量同意
                if(this.checkedArray.length < 2){
                    this.$confirm({
                        title: this.lang.tips,
                        content: this.lang.check_tip,
                        onConfirm: () =>{
                        }
                    });
                }else{
                    this.$confirm({
                        title: this.lang.confirm_to_agree,
                        content: this.lang.agree_the_selected_person,
                        onConfirm: () =>{
                            this.editSignupList(this.mobilesArray,'PASS');
                            this.deleteSignupList();
                        }
                    });
                }
            },
            onPageChange(page){ //点击页号操作
                this.page = page;
                this.getSignupList();
            },
            exportData(){  //下载数据
                const info = getUserInfo();
                const result = this.openExternal(`${config.apiHost}rest/v1/conference/${this.id}/signup/export?conferenceId=${this.id}&auditStatuses[]=PENDING&invitationCode=${this.formItem.invitationCode}&fieldValue=${this.fieldValue}&fieldId=${this.fieldName}&token=${info && info.token || ''}`, '_blank');
                if(!result){
                    this.alert_warning(this.download_failure);
                } 
            }
        }
	}
</script>
<style lang="less">
	.approve-pending{
        padding: 10px;
        .handdle{
            padding: 10px 0 20px;
            .ivu-form-item{
                margin-bottom: 0;
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
        .alledit{
            float: right;
        }
        .alledit::after{
            content:"";
            height:0;
            line-height:0;
            display:block;
            visibility:hidden;
            clear:both
        }
        .ivu-input {
            border-radius: 3px;
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
            margin-left: 10px;
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
        .table-text{
            font-size: 14px;
            color: #555555;
        }
        .handle-btn{
            cursor: pointer;
            font-size: 14px;
            margin: 0 5px;
            color: #007ACE !important;
        }
        .handle-text{
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
            margin: 20px 20px 20px 28px;
            .tip {
                font-size: 12px;
                color: #888888;
            }
        }
	}
</style>