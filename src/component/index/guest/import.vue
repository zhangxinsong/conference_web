<template>
    <div class="guest-import">
        <div class="content">
            <TimelineItem>
                <span class="step" slot="dot">1</span>
                <div>
                    <a :href="templateUrl" :download="template_name">
                        <Button type="primary">{{lang.download_import_template}}</Button>
                    </a>
                    <a class="template clearfix" :href="templateUrl" :download="template_name">
                        <img class="template-img" src="../../../assets/images/common/excel@2x.png"/>
                        <span class="template-name">{{template_name}}</span>
                        <!-- <span class="template-size">{{template_size}}</span> -->
                    </a>
                    <span class="tip">
                        {{lang.download_tips}}
                    </span>
                </div>
            </TimelineItem>
            <TimelineItem>
                <span class="step" slot="dot">2</span>
                <div>
                    <Upload 
                    :action="importUrl"
                    type="select"
                    :show-upload-list="false"
                    :max-size="100 * 1024"
                    accept=".xlsx,.xls,.xlt,.xlsm"
                    :format="['xlsx','xls','xlt','xlsm']"
                    :on-progress="onProgress"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-remove="onRemove"
                    :on-format-error="onFormatError"
                    :on-exceeded-size="onExceededSize"
                    :on-preview="onPreview">
                        <Button type="primary" :loading="uploading">{{lang.import_data}}</Button>
                    </Upload>

                    <Alert type="success" show-icon v-if="result && result.succeed && !result.failed">
                        {{lang.import_succeeded}}
                        <template slot="icon">
                            <span class="icon-alert-success"><span class="path1"></span><span class="path2"></span></span>
                        </template>
                        <template slot="desc">
                            {{lang.successfully_imported_tips}} {{result.succeed}}{{lang.successfully_imported_two}}
                        </template>
                    </Alert>

                    <Alert type="error" show-icon  v-if="result && (result.failed || !result.succeed)">
                        {{lang.import_failed}}
                        <i class="icon-alert-error" slot="icon"></i>
                        <template slot="desc">
                            {{lang.failed_tips}}
                            <i class="highlight">
                                {{result && result.succeed || 0}}
                            </i>
                            {{lang.failed_tips_one}}
                            <template v-if="result && result.failed">
                                <i class="highlight">
                                    {{result && result.failed}}
                                </i>
                                {{lang.failed_tips_two}}
                            </template>
                            <template v-if="result && result.excelUrl">
                                {{lang.failed_tips_three}}
                            </template>
                            <template v-else>
                                {{lang.failed_tips_four}}
                            </template>
                            <a :href="result.excelUrl"  class="download-check" v-if="result && result.excelUrl" download>下载查看</a>
                        </template>
                    </Alert>

                </div>
            </TimelineItem>
        </div>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import * as guestActions from 'app_src/actions/guest';

export default {
    props: ['id'],
    data () {
        return {
            template_img: '',
            template_name: '参会人员导入模版.xls',
            template_size: '30kb',
            uploading: false,
            result: null
        }
    },
    computed: {
        importUrl(){
            return guestActions.getImportUrl(this.id);
        },
        templateUrl(){
            return guestActions.getTemplateUrl(this.id);
        }  
    },
    methods: {
        onProgress(){
            this.uploading = true;
        },
        onSuccess(res){
            this.uploading = false;
            this.result = res;
            this.$set(this, 'result', res);
        },
        onError(res){
            this.uploading = false;
            console.error('onError ',res);
        },
        onRemove(res){
            console.log('onRemove ',res);
        },
        onFormatError(res){
            this.uploading = false;
            console.error('onFormatError ',res);
            this.alert_error(this.lang.invalid_attachment_format);
        },
        onExceededSize(res){
            console.log('onExceededSize ',res);
            this.alert_error(this.lang.attachment_size_exceeds_limit);
        },
        onPreview(res){
            console.log('onPreview ',res);
        },
    }
}
</script>

<style lang="less">
.guest-import {
    .ivu-timeline-item-head-custom {
        margin-top: 14px; 
    }
    .ivu-timeline-item-content {
        padding-left: 30px;
    }

    .ivu-alert-success,
    .ivu-alert-error {
        border-color: #D0D0D0;
        border-radius: 4px;
        background: transparent;
        padding: 10px 20px 10px 43px;
        margin-top: 20px;
    }
    
    .ivu-alert-with-desc .ivu-alert-icon {
        top: 13px;
        left: 20px;
        font-size: 16px;
        margin: 0;
    }

    .ivu-alert-success {
        border-left: 4px solid #00B39E;
    }

    .ivu-alert-error {
        border-left: 4px solid #E14C46;
    }

    .ivu-alert-desc {
        font-size: 12px;
        color: #555555;
    }
}
</style>

<style lang="less" scoped>
.guest-import {
    padding: 40px;
    .content {
        width: 600px;

        .step {
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            color: #B8B8B8;
            border-radius: 50%;
            border: 1px solid #B8B8B8;
            display: inline-block;
            // font-size: 12px;
        }

        .highlight {
            color: #E14C46;
            font-style: normal;
        }

        .template {
            display: block;
            margin: 10px 0;
            padding: 8px 20px 8px 8px;
            color: #555555;
            background-color: #F3F3F3;
            line-height: 30px;
            border-radius: 1px;
            .template-img {
                float: left;
                width: 30px;
                height: 30px;
            }
            .template-name {
                float: left;
                margin-left: 10px;
            }
            .template-size {
                float: right;
                color: #888888;
            }
        }

        .download-check {
            display: block;
            border: 1px solid #E14C46;
            border-radius: 4px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            width: 80px;
            color: #E14C46;
            margin-top: 10px;
        }
    }

    .top {
        color: #BFBFBF;
    }
}
</style>
