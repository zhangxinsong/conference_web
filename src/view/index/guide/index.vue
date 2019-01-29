<template>
    <fs-content-layout class="guide">
        <template slot="title">
            <span>{{lang.conference_guideline}}</span>
            <div class="btn-handdle">
                <Button type="error" @click="isShowQrCodeModal = !isShowQrCodeModal">{{lang.preview}}</Button>
            </div>
        </template>
        <template slot="content" class="guide-main">
            <div style="height:1px;background:rgba(233,233,233,1);"></div>
        	<div class="guide-main">
                <Layout>
                    <Sider width="416">
                        <!-- 大会指南左侧 -->
                        <div class="guide-manage">
                            <ul class="guide-list clearfix">
                                <li 
                                    v-for="(item, index) in guideListData" 
                                    @click="getGuideListInfo(item, index)"
                                    :class="{active : index == activeIndex}"
                                >
                                    <div class="guide-icon">
                                        <img :src="item.icon" class="gray-img" :alt="item.name">
                                    </div>
                                    <div class="guide-name">{{item.name}}</div>
                                    <div class="guide-handdle">
                                        <i class="icon icon-edit01" @click.stop="editGuideItem(item)"></i>
                                        <i class="icon icon-remove" @click.stop="delGuideItem(item)"></i>
                                    </div>
                                </li>
                                <li class="add-btn">
                                    <div class="guide-icon icon-add" @click="addGuide"></div>
                                </li>
                            </ul>
                            <div class="guide-content" v-if="guideItemInfo.length > 0">
                                <div 
                                    class="guide-content-list" 
                                    v-for="(item, index) in guideItemInfo"
                                    @click="editorGuideInfo(item)"
                                >
                                    <h2 v-if="item.title" class="title">{{item.title}}</h2>
                                    <div v-if="item.content" class="con" v-html="item.content">
                                    </div>
                                </div>
                            </div>
                            <div class="btn-wrap">
                                <Button class="btn-add" href="javascript:;" icon="android-add" @click="addActive">{{lang.add_guide}}</Button>
                            </div>
                        </div>
                    </Sider>
                    <Content v-show="isShowUEditor">
                        <!-- 大会指南右侧 -->
                        <div class="guide-ueditor">
                            <div class="guide-title">
                                <Input v-model.tirm="guideTitle" :placeholder="lang.title" class="title"></Input>
                            </div>
                            <div class="ueditor">
                                <vue-ueditor ref="UEditor" @ready="editorReady" :ueditorConfig="config"  ueditorPath="/conference/web/static/ueditor/"></vue-ueditor>
                           <!--      <vue-ueditor ref="UEditor" @ready="editorReady" :ueditorConfig="config"  ueditorPath="/static/ueditor/"></vue-ueditor> -->
                            </div>
                            <div class="btn-wrap">
                                <Button type="error" class="btn-error" style="margin-right: 8px" @click="saveGuideData" :loading="loading">{{lang.save}}</Button>
                                <Button @click="delGuideData" type="primary" class="cancel" :loading="loading">{{lang.delete}}</Button>
                            </div>
                        </div>
                    </Content>
                </Layout>
                <!-- 选择指南 -->
                <Modal
                    v-model="isCheckGuide"
                    :title="lang.select_guide"
                    width="615"
                    >
                    <ul class="change-guide">
                        <li 
                            v-for="(item, index) in selectGuideArr" 
                            :class="{active: index == checkedIndex}" 
                            @click="selectGuideOne(item,index)"
                            :key="index"
                        >
                            <div class="guide-icon active">
                                <img :src="item.icon" :alt="item.name">
                            </div>
                            <div class="guide-name">{{item.name}}</div>
                            <i class="selected">
                                <i class="icon-selected-small"></i>
                            </i>
                        </li>
                    </ul>
                    <div slot="footer" class="btn-wrap">
                        <Button type="primary" class="cancel" @click="cancelAddGuide">{{lang.cancel}}</Button>
                        <Button type="error" class="btn-error" @click="addGuideItem">{{lang.select}}</Button>
                    </div>
                </Modal>
                <!-- 编辑指南 -->
                <Modal
                    v-model="isEditGuide"
                    :title="lang.edit_guide"
                    width="450"
                    >
                    <div class="edit-guide">
                        <Form label-position="left" :label-width="70">
                            <FormItem :label="lang.edit_icon">
                                <Upload 
                                    class="guide-icon" 
                                    ref="upload"
                                    :action="apiHost + 'rest/v1/client/file/image?token=' + token +'&thumbRadio=100'"
                                    :format="['jpg','jpeg','png','gif']"
                                    :on-success="handleSuccess"
                                    :show-upload-list="false"
                                    :data="uploadData"
                                    name="filedata"
                                    :max-size="10240"
                                >
                                    <div class="guide-icon icon-add"></div>
                                </Upload>
                                <div class="guide-icon">
                                    <img :src="iconUrl">
                                </div>
                            </FormItem>
                            <FormItem :label="lang.guide_name">
                                <Input v-model="guideName" :placeholder="lang.guide_name_two"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div slot="footer" class="btn-wrap">
                        <Button type="primary" class="cancel" @click="cancelEditAddGuide">{{lang.cancel}}</Button>
                        <Button type="error" class="btn-error" @click="addEditGuideItem">{{lang.select}}</Button>
                    </div>
                </Modal>
            </div>
        </template>
        <fs-qr-code-modal v-model="isShowQrCodeModal" @getQrCode="getQrCode" :title="this.lang.preview" :describe="this.lang.please_use_youzone"></fs-qr-code-modal>
    </fs-content-layout>
