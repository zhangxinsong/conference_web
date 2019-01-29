<template>
    <Row>
        <Col v-for="(item, index) in form" :key="index" :span="item.span">
            <template v-if="item.type == 'date'">
                 <DatePicker v-model="item.value" type="date" :editable="item.editable" :placeholder="item.placeholder" :style="item.style"></DatePicker>
            </template>
            <template v-else-if="item.type == 'timeRange'">
                <TimePicker v-model="item.value" type="timerange" :editable="item.editable" :format="item.format" :disabled-hours="item['disabled-hours']" :disabled-minutes="item['disabled-minutes']" :placeholder="item.placeholder" :style="item.style"></TimePicker>
            </template>
            <template v-else-if="item.type == 'textarea'">
                <Input v-model="item.value" type="textarea" :autosize="item.autosize" :placeholder="item.placeholder" :style="item.style" :maxlength="item.maxlength"></Input>
            </template>
        </Col>

        <Col span="6">
            <i-button class="cancel" @click="onCancel">{{lang.cancel}}</i-button>
            <i-button type="primary" :class="['confirm',{'disable': !pass}]" :loading="confirming" @click="onConfirm">{{lang.save}}</i-button>
        </Col>
    </Row>
</template>

<script>
import form_mixin from 'app_src/mixin/form';
import * as activityActions from 'app_src/actions/activity';

export default {
    mixins: [form_mixin],
    props: {
        conferenceId: {
            type: String,
            required: true
        },
        value: {
            type: Object,
        },
    },
    watch: {
        value(value){
            this.data = value;
            this.initForm(value);
        }
    },
    data () {
        return {
            confirming: false  
        }
    },
    methods: {
        onCancel(){
            this.$emit('input', null);
            this.clearInput();
            this.$emit('onCancel');
        },  
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                activityActions.updateActivity({
                    conferenceId: this.conferenceId,
                    activityId: this.data && this.data.id || '',
                    ...this.formData,
                    success: res =>{
                        this.confirming = false;
                        this.clearInput();
                        this.$emit('onSuccess', res);
                    },
                    error: res =>{
                        this.confirming = false;
                        this.$emit('onError', res);
                    },
                });
            }
        }, 
        initForm(res){
            res = res || this.data;

            this.cache.assign('activityDate',{
                id: 'activityDate',
                type: 'date',
                editable: false,
                span: 4,
                placeholder: this.lang.activity_date,
                value: res && res['activityDate'] && new Date(res['activityDate']) || '',
            });

            this.cache.assign('timeRange',{
                startId: 'startTime',
                endId: 'endTime',

                span: 5,
                type: 'timeRange',
                placeholder: this.lang.activity_time,
                editable: false,
                required: true,
                timeTurn: true,
                value: [
                    res && res['startTime'] && new Date(res['startTime']).format('hh:mm') || '09:00',
                    res && res['endTime'] && new Date(res['endTime']).format('hh:mm') || '17:00',
                ],
                format: 'HH:mm',
                style: {
                    marginLeft: '10px'
                }
            });

            this.cache.assign('name',{
                id: 'name',
                type: 'textarea',
                span: 9,
                placeholder: '1 - 100 '+ this.lang.characters,
                maxlength: 100,
                value: res && res['name'] || '',
                autosize: {
                    minRows: 1,
                    maxRows: 5
                },
                style: {
                    marginLeft: '10px'
                }
            });
        },
    },
} 
</script>

<style scoped lang="less">
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
        &.disable {
            cursor: not-allowed;
            opacity: .5!important;
        }
    }
    &.cancel {
        background: #E4E4E4;
        color: #555555;
    }
} 
</style>


