<template>
    <div class="statistics">
        <Row :class="['header']">
            <Col span="8">
                <RadioGroup v-model="isSignin" type="button" @on-change="onIssignChange">
                    <Radio label="true">{{lang.checked_in}}</Radio>
                    <Radio label="false">{{lang.not_check_in}}</Radio>
                </RadioGroup>
            </Col>
            <Col span="8" offset="8">
                 <Input v-model="keyword" icon="search" v-if="isSignin == 'true'" :placeholder="lang.please_enter_search_content" clearable style="width: 240px;float: right;" @on-change="onSearch"></Input>
            </Col>
        </Row>

        <Table :columns="header" :data="data"></Table>

        <Row :class="['footer']">
            <Col span="4" :class="['tip']">
                {{lang.include}}{{total}}{{lang.record}}
            </Col>
            <Col span="20">
                <Page :current="page" :total="total" :page-size="size" show-elevator style="float: right" @on-change="onChange"></Page>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import * as signActions from 'app_src/actions/activity/signin';

export default {
    props: ['id', 'activityId'],
    data(){
        return {
            size: 10,
            page: 1,
            total: 0,

            isSignin: 'true',
            keyword: '',
            data: [],

            searchTimer: null
        }
    },
    computed: {
        start(){
            return this.size * Math.max(this.page - 1, 0);
        },
        header(){
            const header = [];
            header.push({
                title: '姓名',
                key: 'name',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row[column.key] || row['username'] || row['user'] && row['user'][column.key] || '');
                }
            },
            {
                title: '电话',
                key: 'mobile',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row[column.key] || row['user'] && row['user'][column.key] || '');
                }
            });
            if(this.isSignin == 'true'){
                header.push({
                    title: '签到时间',
                    key: 'timestamp',
                    render(h, context) {
                        const {row, index, column} = context;
                        let date = '';
                        if(typeof row[column.key] == 'number'){
                            date = new Date(row[column.key]).format('yyyy-MM-dd hh:mm');
                        }
                        return h('span', date);
                    }
                });
                header.push({
                    title: '签到方式',
                    key: 'opearte',
                    render(h, context) {
                        const {row, index, column} = context;
                        let opearte;
                        const opeartes = {
                            SCAN_QR_CODE: '二维码',
                            QR_CODE_CERTIFY: '二维码',
                            FACE: '人脸识别',
                            HELP_SIGN_IN: '他人帮签',
                            OTHER: '其他'
                        };
                        if(row['type']){
                            opearte = opeartes[row['type'].toString().toUpperCase()];
                        }
                        opearte = opearte || opeartes['OTHER'];
                        return h('span', opearte);
                    }
                });
            }
            return header;
        }  
    },
    methods: {
        onSearch(){
            clearTimeout(this.searchTimer);
            this.searchTimer = setTimeout(()=>{
                this.page = 1;
                this.getList();
            }, 1000);
        },
        onIssignChange(){
            this.page = 1;
            this.getList();
        },
        onChange(page){
            this.page = page;
            this.getList();
        },
        getList(){
            signActions.getRecordList({
                activityId: this.activityId,
                size: this.size,
                start: this.start,
                unsign: this.isSignin == 'false',
                keyword: this.keyword,
                success: res =>{
                    if(res){
                        this.total = res.total || 0;
                        this.data = res.data || [];
                    }
                }
            });
        },
    },
    created () {
        this.getList();

        this.$eventbus.$off('tab_signin_setting').$on('tab_signin_setting', ()=>{
            this.$router.push({
                path: `${this.$route.fullPath.replace(/(\/activity\/[^\\\/]+)(\/[^\\\/]+)*$/, `$1/signin`)}`
            });
        });

        this.$eventbus.$off('tab_statistics_export').$on('tab_statistics_export', ()=>{
            const info = getUserInfo();
            const result = this.openExternal(`${config.apiHost}rest/v1/activity/${this.activityId}/signin/export${this.isSignin == 'false'? '/not':''}/${this.id}?token=${info && info.token || ''}`, '_blank');
            if(!result){
                this.messageBox.info('请先允许打开浏览器新窗口');
            }
        });
    }
}
</script>

<style lang="less">
.statistics {
    .ivu-table {
        font-size: 14px;
    }
    .ivu-table,
    .ivu-page {
        color: #555555;
    }
    .ivu-table-wrapper,
    .ivu-table th {
        border: none;
    }
    .ivu-table:after {
        width: 0;
    }
}
</style>


<style lang="less">
.statistics {
    padding: 10px;
    .header {
        padding: 10px 28px 20px 24px;
    }

    .footer {
        margin-top: 20px;
        padding-left: 20px;
        padding-right: 30px;
        .tip {
            font-size: 12px;
            color: #888888;
        }
    }
    
    .ivu-table-cell {
        padding-left: 24px;
    }
}
</style>