</template>

<script>
import config from '../../../config/index.js';
import * as guideActions from 'app_src/actions/guide';
import { getUserInfo } from 'app_src/actions/user';
export default {
    data () {
        return {
            apiHost: config.apiHost, //所在环境地址
            token: '',//token
            uploadData: {
                filedata: '',  //上传文件
                thumbRadio: 50   //图片压缩比例
            },
            loading: false,
            guideTitle: '',//大会标题
            guideContent: '',//大会内容
            isCheckGuide: false, //是否显示选择指南弹层
            isEditGuide: false,//是否显示编辑指南弹层
            isShowUEditor: false, //是否显示编辑器
            guideListData: [], //大会指南列表
            selectGuideArr: [],//选择指南列表
            checkedIndex: -1,//选择目标指南索引
            activeIndex: 0,//选择指南条目
            guideItem: '',//选择的指南
            guideItemInfo: '',//大会条目信息
            guideId: '',//指南ID
            requireType: '1',//请求类型 1get 2post 3put 4delete
            iconUrl: '',//图标地址
            guideName: '',//指南名称
            isShowQrCodeModal: false,//是否显示二维码
            config: {
                initialFrameWidth: '100%',      //初始化编辑器宽度,默认1000
                initialFrameHeight: 415,        //初始化编辑器高度,默认320
                zIndex : 1,                     //编辑器层级的基数,默认是900
                elementPathEnabled : false,     //是否启用元素路径，默认是显示
                maximumWords: 5000,             //允许的最大字符数
                autoFloatEnabled: false,        //是否保持toolbar的位置不动,默认true
                enableAutoSave: false,          //自动保存
                saveInterval: 90000000,
                autoSyncData: false,            //自动同步编辑器要提交的数据
                //内容很长出现滚动条
                autoHeightEnabled: false,
                toolbars:[
                  [
                    'bold', 
                    'italic', 
                    'underline', 
                    'fontborder', 
                    'strikethrough', 
                    'removeformat',
                    'forecolor', 
                    'backcolor', 
                    'selectall', 
                    '|',
                    'rowspacingtop', 
                    'rowspacingbottom', 
                    'lineheight', 
                    // 'fontfamily', 
                    'fontsize', 
                    'horizontal', 
                    'insertorderedlist', 
                    'insertunorderedlist',
                    'indent',//分割线、有序列表、无序列表、首行缩进
                    'justifyleft', 
                    'justifycenter', 
                    'justifyright', 
                    'justifyjustify', 
                    '|',
                    'link', 
                    'unlink', 
                    '|', 
                    'imagenone', 
                    'imageleft', 
                    'imageright', 
                    'imagecenter', 
                    '|',
                    'simpleupload', 
                    // 'insertimage',
                    'insertvideo'
                  ]
                ]
            },
        }
    },
    props: {
        id: String,
    },
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
        'vue-ueditor': ()=> import('../../../component/common/vue-ueditor/')
    },
    mounted(){
        const info = getUserInfo();
        this.getGuideListData();
        this.token = info.token;
    },
    methods: {
        getQrCode(callback){//获取二维码路径
            callback && callback(`${this.apiHost}/app/index.html#/conferenceGuide?conferenceId=${this.id}`);
        },
        handleSuccess(file){ //上传图片成功后
           this.iconUrl = file && file.thumbUrl;
        },
        getGuideListData(){
            guideActions.getGuideListData({
                conferenceId: this.id,
                success: res =>{
                    this.guideListData = res && res.data;
                    this.guideId = res && res.data[0].id; //获取默认指南ID
                    this.getGuideInfo();
                }
            });
        },
        addEditGuideItem(){ //保存编辑指南
            if(this.guideName.length == 0){

                this.alert_warning(this.lang.guide_name_three);
                return false;
            }else if(this.guideName.length > 10){
                this.alert_warning(this.lang.guide_name_two);
                return false;
            }
            guideActions.addEditGuideItem({
                conferenceId: this.id,
                guideId: this.guideId,
                name: this.guideName,
                icon: this.iconUrl,
                success: res =>{
                    this.getGuideListData();
                    this.isEditGuide = !this.isEditGuide;
                }
            });
        },
        getGuideListInfo(item,index){ //指南条目信息
            this.isShowUEditor = false;//隐藏编辑器
            this.activeIndex = index || 0;
            this.guideId = item && item.id; //获取指南ID
            this.getGuideInfo();
        },
        // 获取选择条目信息
        getGuideInfo(){
            this.requireType = 1;
            guideActions.getGuideInfo({
                conferenceId: this.id,
                guideId: this.guideId,
                requireType: this.requireType,
                success: res =>{
                    this.guideItemInfo = res && res.items;
                }
            })
        },
        editGuideItem(item){//编辑指南
            this.isEditGuide = !this.isEditGuide;
            this.iconUrl = item.icon;
            this.guideName = item.name;
            this.guideId = item.id;
        },
        cancelEditAddGuide(){//取消编辑指南
            this.isEditGuide = !this.isEditGuide;
        },
        delGuideItem(item){ //删除指南
            this.$confirm({
                title: this.lang.confirm_to_delete,
                content: this.lang.delete_the_guide,
                onConfirm: () =>{
                    this.requireType = 4;
                    guideActions.getGuideInfo({
                        conferenceId: item.conferenceId,
                        guideId: item.id,
                        requireType: 4,
                        success: res =>{
                            this.getGuideListData();
                        }
                    })
                }
            });
        },
        addActive(){ //添加活动
            this.isShowUEditor = true;
            this.guideTitle = ''; //重置title
            this.$refs.UEditor.instance.setContent('');//重置内容
            this.itemId = ''; //重置条目ID
        },
        editorGuideInfo(item){ //编辑指南内容
            this.isShowUEditor = true;
            this.guideTitle = item.title;
            this.guideContent = item.content;
            this.itemId = item.guideItemId;
            this.$refs.UEditor.instance.setContent(this.guideContent);
        },
        editorReady (editorInstance) {
            editorInstance.addListener('contentChange', () => {
                this.guideContent = editorInstance.getContent();
                // console.log(this.guideContent)
            });
            // console.log('数据',editorInstance.getActionUrl())
            editorInstance._bkGetActionUrl = editorInstance.getActionUrl;
            editorInstance.getActionUrl = (action) =>  {
                if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage' ) {
                    var url = this.apiHost + `rest/v1/client/file/image/compatible?token=${this.token}&thumbRadio=100`;
                    return url;
                }else if (action == 'uploadvideo') {
                    var url = this.apiHost + `rest/v1/client/file?token=${this.token}&thumbRadio=100`;
                    return url;
                }
            }
            // editorInstance.getActionUrl = (action) =>  {
            //     console.log("点击",action)
            // }
        },
        addGuide(){ //添加指南弹层
            this.isCheckGuide = !this.isCheckGuide;
            if(this.isCheckGuide){
                this.getSelectGuide();
            }
        },
        // 取消添加指南
        cancelAddGuide(){
            this.isCheckGuide = !this.isCheckGuide;
        },
        saveGuideData(){ 
            if(this.guideTitle.length == 0){
                this.alert_warning(this.lang.title_is_required);
                return false;
            }
            if(this.guideContent.length == 0){
                this.alert_warning(this.lang.content_is_required);
                return false;
            }
            this.loading = !this.loading;
            if(!this.itemId){ //保存指南信息
                guideActions.saveGuideData({
                    conferenceId: this.id,
                    title: this.guideTitle,
                    content: this.guideContent,
                    guideId: this.guideId,
                    success: res =>{
                        this.data = res;
                        this.getGuideInfo();
                        this.loading = !this.loading;
                        this.isShowUEditor = !this.isShowUEditor;
                    }
                });
            }else{//更新指南信息
                guideActions.updateGuideData({
                    conferenceId: this.id,
                    title: this.guideTitle,
                    content: this.guideContent,
                    guideId: this.guideId,
                    id: this.itemId,
                    success: res =>{
                        this.data = res;
                        this.getGuideInfo();
                        this.loading = !this.loading;
                        this.isShowUEditor = !this.isShowUEditor;
                    }
                });
            }
        },
        delGuideData(){//删除指南信息
            this.$confirm({
                title: this.lang.confirm_to_delete,
                content: this.lang.delete_the_guide,
                onConfirm: () =>{
                    if(this.itemId){
                        guideActions.delGuideData({
                            conferenceId: this.id,
                            guideId: this.guideId,
                            id: this.itemId,
                            success: res =>{
                                this.data = res;
                                this.isShowUEditor = false;
                                this.getGuideInfo();
                            }
                        });
                    }else{
                        this.isShowUEditor = false;
                    }
                }
            });
        },
        getSelectGuide(){//获取选择指南列表
            guideActions.getSelectGuide({
                conferenceId: this.id,
                success: res =>{
                    this.selectGuideArr = res;
                }
            })
        },
        selectGuideOne(item,index){ //选择指南
            this.checkedIndex = index;
            this.guideItem = item; //选择的指南
        },
        addGuideItem(){ //添加大会指南
            if(!!this.guideItem){
                guideActions.addGuideItem({
                    conferenceId: this.id,
                    icon: this.guideItem.icon,
                    name: this.guideItem.name,
                    success: res =>{
                        this.isCheckGuide = !this.isCheckGuide;
                        this.getGuideListData();
                    }
                })
            }else{
                this.alert_warning(this.lang.select_guide);
            }
        }
    }
}
</script>

