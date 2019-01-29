<template>
    <div class="signin">
        <div class="top">
            <Row :class="['row-group']" style="width:300px;">
                <Col span="8" :class="['title']" style="position:relative; top: 4px">{{lang.check_in_personnel_range}}：</Col>
                <Col span="16">
                    <Select v-model="scope" @on-change="onScopeChange">
                        <Option value="SIGNUP">{{lang.applicant}}</Option>
                        <Option value="GUEST">{{lang.attendee}}</Option>
                        <Option value="SIGNUP_AND_GUEST">{{lang.applicants_and_attendees}}</Option>
                        <Option value="ALL">{{lang.all_personnel}}</Option>
                    </Select>
                </Col>
            </Row>

            <Row :class="['row-group']" style="width:300px;">
                <Col span="8" :class="['title']" style="position:relative; top: 4px">{{lang.require_check_in}}：</Col>
                <Col span="16">
                    <Select v-model="enable" @on-change="onEnableChange">
                        <Option value="1">{{lang.required}}</Option>
                        <Option value="0">{{lang.not_needed}}</Option>
                    </Select>
                </Col>
            </Row>

            <fs-setting-form  v-if="enable == '1'" v-model="data" :id="id" :activityId="activityId"></fs-setting-form>
        </div>

        <template v-if="enable == '1'">
            <div class="septer"></div>

            <div class="middle">
                <component v-model="data" :is="component" :activityId="activityId" :group="group" @onChange="onChangeComponent"></component>
            </div>

            <div class="bottom" v-if="qrcode.text">
                <Row :class="['row-group']">
                    <Col :class="['title']">{{lang.check_in_qr_code}}</Col>
                </Row>
                <Row :class="['row-group','qrcode']">
                    <Col>
                        <!-- <fs-qr-code 
                            :text="qrcode.text" 
                            :size="qrcode.size"
                            :margin="qrcode.margin"
                            bgSrc=""
                            :autoColor="true"
                            :binarize="true"
                            :callback="(url,id)=>{qrcode.url = url;}"
                            :bindElement="qrcode.bindElement"
                        ></fs-qr-code> -->
                            <!-- :colorDark="qrcode.colorDark"
                            :colorLight="qrcode.colorLight"
                            :bgSrc="qrcode.bgSrc"
                            :backgroundDimming="qrcode.backgroundDimming"
                            :logoSrc="qrcode.logoSrc"
                            :logoScale="qrcode.logoScale"
                            :logoMargin="qrcode.logoMargin"
                            :logoCornerRadius="qrcode.logoCornerRadius"
                            :whiteMargin="qrcode.whiteMargin"
                            :dotScale="qrcode.dotScale"
                            :autoColor="qrcode.autoColor"
                            :binarize="qrcode.binarize"
                            :binarizeThreshold="qrcode.binarizeThreshold" -->
                        <img :src="qrcode.src" v-if="qrcode.src" style="width: 130px;"/>    
                        <a class="qrcode-cover" :href="qrcode.url" :download="activity && `${activity.name}_qrcode${Date.now()}` || qrcode.name">
                            <i class="icon-download"></i>
                            <p>{{lang.download_qr_code}}</p>
                        </a>
                    </Col>
                </Row>
                <Row :class="['row-group']">
                    <Col>
                        <Input v-model="qrcode.text" readonly style="width:240px;" id="qrcode_address">
                            <span slot="append" class="btn" @click="copy">{{lang.copy}}</span>
                        </Input>
                    </Col>
                </Row>
            </div>
        </template>
    </div>
</template>

<script>
import * as siginActions from 'app_src/actions/activity/signin';
import * as userActions from 'app_src/actions/user';
import * as commonActions from 'app_src/actions/common';
import * as activityActions from 'app_src/actions/activity/index';
import lang from 'app_src/languages/';

import config from 'app_src/config/';
import QRCode from 'qrcode';

