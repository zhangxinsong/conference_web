<template>
    <div class="questionList">
        <div class="listHead">
            <div class="headTitle">题目列表</div>
            <div class="addQuestion" @click="importQuestion">导入题目</div>
            <div class="importQuestion" @click="addQuestion">新增题目</div>
        </div>
        <div class="listContent">
            <Table border :columns="columns" :loading="loadingList" :data="data"></Table>
        </div>
        <div class="listFoot">
            <Page :total="total" :current="pageNum" :page-size='10'  show-elevator @on-change="changePage" />
        </div>
        <Modal
            title="导入题目"
            v-model="importModal"
            :closable="false"
            @on-ok="modalOk"
            @on-cancel="modalCancel">
            <div class="importModal">   
                <Timeline>
                    <TimelineItem color="green">
                        <span class="step" slot="dot">1</span>
                        <div class="download-template">
                            <a :href="templateUrl" download="导入题目模板.xls">
                                <Button type="primary">下载导入模板</Button>
                            </a>
                            <a class="template" :href="templateUrl" download="导入题目模板.xls">
                                <img class="template-img" src="../../../assets/images/common/excel@2x.png" />
                                <span class="template-name">导入题目模板.xls</span>
                            </a>
                            <span class="tip">
                                您可以直接下载Excel模板，按照指定格式编辑导入用户信息，然后导入数据。
                            </span>
                        </div>
                    </TimelineItem>
                    <TimelineItem>
                        <span class="step" slot="dot">2</span>
                        <Upload 
                            :action="importUrl"
                            type="select"
                            :show-upload-list="false"
                            :max-size="100 * 1024"
                            accept=".xlsx,.xls,.xlt,.xlsm"
                            :format="['xlsx','xls','xlt','xlsm']"
                            :on-progress="onProgress"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :on-remove="onRemove"
                            :on-format-error="onFormatError"
                            :on-exceeded-size="onExceededSize"
                            :on-preview="onPreview">
                            <Button type="primary" :loading="uploading">导入数据</Button>
                        </Upload>
                        <Alert class="alert" type="success" show-icon v-if="result && result.succeed && !result.failed">
                            导入成功
                            <template slot="icon">
                                <span class="icon-alert-success"><span class="path1"></span><span class="path2"></span></span>
                            </template>
                            <template slot="desc">
                                您成功导入题目{{result.succeed}}条。
                            </template>
                        </Alert>

                        <Alert class="alert" type="error" show-icon  v-if="result && (result.failed || !result.succeed)">
                            导入失败
                            <i class="icon-alert-error" slot="icon"></i>
                            <template slot="desc">
                                您提供的excel中有
                                <i class="highlight">
                                    {{result && result.succeed || 0}}
                                </i>
                                条成功，
                                <template v-if="result && result.failed">
                                    <i class="highlight">
                                        {{result && result.failed}}
                                    </i>
                                    条数据不符合导入规则，
                                </template>
                                <template v-if="result && result.excelUrl">
                                    我们对这些数据做了黄色标识，请下载修改后重新导入。
                                </template>
                                <template v-else>
                                    请核对上传的表格是否符合约定规范，请按照约定规范重新上传。
                                </template>
                                <a :href="result.excelUrl"  class="download-check" v-if="result && result.excelUrl" download>下载查看</a>
                            </template>
                        </Alert>
                    </TimelineItem>
                </Timeline>
            </div>
        </Modal>
    </div>
</template>

