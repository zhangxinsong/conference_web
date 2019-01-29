<template>
    <div class="feed">
        <div class="top">
            <template v-for="(item,index) in form">
                <template v--if="item.type == 'upload'">
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

            <Row style="margin-top: 20px">
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
            </Row>

        </div>
        <div class="septer"></div>
        <div class="middle">
            <fs-table :id="id" :activityId="activityId"></fs-table>
        </div>
    </div>
</template>

<script>
import form_mixin from 'app_src/mixin/form';
import * as bgActions from 'app_src/actions/background';
import config from 'app_src/config/';
import lang from 'app_src/languages/';
import { getUserInfo } from 'app_src/actions/user';
import * as feedActions from 'app_src/actions/activity/feed';

export default {
    mixins: [form_mixin],
    props: ['id', 'activityId'],
    components: {
        'fs-table': ()=> import('./table.vue')
    },
    data () {
        return {
            confirming: false,
            model: 'NEWS_FEED'
        }
    },
    methods: {
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                feedActions.updateSetting({
                    activityId: this.activityId,
                    ...this.formData, 
                    success: res =>{
                        this.$set(this, 'data', Object.assign({}, this.data, res))
                        this.confirming = false;
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
            let background = res && res['background'] || '';

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
                    if(filePath){
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
        loadData(callback){
            feedActions.getSetting({
                activityId: this.activityId,
                success: res =>{
                    callback && callback(res);
                },
                error: res =>{
                    
                }
            });
        }  
    },
    created () {
        this.$eventbus.$off('tab_feed_projection').$on('tab_feed_projection', ()=>{
            let url = config['projection']['feed'];
            const query = {
                activityId: this.activityId,
                // scope: this.formData.scope,
                env: config.env,
                bg: this.data && this.data['background'] || '',
                lang: lang.getCurrent().id
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
.feed {
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
    .ivu-radio-group-button .ivu-radio-wrapper {
        background-color: #fafafa !important;
    }
}
</style>

<style lang="less" scoped>
.feed {
    .top {
        padding: 20px 40px 30px 40px;
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
        padding: 12px 10px;
        .top {
            padding: 0 40px 0 40px;
        }
    }

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
