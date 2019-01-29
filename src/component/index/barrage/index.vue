<template>
    <div class="barrage">
        <template v-for="(item,index) in form">
            <template v-if="item.type == 'radio'">
                <Row :class="['row-group']" :key="index" style="width:570px">
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
            <template v-if="item.type == 'slider'">
                <Row :class="['row-group']" :key="index" style="width:570px">
                    <Col :class="['title']">{{item.label}}</Col>
                </Row>
                <Row  style="width:300px">
                    <Col>
                        <Slider v-model="item.value" :min="item.min" :max="item.max" show-input></Slider>
                    </Col>
                </Row>
            </template>
            <template v-if="item.type == 'checkbox'">
                <Row :class="['row-group']">
                    <Col>
                        <Checkbox v-model="item.value">{{item.label}}</Checkbox>
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
                                    :type="item.options.type"
                                    :accept="item.accept"
                                    :show-upload-list="false"
                                    :on-success="item.onSuccess.bind(item)"
                                    :on-error="item.onError.bind(item)"
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
                        <span class="tip">{{lang.recommended_picture_size}}</span>
                    </Col>
                </Row>
            </template>
        </template>

        <Row :class="['row-group']" style="margin-top: 40px;">
            <Col>
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
                <i-button :class="['cancel']" @click="onClearData" style="margin-left: 5px;">{{lang.clear_Barrage_data}}</i-button>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import form_mixin from 'app_src/mixin/form';
import lang from 'app_src/languages/';
import * as barrageActions from 'app_src/actions/barrage';
import * as bgActions from 'app_src/actions/background';

export default {
    props: ['id'],
    mixins: [form_mixin],
    data () {
        return {
            model: 'BARRAGE',
            confirming: false
        }
    },
    methods: {
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                // console.log(this.formData)
                barrageActions.update({
                    conferenceId: this.id,
                    memberId: this.$store.state.memberId,
                    ...this.formData,
                    success: res=>{
                        this.confirming = false;
                        if(res){
                            this.data = res;
                        }
                    },
                    error: res=>{
                        this.confirming = false;
                    }
                });
            }
        },
        onClearData(){
            barrageActions.clear({
                conferenceId: this.id,
                memberId: this.$store.state.memberId,
                success: res =>{
                    this.alert_success(this.lang.operation_succeeded);
                },
                error: res =>{
                    this.alert_error(this.lang.operation_failed);
                }
            });
        },
        initForm(params){
            const _this = this;
            params = params || this.data;

            this.cache.assign('barrageSize',{
                id: 'barrageSize',
                label: this.lang.barrage_font_size+'：',
                type: 'radio',
                required: true,
                radios: [
                    {
                        name: this.lang.big,
                        label: 'LARGE',
                    },
                    {
                        name: this.lang.zhong,
                        label: 'MEDIUM',
                    },
                    {
                        name: this.lang.small,
                        label: 'SMALL',
                    },
                ],
                value: params && params['barrageSize'] || 'MEDIUM',
            });

            this.cache.assign('barrageSpeed',{
                id: 'barrageSpeed',
                label: this.lang.barrage_speed+'：',
                type: 'slider',
                required: true,
                min: 1,
                max: 30,
                value: params && params['barrageSpeed'] || 8,
            });

            let background = params && params['backgroundUrl'] || '';

            this.cache.assign('backgroundUrl',{
                id: 'backgroundUrl',
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
                onError(res){
                    _this.alert_warning(_this.lang.uploadfailed);
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

            this.cache.assign('circulation',{
                id: 'circulation',
                label: this.lang.loop_automaticall,
                type: 'checkbox',
                required: false,
                value: params && params['circulation'] || false,
            });

            this.cache.assign('fullScreen',{
                id: 'fullScreen',
                label: this.lang.full_screen,
                type: 'checkbox',
                required: false,
                value: params && params['fullScreen'] || false,
            });

        },
        loadData(callback){
            barrageActions.getList({
                conferenceId: this.id,
                success: res =>{
                    callback && callback(res);
                },
                error: res =>{
                    
                }
            });
        }
    },
    created () {
         this.$eventbus.$off('tab_barrage_projection').$on('tab_barrage_projection', ()=>{
            console.log('data', this.data);
            let url = config['projection']['barrage'];
            const query = {
                id: this.id,
                env: config.env,
                bg: this.data && this.data['backgroundUrl'] || '',
                lang: lang.getCurrent().id,

                size: this.data && this.data['barrageSize'] || '',
                speed: this.data && this.data['barrageSpeed'] || '',
                circulation: this.data && this.data['circulation']? 1:0,
                fullScreen: this.data && this.data['fullScreen']? 1:0,
            };
            for(let x in query){
                if(query.hasOwnProperty(x)){
                    url += `${/\?/.test(url)? '&':'?'}${x}=${query[x]}`;
                }
            }
            const result = this.openExternal(url, '_blank');
            if(!result){
                this.messageBox.info('请先允许打开浏览器新窗口');
            }
        });
    }
}
</script>

<style lang="less">
.barrage {
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

    .ivu-checkbox {
        margin-right: 5px;
    }
    .ivu-slider-button-wrap{
        top: -6px;
    }
}
</style>

<style lang="less" scoped>
.barrage {
    padding: 20px 40px 40px;
    .title {
        color: #888888;
        line-height: 30px;
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
