<template>
    <fs-content-layout class="signin">
        <template slot="title">
            <span>{{lang.h5_from_design}}</span>
            <div class="btn-handdle">
                <Button class="cancel" @click="showShareQrCodeModal">{{lang.share}}</Button>
                <Button class="btn preview-btn" style="margin-left: 6px" @click="showPreviewQrCodeModal">{{lang.preview}}</Button>
            </div>
        </template>
        <template slot="content">
            <div style="width:100%;height:1px;background:rgba(233,233,233,1);"></div>
        	<div class="html5">
                <Layout>
                    <Content>
                        <div class="select-BG">
                            <h3>{{lang.please_select_background_picture}}</h3>
                            <ul class="BG-list">
                                <li 
                                    class="BG" 
                                    v-for="(item, index) in BGListData" 
                                    @click="selectBG(item,index)"
                                    :class="{active: index == checked}"
                                >
                                    <img :src="item.thumbBackground">
                                    <i class="selectBG-icon icon-selected-big"></i>
                                    <i v-if="!(item.backgroundId.indexOf('defaultid') > 0)" class="delBG-icon icon-delete" @click.stop="delBGData(item)"></i>
                                </li>
                                <li class="add-BG">
                                    <Upload 
                                        class="upload-img"
                                        ref="upload"
                                        :action="apiHost + 'rest/v1/client/file/upload'"
                                        :format="['jpg','jpeg','png','gif']"
                                        :on-success="handleSuccess"
                                        :show-upload-list="false"
                                        :data="uploadData"
                                        name="filedata"
                                        :max-size="10240"
                                        :on-exceeded-size="handleMaxSize"
                                        :on-format-error="onFormatError"
                                        :before-upload="beforeUpload"
                                    >
                                        <i class="icon-add"></i>
                                        <span>{{lang.custom_background_upload}}</span>
                                    </Upload>
                                </li>
                            </ul>
                            <div class="ps">{{lang.recommended_picture_size}}</div>
                            <h3 class="h5-title">{{lang.h5_from_fields}}</h3>
                            <div class="select-h5">
                                <div class="checkbox"  v-for="(item, index) in htmlType">
                                    <Checkbox 
                                        :label="item.label" 
                                        v-model="item.selected"
                                        :disabled="!item.allowModify"
                                        @on-change="changeCheckboxValue"
                                    >
                                        <span class="name">{{item.label}}</span>
                                    </Checkbox>
                                    <span class="required" :class="{checked : item.required}" @click="changeRequired(item,index)">{{lang.required}}
                                    </span>
                                    <Icon v-if="item.allowModify" type="android-remove-circle" class="del-icon" @click="delHtmlType(item,index)"></Icon>
                                </div>
                            </div>
                            <div class="custom-h5">
                                <i class="icon-add_two"></i>
                                <span class="new-h5">{{lang.new_user_defined_item}}</span>
                                <div class="custom-box">
                                    <Input v-model.trim="typeName" :placeholder="lang.please_enter_field" class="inp"></Input>
                                    <Button type="error" @click="addHtmlType">{{lang.confirm}}</Button>
                                </div>
                            </div>
                            <div class="btn-wrap">
                                <Button type="error" @click="saveHtmlSet">{{lang.save}}</Button>
                            </div>
                        </div>
                    </Content>
                    <Sider hide-trigger style="width: 450px;max-width: 450px;flex: 0 0 450px;">
                        <div class="phone-show">
                            <div class="phoneBG">
                                <img v-if="thumbBackground" class="phoneBG-img" :src="thumbBackground">
                                <div class="h5-content">
                                    <Form ref="formValidate" 
                                        label-position="top"
                                    >
                                        <h2 class="guide-title" v-if="formTitle">{{formTitle}}</h2>
                                        <template v-for="(item, index) in htmlType">
                                            <FormItem v-if="item.selected && item.order == 3" :label="item.required? lang.identifying_code+'*' : lang.identifying_code" prop="city" class="verification-code">
                                               <Input :placeholder="lang.please_enter_identifying_code" style="flex: 2" readonly></Input>
                                               <Button style="margin-left: 5px;flex:1" disabled>{{lang.get_identifying_code}}</Button>
                                            </FormItem> 
                                            <FormItem v-else-if="item.selected && item.order == 2"  :label="item.required? item.label +'*' : item.label" prop="name">
                                                <Input class="areacode-inp" :placeholder="lang.please_enter+`${item.label}`" readonly>
                                                    <div class="areacode" slot="prepend">
                                                        <span>+86</span>
                                                        <Icon type="ios-arrow-down"></Icon>
                                                    </div>
                                                </Input>
                                            </FormItem>
                                            <FormItem v-else-if="item.selected"  :label="item.required? item.label +'*' : item.label" prop="name">
                                                <Input :placeholder="lang.please_enter+`${item.label}`" readonly></Input>
                                            </FormItem>
                                        </template>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Sider>
                </Layout>
            </div>
        </template>
        <fs-qr-code-modal 
            v-model="isShowQrCodeModal" 
            :title="QRtitle"
            :describe="QRdescribe"
            @getQrCode="getQrCode"
        ></fs-qr-code-modal>
    </fs-content-layout>
