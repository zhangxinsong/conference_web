<template>
    <div class="live-form">
        <template v-for="(item,index) in form">
            <template v-if="item.type == 'text' || item.type == 'dateRange'">
                <Row :class="['row-group']" style="width:530px" :key="index">
                    <Col span="4" :class="['title']">{{item.label}}</Col>
                    <Col span="20">
                        <DatePicker v-if="item.type == 'dateRange'" v-model="item.value" type="datetimerange" :options="item.options" :format="item.format" :placeholder="item.placeholder" :style="item.style"></DatePicker>
                        <i-input v-else-if="item.type == 'text'" v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :style="item.style"></i-input>
                    </Col>
                </Row>
            </template>
            <template v-else-if="item.type == 'upload'">
                <Row :class="['row-group']" :key="index">
                    <Col :class="['title']">{{lang.background_settings}}:</Col>
                </Row>
                <Row>
                    <Col>
                        <ul class="cover-list clearfix">
                             <li v-for="(src,index) in coverList.getAll()" :key="index" :class="[{'choose': item.value == src.background}]" @click="item.value = src.background">
                                <img :src="src.thumbBackground || src.background" v-if="src.thumbBackground || src.background" @error="src.thumbBackground = ''"/>
                                <fs-loading :type="0" v-else></fs-loading>

                                <div class="cover" v-if="item.value == src.background">
                                    <i class="icon-right"></i>
                                </div>

                                <i class="icon-delete" @click.stop="removeCover(src.backgroundId)" v-if="!/^_default/.test(src.backgroundId) && item.value != src.background"></i>
                            </li>
                            <li>
                                <Upload
                                    ref="upload"
                                    :accept="item.accept"
                                    :type="item.options.type"
                                    :show-upload-list="false"
                                    :on-success="item.onSuccess.bind(item)"
                                    :format="item.options['format']"
                                    :max-size="item.options['max-size']"
                                    :on-format-error="item.onFormatError.bind(item)"
                                    :on-exceeded-size="item.onExceededSize.bind(item)"
                                    :before-upload="item.onBeforeUpload.bind(item)"
                                    :action="item.getAction()">
                                    <i class="icon-add icon"></i>
                                    <div>{{lang.custom_background_upload}}</div>
                                </Upload>
                            </li>
                        </ul>
                        <span class="tip" style="position: relative; top: -8px">{{lang.recommended_picture_size}}</span>
                    </Col>
                </Row>
            </template>
        </template>

        <Row>
            <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
        </Row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import form_mixin from 'app_src/mixin/form';
import * as bgActions from 'app_src/actions/background';
import * as liveActions from 'app_src/actions/activity/live';

