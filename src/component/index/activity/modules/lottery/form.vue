<template>
    <div class="lottery-form">
        <template v-for="(item,index) in form">
            <template v-if="item.type == 'select' || item.type == 'textarea'">
                <Row :class="['row-group']" style="width:570px;" :key="index">
                    <Col span="3" :class="['title']">{{item.label}}</Col>
                    <Col span="21">
                        <Select v-if="item.type == 'select'" v-model="item.value" :style="item.style">
                            <Option v-for="(option,i) in item.options" :key="i" :value="option.value">{{option.label}}</Option>
                        </Select>
                        <i-input v-else-if="item.type == 'textarea'" type="textarea" v-model="item.value" :autosize="item.autosize" :placeholder="item.placeholder" :maxlength="item.maxlength"></i-input>
                        
                        <span class="tip" v-if="item.tip" style="margin-top: 10px;">{{item.tip}}</span>
                    </Col>
                </Row>
                
            </template>
            <template v-else-if="item.type == 'radio'">
                <Row :class="['row-group']" :key="index">
                    <Col :class="['title']">{{item.label}}</Col>
                </Row>
                <Row>
                    <Col>
                        <RadioGroup v-model="item.value">
                            <Radio v-for="(radio,i) in item.radios" :key="i" :label="radio.label">
                                {{radio.name}}
                            </Radio>
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
            </template>
        </template>

        <Row :class="['row-group']"  style="width:570px;">
            <Col>
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
            </Col>
        </Row>
    </div>
</template>

<script>
import * as lotteryActions from 'app_src/actions/activity/lottery';
import { getUserInfo } from 'app_src/actions/user';
import config from 'app_src/config/';
import form_mixin from 'app_src/mixin/form';
import * as bgActions from 'app_src/actions/background';


export default {
    props: ['id', 'activityId', 'value'],
    mixins: [form_mixin],
    data () {
        return {
            model: 'LOTTERY',
            confirming: false,
        }
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
                lotteryActions.updateLottery({
                    activityId: this.activityId,
                    ...this.formData,
                    enable: true,
                    success: res=>{
                        this.confirming = false;
                        this.initData(res);
                        this.$emit('input', res);
                    },
                    error: res=>{
                        this.confirming = false;
                    }
                });
            }
        },
        initForm(res){
            const _this = this;
            res = res || this.data;

            this.cache.assign('scope',{
                id: 'scope',
                label: this.lang.lucky_draw_scope+'：',
                type: 'select',
                required: true,
                options: [
                    {
                        value: 'ALL',
                        label: this.lang.all_personnel,
                    },
                    {
                        value: 'SIGN_IN',
                        label: this.lang.checked_in_personnel,
                    },
                ],
                value: res && res['scope'] || 'SIGN_IN',
            });

            this.cache.assign('winnerMessageTemplate',{
                id: 'winnerMessageTemplate',
                label: this.lang.winning_messages+'：',
                type: 'textarea',
                required: true,
                placeholder: this.lang.please_enter,
                value: res && res['winnerMessageTemplate'] || this.lang.meeting_prize,
                maxlength: 500,
                autosize: {
                    minRows: 2,
                    maxRows: 5
                },
                style: {
                    'width': '100%',
                },
                tip: this.lang.description
            });

            this.cache.assign('projectionType',{
                id: 'projectionType',
                label: this.lang.screen_mirroring_method+'：',
                type: 'radio',
                required: true,
                radios: [
                    {
                        name: this.lang.roulette,
                        label: 'TURN_TABLE',
                    },
                    {
                        name: this.lang.d_roulette,
                        label: 'THREED_TURN_TABLE',
                    },
                ],
                value: res && res['projectionType'] || 'TURN_TABLE',
                style: {
                    'width': '220px',
                },
                tip: this.lang.d_roulette_for_over
            });

            let background = res && res['projectionBackground'] || '';

            //  if(/^https?\:\/\//i.test(background)){
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
        initData(params){
            params = params || this.value;
            if(params){
                this.data = {
                    scope: params['scopeSetting'] && params['scopeSetting']['scope'] || '',
                    winnerMessageTemplate: params && params['winnerMessageTemplate'] || '',
                    projectionType: params['projection'] && params['projection']['projectionType'] || '',
                    projectionBackground: params['projection'] && params['projection']['projectionBackground'] || ''
                };
            }
            this.initForm();
        }
    },
    created () {
        this.initData();
    }
}
</script>

<style lang="less">
.lottery-form {
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
        margin-right: 20px;
    }
    .ivu-radio-wrapper {
        color: #555555;
    }
}
</style>


<style lang="less" scoped>
.lottery-form {
    .ivu-row {
        .title {
            color: #888888;
            // width: 100px;
            line-height: 30px;
        }
        &:not(:first-child){
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
    

    .tip {
        display: inline-block;
    }

    .top {
        padding: 40px;
        .title {
            color: #888888;
            // width: 100px;
        }
    }

    .septer {
        position: relative;
        top: 8px;
        height:8px;
        background:linear-gradient(180deg,rgba(216,216,216,1),rgba(255,255,255,1));
        opacity:0.3;
    }

    .middle {
        background-color: #FAFAFA;
        padding: 30px 40px;

        .title {
            
            }

        .left-item {
            color: #888888;
            // width: 100px;
            text-align: right; 
            padding-right: 10px;
        }

        .right-item {
            color: #555555;
        }

        .form {
            width: 570px;
        }
    }
    
    .ivu-row {
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group:not(:first-child) {
            margin-top: 20px;
        }
    }

    .bottom {
        padding: 30px 40px;
    }
}
</style>