<script>
import * as questionActions from 'app_src/actions/question';
export default {
    data (){
        return {
            importModal: false,
            uploading: false,
            result: null,
            data: [],
            total: 0,
            pageNum: 1,
            loadingList: true,
            columns: [
                {
                    title: '题目描述',
                    key: 'description',
                },
                {
                    title: '题目类型',
                    key: 'questionType',
                    width: 90
                },
                {
                    title: '题目选项',
                    key: 'opt',
                    render: (h, params) => {
                        let authDeptNames = [];
                        let keys = ['A','B','C','D','E','F'];
                        let opt = params.row.question;
                        Object.values(opt).map((k,i)=>{
                                authDeptNames.push(h('p', {
                                    style: {
                                        "textAlign": 'left',
                                        "fontSize": '14px',
                                        "color": '#555555',
                                        "line-height":"20px"
                                    },
                                    domProps:{
                                        innerText: keys[i] + ":" + k,
                                    }
                                }))
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
                    title: '正确答案',
                    key: 'right',
                    render: (h, params) => {
                        let authDeptNames = [];
                        let right = params.row.answer;
                        right.map((k,i)=>{
                                authDeptNames.push(h('p', {
                                    style: {
                                        "textAlign": 'left',
                                        "fontSize": '14px',
                                        "color": '#555555',
                                        "line-height":"20px"
                                    },
                                    domProps:{
                                        innerText: params.row.question[k],
                                    }
                                }))
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
                    title: '题目分数',
                    key: 'score',
                    width: 90
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 190,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    background: '#00a100',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        this.editQuestion(params.row.id)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    size: 'small'
                                },
                                style: {
                                    background: '#E14C46',
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        this.deleteQuestion(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ]
        }
    },
    computed: {
        questionBlankId(){
            return this.$route.query.id
        },
        importUrl(){
            return questionActions.getImportUrl(this.questionBlankId);
        },
        templateUrl(){
            return questionActions.getTemplateUrl(this.questionBlankId);
        },
        start(){
            return (this.pageNum - 1) * 10;
        }
    },
    methods: {
        getQuestionList(){   //获取题目列表
            questionActions.questionList({
                questionBlankId: this.questionBlankId,
                start: this.start,
                success: res => {
                    this.data = res.data;
                    this.total = res.total;
                    this.loadingList = false;
                },
                err: res => {
                }
            })
        },
        editQuestion(id) {   // 点击编辑题目
            this.$router.push({
                path: '/question/addQuestion',
                query: {
                    questionBlankId: this.questionBlankId,
                    questionId : id
                }
            });
        },
        deleteQuestion(id) {   //删除题目
            questionActions.deleteQuestion({
                questionBlankId: this.questionBlankId,
                questionId: id,
                success: res => {
                    this.getQuestionList();
                    this.alert_success("删除成功");
                },
                err: res => {
                    this.alert_warning("删除失败");
                }
            })
        },
        addQuestion(){     //添加题目
            this.$router.push({
                path: '/question/addQuestion',
                query: {
                    questionBlankId: this.questionBlankId
                }
            });
        },
        changePage(a){
            this.pageNum = a;
            this.getQuestionList();
        },
        importQuestion(){
            this.importModal = true;
        },
        modalOk(){
            this.result = null;
            this.getQuestionList();
        },
        modalCancel(){
            this.result = null;
            this.getQuestionList();
        },
        onProgress(){
            this.uploading = true;
        },
        onSuccess(res){
            this.uploading = false;
            this.result = res;
            this.$set(this, 'result', res);
        },
        onError(res){
            this.uploading = false;
            console.error('onError ',res);
        },
        onRemove(res){
            console.log('onRemove ',res);
        },
        onFormatError(res){
            this.uploading = false;
            console.error('onFormatError ',res);
        },
        onExceededSize(res){
            console.log('onExceededSize ',res);
        },
        onPreview(res){
            console.log('onPreview ',res);
        },
    },
    mounted(){
        this.getQuestionList();
    }
}
</script>

<style lang="less" scoped>
    .questionList{
        height: 100%;
        position: relative;
        .listHead{
            height: 60px;
            position: absolute;
            left: 0;right: 0;
            top: 0;
            border-bottom: 1px #e7e7e7 solid;
            .headTitle{
                display: inline-block;
                color: #464646;
                font-size: 18px;
                line-height: 60px;
                margin-left: 20px;
            }
            .addQuestion{
                float: right;
                font-size: 12px;
                color: #fff;
                background: #E14C46;
                border-radius: 4px;
                padding: 6px 18px;
                margin-top: 14px;
                margin-right: 40px;
                cursor: pointer;
            }
            .importQuestion{
                float: right;
                font-size: 12px;
                color: #fff;
                background: #E14C46;
                border-radius: 4px;
                padding: 6px 18px;
                margin-top: 14px;
                margin-right: 20px;
                cursor: pointer;
            }
        }
        .listContent{
            position: absolute;
            left: 0;right:0;
            top: 60px;bottom:70px;
            padding: 20px 20px;
            overflow-y: scroll;
        }
        .listFoot{
            position: absolute;
            left: 0;right: 0;
            bottom: 0;
            text-align: center;
            height: 70px;
            padding: 19px 0;
        }
    }
</style>
<style lang="less">
    .importModal{
        width: 300px;
        margin: 0 auto;

        .ivu-timeline-item-head-custom{
            margin-top: 14px;
        }
        .step {
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            color: #B8B8B8;
            border-radius: 50%;
            border: 1px solid #B8B8B8;
            display: inline-block;
            // font-size: 12px;
        }
        .download-template{
            .template{
                display: flex;
                margin: 10px 0;
                padding: 8px 20px 8px 8px;
                color: #555555;
                background-color: #F3F3F3;
                line-height: 30px;
                border-radius: 1px;
                .template-img{
                    float: left;
                    width: 30px;
                    height: 30px;
                }
                .template-name{
                    float: left;
                    margin-left: 10px;
                }
            }
        }
        .alert{
            margin-top: 10px;
            margin-bottom: 0;
        }
    }
    .ivu-modal-body{
        padding-bottom: 10px;
    }
</style>