</template>

<script>
import config from '../../../../config/index.js';
import * as htmlActions from 'app_src/actions/signin/html5';
import { getUserInfo } from 'app_src/actions/user';
export default {
    data(){
        return{
            apiHost: config.apiHost, //所在环境地址
            token: '',//token
            requireType: '1',//请求类型 1get 2post 3put 4delete 5patch
            uploadData: {
                filedata: '',  //上传文件
                thumbRadio: 50   //图片压缩比例
            },
            fruit: [],
            formTitle: '',//报名表格名称
            typeName: '', //字段名称
            formValidate: {
                name: '',
                mail: '',
                city: '',
            },
            BGListData: [],//背景图片
            htmlType: [], //html5字段
            selectHtmlType: [], //已选择的html5字段
            checked: 0, //背景图片选择索引
            lastOrder: 0, //最后一个字段位置
            thumbBackground: '',//所使用的背景图片
            backgroundImage: '',//背景原图
            defaultImage: '', //默认背景颜色
            isShowQrCodeModal: false,  //是否显示二维码
            QRtitle: '',    //二维码标题
            QRdescribe: '',//二维码描述
            isShare: false,//是否可分享
            QRURL: '' //二维码地址
        }
    },
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout')
    },
    props: {
        id: String
    },
    mounted(){
        const info = getUserInfo();
        this.getBGListData();
        this.token = info.token;
    },
    methods:{
        showShareQrCodeModal(){
            // console.log(this.isShowQrCodeModal); 
            this.isShowQrCodeModal = !this.isShowQrCodeModal;
            this.QRtitle = this.lang.sign_up_and_share;
            this.QRdescribe = this.lang.qr_code_application_page;
            this.QRURL = `http://192.168.43.123:4444/#/conferenceHtml5?conferenceId=${this.id}&isShare=true`;
        },
        showPreviewQrCodeModal(){
            this.isShowQrCodeModal = !this.isShowQrCodeModal;
            this.QRtitle = this.lang.preview;
            this.QRdescribe = this.lang.please_use_youzone;
            this.QRURL = `http://192.168.43.123:4444/#/conferenceHtml5?conferenceId=${this.id}&isShare=false`;
        },
        getQrCode(callback){//获取二维码路径
            callback && callback(this.QRURL);
        },
        handleSuccess(file){ //上传图片成功后
            let backgroundfileUrl = file.fileUrl;
            // console.log('成功',file)
            htmlActions.addBGListData({
                conferenceId: this.id,
                backgroundType: 'SIGN_UP',//html5签到背景
                background: backgroundfileUrl, //上传图片原图
                thumbBackground: backgroundfileUrl, //上传的图片
                success: res =>{
                    this.getBGListData();
                }
            });
        },
        handleMaxSize (file) {
            this.alert_warning(`${this.lang.attachment_size_exceeds_limit}10M`); 
        },
        onFormatError(){
            this.alert_warning(this.lang.invalid_attachment_format);
        },
        beforeUpload(file){
            // console.log("上传图片前",file)
        },
        getSetType(){ //获取html5字段
            htmlActions.getSetType({
                conferenceId: this.id,
                success: res =>{
                    this.formTitle = res.formTitle || '';
                    this.htmlType = res.fields;
                    this.lastOrder = this.htmlType.length + 1;
                    if(!!res.thumbBackground && !!res.backgroundImage){
                        this.thumbBackground = res && res.thumbBackground;
                        this.backgroundImage = res && res.backgroundImage;
                        this.BGListData.forEach((item,index)=>{
                            if(res.backgroundImage == item.background){
                                this.checked = index;
                            }
                        })
                    }else{
                        this.thumbBackground = this.defaultImage;
                        this.backgroundImage = this.backgroundImage;
                    }
                }
            });
        },
        changeRequired(item,index){
            if(item.allowModify){
                item.required = !item.required;
            }
        },
        getBGListData(){ //获取背景图片
            htmlActions.getBGListData({
                conferenceId: this.id,
                backgroundType: 'SIGN_UP',//html5签到背景
                success: res =>{
                    this.BGListData = res;
                    this.defaultImage = res[this.checked].thumbBackground;
                    this.backgroundImage = res[this.checked].background;
                    this.getSetType();
                }
            });
        },
        selectBG(item,index){ //选择背景图片
            this.checked = index;
            this.thumbBackground = item.thumbBackground;
            this.backgroundImage = item.background;
        },
        delHtmlType(item,index){ //删除字段
            this.htmlType.splice(index,1);
            // if(index && index > 2){
            //     htmlActions.delHtmlType({
            //         conferenceId: this.id,
            //         fieldId: item.id,
            //         success: res =>{
                        
            //         }
            //     })
            // }
        },
        addHtmlType(){ //添加自定义字段名称
            if(this.typeName == ''){
                this.alert_warning(this.lang.field_name_is_required);
                return false;
            }else if(this.typeName.length > 15){
                this.alert_warning(this.lang.field_name_two);
                return false;
            }
            let newType = {
                label: this.typeName,
                required: false,
                order: this.lastOrder,
                allowModify: true,
                selected: true
            }
            this.htmlType.push(newType);
            this.typeName = '';
            // htmlActions.addHtmlType({
            //     conferenceId: this.id,
            //     order: this.lastOrder,
            //     label: this.typeName,
            //     success: res =>{
            //         this.getSetType();
            //         this.typeName = '';
            //     }
            // })
        },
        saveHtmlSet(){ //保存html设置
            htmlActions.saveHtmlSet({
                conferenceId: this.id,
                backgroundImage: this.backgroundImage,
                thumbBackground: this.thumbBackground,
                fields: this.htmlType,
                success: res =>{
                    this.alert_success(this.lang.save_success)
                }
            })
        },
        delBGData(item){//删除背景图片
            htmlActions.delBGData({
                conferenceId: this.id,
                backgroundType: 'SIGN_UP',//html5签到背景
                backgroundId: item.backgroundId,
                success: res =>{
                    this.getBGListData();
                }
            })
        },
        changeCheckboxValue(item){
            this.htmlType = this.htmlType;
        }
    }
}
</script>

