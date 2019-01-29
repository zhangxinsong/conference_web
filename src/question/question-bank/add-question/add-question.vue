<template>
    <div class="addQuestion">
        <div class="h">
            <h1>添加题目</h1>
        </div>
        <div class="c">
            <Form class="form" :model="formItem" :label-width="80">
                <FormItem label="题目名称" required>
                    <Input v-model="formItem.name" placeholder="E请输入题目名称"></Input>
                </FormItem>
                <FormItem label="题目类型" required>
                    <RadioGroup v-model="formItem.questionType">
                        <Radio label="SINGLE">单选</Radio>
                        <Radio label="MULTIPLE">多选</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="题目描述" required>
                    <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="题目选项" v-if="formItem.questionType == 'SINGLE'" required>
                    <RadioGroup v-model="single" style="width: 100%">
                    <Row v-for="(item,index) in Squestion" :key="index">
                        <Col span="1">
                            <Radio :label="item.label">&nbsp;</Radio>
                        </Col>
                        <Col span="20"  offset="1">
                            <Input v-model="item.value" placeholder="请输入选项"></Input>
                        </Col>
                        <Col span="2" v-if="index == 0" style="textAlign:center">
                            <i class="icon-add" @click="addSingle"></i>
                        </Col>
                        <Col span="2" v-if="index > 1" style="textAlign:center">
                            <i class="icon-remove" @click="deleteSingle(index)"></i>
                        </Col>
                    </Row>
                    </RadioGroup>
                </FormItem>
                <FormItem label="题目选项" v-if="formItem.questionType == 'MULTIPLE'" required>
                    <CheckboxGroup v-model="multiple" style="width: 100%">
                        <Row v-for="(item,index) in Mquestion" :key="index">
                            <Col span="1">
                                <Checkbox :label="item.label">&nbsp;</Checkbox>
                            </Col>
                            <Col span="20"  offset="1">
                                <Input v-model="item.value" placeholder="请输入选项"></Input>
                            </Col>
                            <Col span="2" v-if="index == 0" style="textAlign:center">
                                <i class="icon-add" @click="addMultiple"></i>
                            </Col>
                            <Col span="2" v-if="index > 1" style="textAlign:center">
                                <i class="icon-remove" @click="deleteMultiple(index)"></i>
                            </Col>
                        </Row>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="题目分数" required>
                    <InputNumber :max="10" :min="1" :value="formItem.score" style="width: 100%"></InputNumber>
                </FormItem>
                <FormItem label="优先级" required>
                    <InputNumber :max="10" :min="0" :value="formItem.priority" style="width: 100%"></InputNumber>
                </FormItem>
            </Form>
        </div>
        <div class="f">
            <Button type="primary" @click="submit">保存</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script>
