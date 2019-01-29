<template>
    <div class="setTest">
        <div class="h">
            <h1>创建考试</h1>
        </div>
        <div class="c">
            <Form class="form" :model="formItem" :label-width="80">
                <FormItem label="考试名称" required>
                    <Input v-model="formItem.name" placeholder="请输入考试名称"></Input>
                </FormItem>
                <FormItem label="考试类型" required>
                    <Select v-model="formItem.examType">
                        <Option value="SPEED">竞速模式</Option>
                        <Option value="SCORE">得分模式</Option>
                    </Select>
                </FormItem>
                <FormItem label="错误延时" required v-if="this.formItem.examType == 'SPEED'">
                    <InputNumber :max="10" :min="0" v-model="formItem.interval" style="width: 100%"></InputNumber>
                </FormItem>
                <FormItem label="考试题库" required>
                    <Select v-model="formItem.questionBlankId">
                        <Option v-for="(item,index) in blankList" :key="index" :value="item.questionBlankDO.id" v-if="item.questionBlankDO.enable">{{item.questionBlankDO.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="起始时间" required>
                    <DatePicker type="datetimerange" placeholder="请选择起始时间" style="width: 320px" v-model="date"></DatePicker>
                    
                </FormItem>
                <FormItem label="题目顺序" >
                    <Switch v-model="formItem.order" size="small"/>
                    (是否有序)
                </FormItem>
                <FormItem label="题目数量" required>
                    <Row>
                        <Col span="2">单选</Col>
                        <Col span="8" >
                            <InputNumber :max="100" :min="0" v-model="formItem.singleQuestionCount" style="width: 100%"></InputNumber>
                        </Col>
                        <Col span="2" offset="2">多选</Col>
                        <Col span="8" >
                            <InputNumber :max="100" :min="0" v-model="formItem.multipleQuestionCount" style="width: 100%"></InputNumber>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="考试规则" required>
                    <Input v-model="formItem.examRegulation" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入考试规则"></Input>
                </FormItem>    
            </Form>
        </div>
        <div class="f">
            <Button type="primary" @click="submitTest">保存</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script>
import * as questionActions from 'app_src/actions/question';
import config from '../../../config/index.js'
export default {
    data (){
        return {
            formItem: {
                name: '',
                examType: 'SPEED',
                questionBlankId: '',
                interval: 1,
                order: true,
                singleQuestionCount: 0,
                multipleQuestionCount: 0,
                examRegulation: ''
            },
            date: [],
            blankList: [],
        }
    },
    computed: {
        examId(){
            return this.$route.query.id;
        }
    },
    methods: {
        getBlankList(){   //获取题库列表，选择题库下拉
            questionActions.questionBankList({
                success: res => {
                    this.blankList = res;
                },
                erroe: err => {
                    this.alert_warning("获取列表失败");
                }
            })
        },
        getTest(){  //如果有examId 获取考试信息
            if(this.examId){
                questionActions.getTestById({
                    examId: this.examId,
                    success: res => {
                        Object.assign(this.formItem,res);
                        this.date = [new Date(res.startTime),new Date(res.endTime)];
                    },
                    erroe: err => {
                        this.alert_warning("获取列表失败");
                    }
                })
            }
        },
        submitTest(){
            if(this.formItem.name == ''){
                this.alert_warning("请输入考试名称");
                return false;
            } else if(this.formItem.questionBlankId == ''){
                this.alert_warning("请选择题库");
                return false;
            } else if(this.date[0] == ''){
                this.alert_warning("请选择起始时间");
                return false;
            } else if(this.formItem.examRegulation == ''){
                this.alert_warning("请输入考试规则");
                return false;
            } else if(this.formItem.examUrl == ''){
                this.alert_warning("请输入考试地址");
                return false;
            } else if(this.examId){
                questionActions.editTest({
                    examId: this.examId,
                    ...this.formItem,
                    startTime: this.date[0].valueOf(),
                    endTime: this.date[1].valueOf(),
                    success: res => {
                        let examUrl = config.apiHost+'app/index.html#/question/start?examId='+this.examId;
                        this.$Modal.confirm({
                            title: '复制考试URL',
                            content: '<p style="word-break:break-all">'+ examUrl +'</p><input type="text" value='+ examUrl +' id="copyObj" style="opacity:0">',
                            okText: '复制',
                            cancelText: '取消',
                            onOk: ()=>{
                                let url = document.querySelector('#copyObj');
                                url.select(); // 选择对象
                                document.execCommand("Copy");
                                this.alert_success("保存并复制成功");
                                setTimeout(()=>{
                                    this.$router.back();
                                }, 1000);
                            },
                            onCancel: ()=>{
                                this.alert_success("保存成功");
                                setTimeout(()=>{
                                    this.$router.back();
                                }, 1000);
                            }
                        });
                    },
                    error: err => {
                        let error = err.response.data;
                        if(error.code == 40314){
                            this.alert_warning(error.msg);
                        }
                    }
                })
            }else{
                questionActions.addTest({
                    ...this.formItem,
                    startTime: this.date[0].valueOf(),
                    endTime: this.date[1].valueOf(),
                    success: res => {
                        let examUrl = config.apiHost+'app/index.html#/question/start?examId='+res.id;
                        this.$Modal.confirm({
                            title: '复制考试URL',
                            content: '<p>'+ examUrl +'</p><input type="text" value='+ exanUrl +' id="copyObj" style="opacity:0">',
                            okText: '复制',
                            cancelText: '取消',
                            onOk: ()=>{
                                let url = document.querySelector('#copyObj');
                                url.select(); // 选择对象
                                document.execCommand("Copy");
                                this.alert_success("保存并复制成功");
                                setTimeout(()=>{
                                    this.$router.back();
                                }, 1000);
                            },
                            onCancel: ()=>{
                                this.alert_success("保存成功");
                                setTimeout(()=>{
                                    this.$router.back();
                                }, 1000);
                            }
                        });
                    },
                    error: err => {
                        let error = err.response.data;
                        if(error.code == 40314){
                            this.alert_warning(error.msg);
                        }
                    }
                })
            }
        },
        cancel(){
            this.$router.back();
        }
    },
    mounted(){
        this.getBlankList();
        this.getTest();
    }
}
</script>

<style lang="less" scoped>
    .setTest{
        width: 100%;
        height: 100%;
        position: relative;
        .h{
            position: absolute;
            top: 0;
            left: 20px;right: 20px;
            height: 50px;
            border-bottom: 1px #999da7 solid;
            h1{
                line-height: 50px;
                font-size: 18px;
            }
        }
        .c{
            position: absolute;
            top: 50px;bottom: 50px;
            left: 0;right: 0;
            padding-top: 20px;
            overflow: auto;
            .form{
                width: 500px;
                margin: 0 auto;
            }
        }
        .f{
            position: absolute;
            left: 0;right: 0;
            bottom: 0;
            height: 50px;
            text-align: center;
            padding-top: 10px;
        }
    }
</style>