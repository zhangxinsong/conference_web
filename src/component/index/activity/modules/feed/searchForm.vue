<template>
    <div class="search-form">
        <Row>
            <Col :span="8" class="clearfix" v-for="(item,index) in form" :key="index" :style="{'padding-left': index != 0? '20px':'0'}">
                <div class="left-item">
                    <label class="title">
                        {{item.label}}
                    </label>
                </div>
                <div class="right-item">
                    <template v-if="item.type == 'text'">
                        <i-input type="text" v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :style="item.style"></i-input>
                    </template>
                    <template v-else-if="item.type == 'dateRange'">
                        <DatePicker v-model="item.value" type="datetimerange" :options="item.options" :format="item.format" :placeholder="item.placeholder" :style="item.style"></DatePicker>
                    </template>
                </div>
            </Col>
            <Col :span="8" style="padding-left: 20px">
                <Button type="primary" :class="['confirm',{disable: !pass}]" @click="onConfirm()">{{lang.query_one}}</Button>
            </Col>
        </Row> 
    </div>   
</template>

<script>
import form_mixin from 'app_src/mixin/form';

export default {
    props: ['value'],
    mixins: [form_mixin],
    watch: {
        formData(value){
            // this.$emit('input', value);
            if(value){
                let cleard = true;
                for(let x in value){
                    if(value.hasOwnProperty(x)){
                        if(value[x]){
                            cleard = false;
                        }
                    }
                }
                if(cleard){
                     this.$emit('onSearchClear', this.formData);
                }
            } 
        }  
    },
    methods: {
        onConfirm(){
            this.$emit('onConfirm', this.formData);
        },
        initForm(params){
            params = params || this.value;
            const _this = this;

            this.cache.assign('keyword',{
                id: 'keyword',
                label: this.lang.input_keyword+'：',
                type: 'text',
                required: false,
                value: params && params['keyword'] || '',
                placeholder: this.lang.input_keywords_speech,
                maxlength: 100
            });

           this.cache.assign('dateRange',{
                 startId: 'startTime',
                 endId: 'endTime',
 
                label: this.lang.feed_time+'：',
                 type: 'dateRange',
                 placeholder: this.lang.please_select_start_time,
                 editable: false,
                 required: false,
                 style: {
                    'width': '100%',
                 },
                 value: [
                     params && params['startTime'] && new Date(params && params['startTime']) || '',
                     params && params['endTime'] && new Date(params && params['endTime']) || '',
                 ],
                 format: 'yyyy/MM/dd HH:mm',
                 options: {
                     shortcuts: [
                         {
                             text: '1'+this.lang.day,
                             value () {
                                 const end = new Date();
                                 const start = new Date();
                                 end.setTime(end.getTime() + 3600 * 1000 * 24);
                                 return [start, end];
                             }
                         },
                         {
                             text: '3'+this.lang.day,
                             value () {
                                 const end = new Date();
                                 const start = new Date();
                                 end.setTime(end.getTime() + 3600 * 1000 * 24 * 3);
                                 return [start, end];
                             }
                         },
                         {
                             text: '1'+this.lang.week,
                             value () {
                                 const end = new Date();
                                 const start = new Date();
                                 end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                                 return [start, end];
                             }
                         }
                     ]
                 }
            });
        },
        initData(){
            // this.data = this.value;
        }
    },
    created () {
        // this.initData();
    }
}
</script>

<style lang="less" scoped>
.search-form {
    color: #888888;
    .title {
        line-height: 30px;
        // width: 75px;
    }

    .left-item {
        float: left;
        width: 70px;
    }

    .right-item {
        margin-left: 70px;
    }
}
</style>
