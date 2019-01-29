<template>
    <Modal
        v-model="isShow" 
        width="600"
        :draggable="true" 
        :title="lang.add_agenda">
        <div class="content agenda-add">
            <i-row v-for="(item,index) in form" :key="index" :class="['row']">
                <i-col span="3" class="label">
                    <i v-if="item.required" class="required">*</i>
                    <label :for="item.id">
                        {{item.label? `${item.label}:`:``}}
                    </label>
                </i-col>
                <i-col span="21" style="padding-left:10px">
                    <template v-if="item.type == 'text'">
                        <i-input v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" ></i-input>
                    </template>    
                    <template v-if="item.type == 'timeRange'">
                        <TimePicker v-model="item.value" type="timerange" :format="item.format" :editable="item.editable" :disabled-hours="item['disabled-hours']" :disabled-minutes="item['disabled-minutes']" :placeholder="item.placeholder" :style="item.style"></TimePicker>
                    </template>    
                    <template v-if="item.type == 'textarea'">
                        <i-input type="textarea" v-model="item.value" :autosize="item.autosize" :placeholder="item.placeholder" :maxlength="item.maxlength"></i-input>
                    </template>    
                </i-col>
            </i-row> 
        </div>
        <div slot="footer" class="footer">
            <i-button class="cancel" @click="onCancel">{{lang.cancel}}</i-button>
            <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
        </div>
    </Modal>
</template>

<script>
import form_mixin from 'app_src/mixin/form';
import * as agendaActions from 'app_src/actions/activity/agenda';


export default {
    mixins: [form_mixin],
    inject: ['getActivity'],
    props: ['value', 'activityId', 'id', 'agenda'],
    watch: {
        value(value){
            if(!value){
                this.clearInput();
            }else{
                this.initForm();
            }
        },
        agenda(value){
            this.data = value;
            this.initForm();
        }
    },
    data () {
        return {
            confirming: false
        }
    },
    methods: {
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                agendaActions.updateAgenda({
                    activityId: this.activityId,
                    agendaId: this.agenda && (this.agenda.agendaId || this.agenda.id)  || '',
                    ...this.formData, 
                    success: res =>{
                        this.confirming = false;
                        this.$emit('input', false);
                        this.$emit('onConfirm', res);
                    },
                    error: res =>{
                        this.confirming = false;
                    }
                });
            }
        },  
        onCancel(){
            this.$emit('input', false);
            this.$emit('onCancel');
        },  
        initForm(res){
            res = res || this.data;

            console.log('initForm', res);
            const activity = this.getActivity();

            this.cache.assign('timeRange',{
                startId: 'startTime',
                endId: 'endTime',
                label: this.lang.time_five,
                editable: false,
                type: 'timeRange',
                placeholder: this.lang.please_select_start_time,
                required: true,
                date: activity && activity.activityDate,
                value: [
                    res && res['startTime'] || '',
                    res && res['endTime'] || '',
                ],
                format: 'HH:mm',
                style: {
                    width: '50%'
                }
            });

            this.cache.assign('title',{
                id: 'title',
                label: this.lang.event,
                type: 'text',
                required: true,
                placeholder: this.lang.please_enter,
                value: res && res['title'] || '',
                maxlength: 50
            });

            this.cache.assign('subTitle',{
                id: 'subTitle',
                label: this.lang.sub_title,
                type: 'textarea',
                value: res && res['subTitle'] || '',
                placeholder: this.lang.please_enter,
                required: false,
                maxlength: 100,
                autosize: {
                    minRows: 3,
                    maxRows: 5
                }
            });
        },
    },
    computed: {
        isShow: {
            get(){
               return !!this.value;
            },
            set(value){
                this.$emit('input', !!value);
            }
        }
    }
}
</script>

<style lang="less">
.agenda-add {
    .ivu-modal-body {
        padding: 20px 20px 10px 40px;
    }
    .ivu-modal-footer {
        border-top: none;
    }
}
</style>

<style lang="less" scoped>
.agenda-add {
    .label {
        font-size:14px;
        color:#888888;
        line-height: 30px;
        text-align: right;
    }

    .row {
        padding: 10px 0;
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