export default {
    inject: ['getActivity'],
    props: ['id', 'activityId'],
    components: {
        'fs-setting-form': ()=> import('./settingForm'),
        'fs-prompt-detail': ()=> import('./promptDetail'),
        'fs-prompt-form': ()=> import('./promptForm'),
    },
    data () {
        return {
           scope: 'SIGNUP_AND_GUEST',
           data: null,
           enable: '1',
           component: 'fs-prompt-detail',
           qrcode: {
               text: '',
               size: 130,
               margin: 0,
               url: '',
               name: `${Date.now()}.png`,
               src: ''
           },
           group: null,
           activity: null
        }
    },
    methods: {
        onScopeChange(){
            siginActions.updateScope({
                activityId: this.activityId,
                scope: this.scope,
                success: res =>{
                    this.alert_success(this.lang.update_staff_scope);
                }
            });
        },
        onEnableChange(){
            siginActions.updateEnable({
                activityId: this.activityId,
                enable: this.enable == '1'? true: false,
                success: res =>{
                    this.alert_success(this.lang.check_in_settings_updated_successfully);
                }
            });
        },
        copy(e){
            const qrcode_address = document.querySelector('#qrcode_address input');
            if(qrcode_address){
                qrcode_address.select();
                document.execCommand('copy');
                this.alert_success(this.lang.copy_to_paste_version);
            }
        },
        onChangeComponent(){
            if(this.component == 'fs-prompt-detail'){
                this.component = 'fs-prompt-form';
            }else{
                this.component = 'fs-prompt-detail';
                this.getList();
            }
        },
        getUploadAction(){
            const info = userActions.getUserInfo();
            return `${config.apiHost}rest/v1/client/file/image?token=${info.token}&thumbRadio=100`;
        },
        getList(){
            siginActions.getSettingList({
                activityId: this.activityId,
                success: res =>{
                    this.data = res || null;
                    this.scope = res && res.scope || 'SIGNUP_AND_GUEST';
                    
                    if(this.data 
                    && this.data.enable === true){
                        this.enable = '1';
                    }else{
                        this.enable = '0';
                    }

                    if(res 
                    && res['joinGroupSetting'] 
                    && res['joinGroupSetting']['joinGroupID']){
                        commonActions.getTeamById({
                            groupId: res['joinGroupSetting']['joinGroupID'],
                            success: res =>{
                                this.group = res || {};
                            }
                        });
                    }
                }
            });

            siginActions.getSettingQrCode({
                activityId: this.activityId,
                success: res =>{
                    if(res && res.shortUrl){
                        this.qrcode.text = res.shortUrl;
                        QRCode.toDataURL(this.qrcode.text, { 
                            errorCorrectionLevel: 'Q', 
                            type: 'image/png',
                            margin: 0,
                        }, (err, url)=> {
                            if(!err){
                                this.qrcode.src = url;
                                this.qrcode.url = url;
                            }
                        });
                    }else {
                        this.qrcode.text = '';
                    }
                }
            });
        },
        getActivityInfo(){
            this.activity = this.getActivity();
        }  
    },
    created () {
        this.getList();
        this.getActivityInfo();

        this.$eventbus.$off('tab_signin_statistics').$on('tab_signin_statistics', ()=>{
            this.$router.push({
                path: `${this.$route.fullPath.replace(/(\/activity\/[^\\\/]+)(\/[^\\\/]+)*$/, `$1/statistics`)}`
            });
        });

        /**
         * 签到投屏
         * rongqb 20180813
         */
        this.$eventbus.$off('tab_signin_projection').$on('tab_signin_projection', ()=>{
            let url = config['projection']['signin'][(this.data && this.data['projection'] && this.data['projection']['projectionType'] == 'TWOD')? '2d':'3d'];
            const query = {
                activityId: this.activityId,
                env: config.env,
                bg: this.data && this.data['projection'] && this.data['projection']['projectionBackground'] || '',
            };
            for(let x in query){
                if(query.hasOwnProperty(x)){
                    url += `${/\?/.test(url)? '&':'?'}${x}=${query[x]}`;
                }
            }
            const result = this.openExternal(url, '_blank');
            if(!result){
                this.messageBox.info(this.lang.please_first_allow);
            }
        });
    }
}
</script>

<style lang="less">
.signin {
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

    .ivu-row {
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group:not(:first-child) {
            margin-top: 20px;
        }
    }

    span.btn {
        cursor: pointer;
        color: #555555;
    }
}
</style>


<style lang="less" scoped>
.signin {
    ul.cover-list {
        li{
            width: 180px;
            height: 102px;
            overflow: hidden;
            float: left;
            margin: 0 13px 12px 0;
            // border: 1px dashed rgba(0,0,0,.1);
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);
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

    .top {
        padding: 40px;
        .title {
            color: #888888;
            width: 100px;
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
    }
    
    .bottom {
        padding: 30px 40px;
    }

    .qrcode {
        position: relative;
        display: inline-block;
        &:hover {
            .qrcode-cover{
                display: block;
            }
        }
        .qrcode-cover {
            cursor: pointer;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 130px;
            background: rgba(255,255,255,.9);
            padding-top: 40px;
            text-align: center;
            i {
                font-size: 24px;
            }

            &:hover {
                color: #555555;
                font-size: 12px;
            }
        }
    }
}
</style>