export default {
    mixins: [form_mixin],
    props: ['activityId', 'value'],
    data () {
        return {
            model: 'LIVE',
            confirming: false
        }
    },
    methods: {
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                liveActions.updateLive({
                    activityId: this.activityId,
                    ...this.formData,
                    enable: true,
                    success: res=>{
                        this.confirming = false;
                        this.data = res;
                        this.$emit('input', res);
                    },
                    error: res =>{
                        this.confirming = false;
                    }
                });
            }
        },
        initForm(res){
            const _this = this;
            res = res || this.data;

            this.cache.assign('liveTheme',{
                id: 'liveTheme',
                label: this.lang.live_subject+'：',
                type: 'text',
                required: true,
                placeholder: this.lang.please_enter_live_broadcasting_subject,
                value: res && res['liveTheme'] || '',
                maxlength: 50,
                style: {
                    'width': '100%',
                },
            });

            this.cache.assign('dateRange',{
                 startId: 'startTime',
                 endId: 'endTime',
 
                 label: this.lang.live_time+'：',
                 type: 'dateRange',
                 placeholder: this.lang.please_select_start_time,
                 editable: false,
                 required: true,
                 style: {
                    'width': '100%',
                 },
                 value: [
                     res && res['startTime'] && new Date(res && res['startTime']) || '',
                     res && res['endTime'] && new Date(res && res['endTime']) || '',
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

            this.cache.assign('liveUrl',{
                id: 'liveUrl',
                label: this.lang.live_URL+'：',
                type: 'text',
                required: true,
                placeholder: this.lang.please_enter_live_broadcasting,
                value: res && res['liveUrl'] || '',
                maxlength: 50,
                style: {
                    'width': '100%',
                },
            });

            let background = res && res['background'] || '';

            // if(/^https?\:\/\//i.test(background)){
            //     background = background.replace(/\.thumb\.jpg$/i,'');
            //     this.coverList.assign(background, {
            //         background: background,
            //         thumbBackground: `${background}.thumb.jpg`,
            //     });
            // }

            this.cache.assign('background',{
                id: 'background',
                label: this.lang.background_settings+'：',
                type: 'upload',
                value: background || '',
                file: {
                    path: background || ''
                },
                required: true,
                options: {
                    'type': 'drag', // select 
                    'with-credentials': false,
                    'max-size': 1024 * 10, //kb
                    'format': ['jpg','jpeg','png','gif','bmp'],                    
                    'accept': 'image/gif,image/jpeg,image/png,image/jpg,image/bmp',  
                },
                getAction(){
                    const info = getUserInfo();
                    return `${config.apiHost}rest/v1/client/file/upload`;
                },
                onSuccess(res){
                    let fileUrl = res && res.fileUrl || '';
                    if(fileUrl){
                        Object.assign(this.file || {}, {
                            path: fileUrl
                        });
                        // _this.coverList.assign(originUrl, {
                        //     background: originUrl || '',
                        //     thumbBackground: res.thumbUrl || '',
                        // });
                        if(!this.value){
                            this.value = fileUrl;
                        }
                        bgActions.add({
                            conferenceId: _this.id,
                            background: fileUrl,
                            thumbBackground: fileUrl,
                            backgroundType: _this.model,
                            success: res =>{
                                _this.coverList.assign(res.backgroundId, res);
                            },
                            error: res =>{

                            }
                        });
                    }
                },
                onFormatError(res){
                    _this.alert_warning(_this.lang.invalid_attachment_format);
                },
                onExceededSize(res){
                    _this.alert_warning(`${_this.lang.attachment_size_exceeds_limit}10M`);
                },
                onBeforeUpload(res){
                    Object.assign(this.file || {}, res);
                }
            });
        },
    },
    created () {
        this.data = this.value;
        this.initForm(this.data);
    }
}
</script>

<style lang="less">
.live {
    ul.cover-list {
        li:last-child {
            & > .ivu-upload {
                height: 100%;
                .ivu-upload-drag {
                    height: 100%;
                    padding-top: 40px;
                    border: none;
                }
            }
        }
    }
}
</style>


<style lang="less" scoped>
.live {
    padding: 40px;
    .ivu-row {
        .title {
            color: #888888;
            // width: 100px;
            line-height: 30px;
        }
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group{
            margin-top: 20px;
        }
    }

     ul.cover-list {
        li{
            width: 180px;
            height: 102px;
            overflow: hidden;
            float: left;
            margin: 0 13px 12px 0;
            // border: 1px dashed rgba(0,0,0,.1);
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            &:hover {
                box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);

                .icon-delete {
                    display: block;
                }
            }

            .cover {
                background: rgba(255, 255, 255, 0.4);
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                text-align: center;
                right: 0;
                line-height: 113px;
                color: #fff;
                font-size: 20px;
            }

            .icon-delete {
                background-color: rgba(0, 0, 0, .2);
                position: absolute;
                top: 0;
                right: 0;
                color: #ffffff;
                display: none;
                border-radius: 4px;
                padding: 3px;
            }
        }
        li:last-child {
            border: 1px dashed #D0D0D0;
            text-align: center;
            font-size: 12px;
            color: #BFBFBF;
            .icon {
                font-size: 20px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