<style lang="less">
    .signin{
        .share-btn{
            background: #e4e4e4;
            color: #555;
        }
        .preview-btn{
            background: #E14C46;
            color: #fff;
        }
        .ivu-input-group-prepend{
            background: #fff;
        }
        .areacode-inp{
            .ivu-input{
                border-color: #dcdee2 #dcdee2 #dcdee2 #fff;
            }
        }
        .areacode{
            border-right: 1px solid #dcdee2;
            padding-right: 5px;
            span{
                margin-right: 5px;
            }
        }
    }
    .btn-handdle{
        float: right;
    }
    .html5{
        padding: 40px;
        overflow: hidden;
        .verification-code{
            .ivu-form-item-content{
                display: flex;
            }
        }
        .select-BG{
            float: left;
        }
        .ivu-layout,.ivu-layout-sider{
            background: none;
        }
        .BG-list{
            overflow: hidden;
            li{
                float: left;
                margin-top: 15px;
                margin-right: 12px;
                width: 98px;
                height: 80px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                img{
                    width: 98px;
                    height: 80px;
                }
                &:hover{
                    .delBG-icon{
                        display: inline-block;
                    }
                }
            }
            .BG{
                box-shadow: 0 0 4px #E6E7E8;
                &.active{
                    opacity: 0.6;
                    .selectBG-icon{
                        display: block;
                    }
                }
            }
            .add-BG{
                border: 1px dashed #d0d0d0;
                .icon-add{
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin: 32px auto 0;
                    &:before{
                        color: #BFBFBF;
                    };
                }
                span{
                    display: block;
                    text-align: center;
                    font-size: 12px;
                    color: #BFBFBF;
                }
                .upload-img{
                    width: 98px;
                    height: 80px;
                    text-align: center;
                }
            }
            .selectBG-icon{
                display: none;
                position: absolute;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                top: 50%;
                margin-top: -10px;
                left: 50%;
                margin-left: -10px;
            }
            .delBG-icon{
                display: none;
                position: absolute;
                width: 21px;
                height: 21px;
                line-height: 21px;
                text-align: center;
                
                font-size: 12px;
                border-bottom-left-radius: 3px;
                background: rgba(0,0,0, .5);
                top: 0;
                right: 0;
                &.icon-delete:before{
                    color: #fff;
                }
            }
        }
        .ps{
            color: #888;
            margin-top: 5px;
        }
        .h5-title{
            margin-top: 30px;
            color: #555;
        }
        .select-h5{
            margin-top: 15px;
            overflow: hidden;
            span{
                font-size: 14px;
                color: #888;
                position: relative;
                top: -1px;
            }
            .required{
                display: inline-block;
                height: 18px;
                line-height: 16px;
                font-size: 12px;
                border: 1px solid #D0D0D0;
                padding: 0 10px;
                border-radius: 3px;
                color: #BFBFBF;
                cursor: pointer;
                &.checked{
                    border: 1px solid #007ACE;
                    color: #007ACE;
                }
            }
            .checkbox{
                float: left;
                margin-right: 18px;
                margin-bottom: 15px;
                .del-icon{
                    visibility: hidden;
                    font-size: 16px;
                    color: #E14C46;
                    cursor: pointer;
                }
                &:hover{
                    .del-icon{
                        visibility: visible;
                    }
                }
                .name{
                    display: inline-block;
                }
            }
        }
        .custom-h5{
            margin-top: 10px;
            .new-h5{
                position: relative;
                top: -1px;
                color: #888;
            }
            .custom-box{
                margin-top: 10px;
            }
            .inp{
                margin-right: 10px;
                width: 293px;
            }
        }
        .phone-show{
            position: relative;
            float: left;
            width: 324px;
            height: 592px;
            background: url(../../../../assets/images/phoneBG.png) no-repeat;
            .phoneBG{
                position: absolute;
                top: 78px;
                left: 48px;
                width: 230px;
                height: 415px;
                .phoneBG-img{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
            }
            .h5-content{
                position: absolute;
                top: 0;
                padding: 10px;
                width: 230px;
                height: 415px;
                overflow-y: auto;
                z-index: 9;
                .guide-title{
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    margin-bottom: 10px;
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .ivu-btn {
                    font-size: 12px !important;
                }
                .ivu-form .ivu-form-item-label{
                    color: #fff;
                }
                .ivu-form-item{
                    margin-bottom: 10px;
                }
                input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                    font-size: 12px !important;
                }
                input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    font-size: 12px !important;
                }
                input::-moz-placeholder { /* Mozilla Firefox 19+ */
                    font-size: 12px !important;
                }
                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    font-size: 12px !important;
                }
            }
        }
        .btn-wrap{
            padding: 40px 0;
        }
    }
</style>