<style lang="less">
    .ivu-modal-content {
        border-radius: 3px;
        .ivu-icon-ios-close-empty:before {
            color: #555;
        }
        .ivu-modal-header-inner {
            font-weight: normal;
        }
        .ivu-modal-footer {
            padding-top: 0;
            border-top: none;
        }
    }
    .del-color{
        background: #E4E4E4;
    }
    .btn-handdle{
        float: right;
    }
    .guide-icon{
        margin-top: 15px;
        display: inline-block;
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 100%;
        font-size: 16px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        transition: all 0.2s ease-in-out;
        .gray-img{
            filter: grayscale(100%); 
        }
        img{
            width: 100%;
            height: 100%;
        }
        &.icon-add{
            border: 1px dashed #d0d0d0;
            &:before{
                color: #555;
            }
        }
    }
    .guide-name{
        text-align: center;
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
        font-size: 14px;
    }
    .guide-main {
        background-color: #F3F3F3;
        height: calc(100% - 1px);
    }
    .guide-manage{
        background-color: #fff;
        padding: 20px;
        width: 425px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .guide-list{
            li{
                position: relative;
                float: left;
                text-align: center;
                width: 94px;
                height: 117px;
                cursor: pointer;
                border-radius: 5px;
                overflow: hidden;
                .guide-handdle{
                    display: none;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    background: rgba(0,0,0,.9);
                    .icon{
                        font-size: 14px;
                        color: #fff;
                        margin: 0 10px;
                    }
                }
                &:hover{
                    box-shadow: 0 0 10px rgba(0,0,0,.1);
                    .guide-handdle{
                        display: block;
                    }
                    .guide-icon{
                        img{
                            filter: gray; /* IE6-9 */  
                            filter: grayscale(0); /* W3C */
                        }
                    }
                }
                &.active{
                    .guide-icon{
                        img{
                            filter: gray; /* IE6-9 */  
                            filter: grayscale(0); /* W3C */
                        }
                    }
                }
                &.add-btn:hover{
                    box-shadow: none;
                }
            }
        }
        .guide-content{
            margin-top: 6px;
            border-top: 1px solid #E4E4E4;
            .guide-content-list{
                padding: 20px 20px 10px 20px;
                transition: all 0.2s ease-in-out;
                .title{
                    font-size: 18px;
                    color: #111;
                }
                .con{
                    margin-top: 10px;
                    color: #888;
                    cite, em, var, address, dfn{
                        font-style: italic;
                    }
                    img,video{
                        max-width: 100% !important;
                    }
                }
                &:hover,&.active{
                    background-color: #E4E4E4;
                }
            }
        }
        .btn-wrap{
            margin-top: 10px;
            text-align: center;
            .btn-add{
                display: inline-block;
                width: 340px;
                height: 40px;
                background-color: #E14C46;
                color: #fff;
                font-size: 14px;
            }
        }
    }
    .guide-ueditor{
        padding: 40px;
        .guide-title{
            .title{
                height: 30px;
                color: #555;
            }
        }
        .ueditor{
            margin: 20px 0;
            min-height: 315px;
        }
        .edui-editor-wordcount {
            display: none;
        }
    }
    .change-guide{
        overflow: hidden;
        text-align: center;
        padding: 14px 0 0;
        li{
            display: inline-block;
            position: relative;
            width: 100px;
            height: 120px;
            cursor: pointer;
            overflow: hidden;
            border-radius: 5px;
            &:hover,&.active{
                box-shadow: 0 0 16px rgba(0, 0, 0, .14);
            }
            &.active{
                .selected{
                    position: absolute;
                    width: 10px;
                    height: 9px;
                    top: 0;
                    right: 0;
                    border: 1px solid #000;
                    width:0;
                    height:0;
                    border-width: 20px 0px 0px 20px;
                    border-style:solid;
                    border-color: #FA4F52 transparent transparent transparent;
                    .icon-selected-small{
                        position: absolute;
                        top: -19px;
                        right: -1px;
                    }
                }
            }
        }
    }
    .btn-wrap{
        .btn-error{
            background-color: #E14C46;
        }
        .btn-error[disabled]{
            background-color: #f7f7f7;
        }
    }
    .ivu-layout{
        background-color: #f3f3f3;
        height: 100%;
    }
    .edit-guide{
        .guide-icon{
            float: left;
            margin-top: 0;
            margin-right: 10px;
        }
        .icon-add{
            cursor: pointer;
        }
        .ivu-form .ivu-form-item-label{
            font-size: 14px;
            color: #888;
        }
        .ivu-form-item{
            &:first-child{
                .ivu-form-item-label{
                    margin-top: 15px;
                }
            }
        }
    }
</style>