import * as questionActions from 'app_src/actions/question';
export default {
    data (){
        return {
            formItem: {
                name: '',
                questionType: 'SINGLE',
                score: 1,
                description: '',
                priority: 0
            },
            Mquestion: [],
            Squestion: [],
            single: '',
            multiple: [],
        }
    },
    computed: {
        copyQuestion(){   //将Mqestion数组转成['','']
            let question = [];
            if(this.formItem.questionType == 'SINGLE'){
                this.Squestion.map((v,i)=>{
                    question.push(v.value);
                })
                return question;
            }else{
                this.Mquestion.map((v,i)=>{
                    question.push(v.value);
                })
                return question;
            }
        },
        answer(){   //根据label找到对应的value生成answer
            if(this.formItem.questionType == 'SINGLE'){
                let answer = [];
                this.Squestion.map((v,i)=>{
                    if(this.single == v.label){
                        answer[0] = v.value;
                    }
                })
                return answer;
            }else{
                let answer = [];
                this.Mquestion.map((v)=>{
                    this.multiple.map((k)=>{
                        if(k == v.label){
                            answer.push(v.value);
                        }
                    })
                })
                return answer;
            }
        },
        questionBlankId(){
            return this.$route.query.questionBlankId;
        },
        questionId(){
            return this.$route.query.questionId;
        }
    },
    methods: {
        getQuestion(){
            if(this.questionId){
                questionActions.getQuestionById({
                    questionBlankId: this.questionBlankId,
                    questionId: this.questionId,
                    success: res => {
                        this.formItem = {
                            name: res.name,
                            questionType: res.questionType,
                            score: res.score,
                            description: res.description,
                            priority: res.priority
                        };
                        if(res.questionType == 'SINGLE'){
                            let i = 0;   //将res.question转成[{},{}],并将单选框对应到答案
                            for(let v in res.question){
                                this.Squestion.push({label:this.createRandomId(),value:res.question[v]})
                                if(res.answer[0] == v){
                                    this.single =  this.Squestion[i].label;
                                }
                                i++;
                            }
                        }else{
                            let i = 0;
                            for(let v in res.question){
                                this.Mquestion.push({label:this.createRandomId(),value:res.question[v]})
                                res.answer.map((k)=>{
                                    if(k==v){
                                        this.multiple.push(this.Mquestion[i].label);
                                    }
                                })
                                i++;
                            }
                        }
                    },
                    error: err => {}
                })
            }
        },
        submit(){
            if(this.formItem.name == ''){
                this.alert_warning("请输入题目名称");
                return false;
            } else if(this.formItem.description == ''){
                this.alert_warning("请输入题目描述");
                return false;
            } else if(this.formItem.questionType == 'SINGLE' && this.copyQuestion.length < 2){
                this.alert_warning("请输入完整的选项");
                return false;
            } else if(this.formItem.questionType == 'MULTIPLE' && this.copyQuestion.length < 4){
                this.alert_warning("请输入完整的选项");
                return false;
            } else if(this.formItem.questionType == 'SINGLE' && this.single == ''){
                this.alert_warning("请选择答案");
                return false;
            } else if(this.formItem.questionType == 'MULTIPLE' && this.multiple.length <= 1){
                this.alert_warning("请选择答案");
                return false;
            } else if(this.questionId){   //存在questionId，进行编辑接口
                questionActions.editQuestionById({
                    questionBlankId: this.questionBlankId,
                    questionId: this.questionId,
                    ...this.formItem,
                    question: this.copyQuestion,
                    answer: this.answer,
                    success: res => {
                        this.alert_success("保存成功");
                        this.$router.back();
                    },
                    error: err => {
                        this.alert_warning("网络错误");
                    }
                })
            }else{   //不存在走新增接口
                questionActions.addQuestion({
                    questionBlankId: this.questionBlankId,
                    ...this.formItem,
                    question: this.copyQuestion,
                    answer: this.answer,
                    success: res => {
                        this.alert_success("保存成功");
                        this.$router.back();
                    },
                    error: err => {
                        this.alert_warning("网络错误");
                    }
                })
            }  
        },
        createRandomId() {  //得到一个唯一的随机数
            return (Math.random()*10000000).toString(16).substr(0,2)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
        },
        addSingle(){   //增加单选选项
            this.Squestion.push({label:this.createRandomId(),value:''});
        },
        deleteSingle(index){  //删除单选选项
            this.Squestion.splice(index,1);
        },
        addMultiple(){   //增加多选选项
            this.Mquestion.push({label:this.createRandomId(),value:''})
        },
        deleteMultiple(index){   //删除多选选项
            this.Mquestion.splice(index,1);
        },
        cancel(){
            this.$router.back();
        }
    },
    mounted(){
        if(!this.$route.query.questionId){   //如果新增题目，push两个默认选项
            this.Squestion.push({label:this.createRandomId(),value:''},{label:this.createRandomId(),value:''});
            this.Mquestion.push({label:this.createRandomId(),value:''},{label:this.createRandomId(),value:''})
        }
        this.getQuestion();
    }
}
</script>

<style lang="less" scoped>
.addQuestion{
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
    .ivu-checkbox-group-item{
        width: 30px;
    }
}
</style>