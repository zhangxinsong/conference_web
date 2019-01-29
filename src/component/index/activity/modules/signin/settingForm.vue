<template>
    <div class="signin-setting-form">
        <template v-for="(item,index) in form">
            <template v-if="item.type == 'select'">
                <Row :class="['row-group']" :key="index" style="width:570px">
                    <Col span="5" :class="['title']">{{item.label}}</Col>
                    <Col span="19">
                        <Select v-if="item.type == 'select'" v-model="item.value" :style="item.style">
                            <Option v-for="(option,i) in item.options" :key="i" :value="option.value">{{option.label}}</Option>
                        </Select>
                    </Col>
                </Row>
            </template>
            <!-- <template v-else-if="item.type == 'radio'">
                <Row :class="['row-group']" :key="index"  style="width:570px">
                    <Col :class="['title']">{{item.label}}</Col>
                </Row>
                <Row  style="width:570px">
                    <Col>
                        <RadioGroup v-model="item.value">
                            <Radio v-for="(radio,i) in item.radios" :key="i" :label="radio.label">{{radio.name}}</Radio>
                            <span class="tip" v-if="item.tip" style="vertical-align: bottom;">{{item.tip}}</span>
                        </RadioGroup>
                    </Col>
                </Row>
            </template>
            <template v-else-if="item.type == 'upload'">
                <Row :class="['row-group']" :key="index">
                    <Col :class="['title']">{{item.label}}</Col>
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
            </template> -->
        </template>

        <!-- <Row :class="['row-group']"  style="width:570px;">
            <Col>
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
            </Col>
        </Row> -->
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import form_mixin from 'app_src/mixin/form';
import * as signinActions from 'app_src/actions/activity/signin';
import * as bgActions from 'app_src/actions/background';

export default {
    mixins: [form_mixin],
    props: ['id','activityId', 'value'],
    data () {
        return {
            model: 'SIGN_IN',
            confirming: false
        };
    },
    watch: {
        value(){
            this.initData();
        }  
    },
    methods: {
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                signinActions.updateProjectionSetting({
                    activityId: this.activityId,
                    ...this.formData,
                    success: res=>{
                        this.confirming = false;
                        this.initData(res);
                        this.$emit('input', Object.assign({}, this.value || {}, res));
                    },
                    error: res=>{
                        this.confirming = false;
                    }
                });
            }
        },
        initForm(params){
            const _this = this;
            params = params || this.data;

            this.cache.assign('projectionType',{
                id: 'projectionType',
                label: this.lang.screen_mirroring_presentation_method+'：',
                type: 'radio',
                required: true,
                radios: [
                    {
                        name: '2D',
                        label: 'TWOD',
                    },
                    {
                        name: '3D',
                        label: 'THREED',
                    },
                ],
                value: params && params['projectionType'] || 'TWOD',
                style: {
                    'width': '220px',
                }
            });


            let background = params && params['projectionBackground'] || '';

            // if(/^https?\:\/\//i.test(background)){
            //     background = background.replace(/\.thumb\.jpg$/i,'');
            //     this.coverList.assign(background, {
            //         background: background,
            //         thumbBackground: `${background}.thumb.jpg`,
            //     });
            // }

            this.cache.assign('projectionBackground',{
                id: 'projectionBackground',
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
                    'format': ['jpg','jpeg','png'],
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
        initData(params){
            const _this = this;
            params = params || this.value;

            if(params){
                this.data = {
                    ...params.projection,
                };
            }
            this.initForm();
        }
    },
    created() {
        this.initData();
    }
}
</script>

<style lang="less">
.signin-setting-form {
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
    .ivu-radio-wrapper:not(:last-child) {
        margin-right: 30px;
    }
    .ivu-radio-wrapper {
        color: #555555;
    }
}
</style>


<style lang="less" scoped>
.signin-setting-form {
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

    .title {
        color: #888888;
        width: 100px;
        line-height: 30px;
    }

    .ivu-row {
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group {
            margin-top: 20px;
        }
    }
}
</style>

