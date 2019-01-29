<template>
    <Modal
        v-model="isShow" 
        width="522"
        :draggable="true" 
        class="guest-add"
        :title="lang.add_personnel">
        <div class="content">
            <i-row v-for="(item,index) in form" :key="index" :class="['row']">
                <i-col span="3" class="label">
                    <i v-if="item.required" class="required">*</i>
                    <label :for="item.id">
                        {{item.label? `${item.label}:`:``}}
                    </label>
                </i-col>
                <i-col span="21" style="padding-left: 10px;">
                    <template v-if="item.type == 'text'">
                        <i-input v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" ></i-input>
                    </template>
                    <template v-if="item.type == 'tel'">
                        <i-input v-model="item.value" @keyup.native="filterNum(item)" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" ></i-input>
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
            <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.submit}}</i-button>
        </div>
    </Modal>
</template>

<script>
import form_mixin from 'app_src/mixin/form';
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import * as guestActions from 'app_src/actions/guest';

export default {
    mixins: [form_mixin],
    props: ['value', 'id'],
    watch: {
        value(value){
            if(!value){
                this.clearInput();
            }else{
                this.initForm();
            }
        }
    },
    data () {
        return {
            confirming: false
        }
    },
    methods: {
        filterNum(item){
            item.value = item.value.replace(/[^0-9-]+/,'')
        },
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                guestActions.update({
                    conferenceId: this.id,
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

            this.cache.assign('name',{
                id: 'name',
                label: this.lang.name,
                type: 'text',
                required: true,
                placeholder: this.lang.please_enter_name,
                value: res && res['name'] || '',
                maxlength: 50
            });

            this.cache.assign('mobile',{
                id: 'mobile',
                label: this.lang.mobile,
                type: 'tel',
                required: true,
                placeholder: this.lang.please_enter_mobile_number,
                value: res && res['mobile'] || '',
                maxlength: 50,
            });

            this.cache.assign('email',{
                id: 'email',
                label: this.lang.email,
                type: 'text',
                required: false,
                placeholder: this.lang.please_enter_email,
                value: res && res['email'] || '',
                maxlength: 50
            });

            this.cache.assign('company',{
                id: 'company',
                label: this.lang.company,
                type: 'text',
                required: false,
                placeholder: this.lang.please_enter_company,
                value: res && res['company'] || '',
                maxlength: 50
            });

            this.cache.assign('position',{
                id: 'position',
                label: this.lang.position,
                type: 'text',
                required: false,
                placeholder: this.lang.please_enter_position,
                value: res && res['position'] || '',
                maxlength: 50
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
        },
    }
}
</script>

<style lang="less">
.guest-add {
    .ivu-input{
        font-size: 14px;
        color: #555;
    }
    .ivu-modal-body {
        padding: 20px 20px 10px 20px;
    }

    .ivu-modal-footer {
        border-top: none;
    }
}
</style>

<style lang="less" scoped>
.guest-add {
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
</style>
