<template>
    <div class="form">
        <slot name="title"></slot>
        <i-row v-for="(item,index) in form" :key="index" :class="['row']">
            <i-col span="3" class="label">
                <i v-if="item.required" class="required">*</i>
                <label :for="item.id" style="position: relative" :style="{'top': item.type === 'selectAdmin' ? '6px' : '0px'}">
                    {{item.label? `${item.label}:`:``}}
                </label>
            </i-col>
            <i-col :span="item.type === 'selectAdmin' || item.type === 'selectHelpSign' ? 20 : 10" style="padding-left: 12px;">
                <template v-if="item.type == 'text'">
                    <i-input v-model="item.value" :placeholder="item.placeholder" clearable :maxlength="item.maxlength" :class="[{'illegal': item.illegal === true}]" @focus.native="onInputFocus(item)" @blur.native="onInputBlur(item)"></i-input>
                </template>    
                <template v-else-if="item.type == 'select'">
                    <i-select v-model="item.value">
                        <i-option v-for="(option,inedx) in item.data" :value="option.value" :key="inedx">{{ option.label }}</i-option>
                    </i-select>
                </template>    
                <template v-else-if="item.type == 'dateRange'">
                    <DatePicker type="daterange" v-model="item.value" split-panels :placeholder="item.placeholder" :editable="item.editable" :format="item.format" :options="item.options" style="width: 100%"></DatePicker>
                </template>    
                <template v-else-if="item.type == 'textarea'">
                    <i-input type="textarea" v-model="item.value" :autosize="item.autosize" :placeholder="item.placeholder" :maxlength="item.maxlength" :class="[{'illegal': item.illegal === true}]" @focus="onInputFocus(item)" @blur="onInputBlur(item)"></i-input>
                </template>
                <!-- <template v-else-if="item.type == 'selectAdmin'">
                    <div class="add-admin" @click="showSelectModel(item)">
                        {{lang.select_person}}
                    </div>
                    <ul class="admin-list">
                        <li class="admin-list-info" :class="'list'+it.memberId" @mouseenter="showDelete(it)" @mouseleave="hideDelete(it)" v-for="it in selectedAdmin" :key="it.memberId">
                            <div class="admin-list-info-avatar" :style="{backgroundImage: 'url('+it.avatar+')'}"></div>
                            <div class="admin-list-info-detail">
                                <div class="admin-list-info-detail-name">{{it.userName}}</div>
                                <div class="admin-list-info-detail-deptname">{{it.deptName}}</div>
                            </div>
                            <span @click="deleteAdmin(item,it)" :class="'image'+it.memberId">
                            </span>
                        </li>
                    </ul>
                </template>
                <template v-else-if="item.type == 'selectHelpSign'">
                    <div class="add-admin" @click="showSelectSignModel(item)">
                        {{lang.select_person}}
                    </div>
                    <ul class="admin-list">
                        <li class="admin-list-info" :class="'listone'+it.memberId" @mouseenter="showSignDelete(it)" @mouseleave="hideSignDelete(it)" v-for="it in selectedHelpSign" :key="it.memberId">
                            <div class="admin-list-info-avatar" :style="{backgroundImage: 'url('+it.avatar+')'}"></div>
                            <div class="admin-list-info-detail">
                                <div class="admin-list-info-detail-name">{{it.userName}}</div>
                                <div class="admin-list-info-detail-deptname">{{it.deptName}}</div>
                            </div>
                            <span @click="deleteHelpSign(item,it)" :class="'imageone'+it.memberId">
                            </span>
                        </li>
                    </ul>
                </template>     -->
                <template v-else-if="item.type == 'upload'">
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
                        :action="item.getAction()"
                        style="width: 270px;">
                        <fs-image :src="item.file.path" v-if="item.file && item.file.path" :scale="item.scale"></fs-image>
                        <!-- <img :src="item.file.path" v-if="item.file && item.file.path" class="cover"/> -->
                        <div v-else class="drag-wrap">
                            <i class="icon-add"></i>
                        </div>
                    </Upload>

                    <span class="tip">{{lang.note}}</span>
                </template>  
 
            </i-col>
        </i-row>  

        <i-row>
            <i-col span="19" offset="3" style="padding-left: 12px;margin-top: 10px;">
                <i-button :class="['confirm',{'disable': !pass}]" @click="onConfirm" :loading="confirming">{{lang.save}}</i-button>
                <i-button class="cancel" @click="onCancel" style="margin-left: 5px;">{{lang.cancel}}</i-button>
            </i-col>
        </i-row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import * as homeActions from 'app_src/actions/home';
import form_mixin from 'app_src/mixin/form';

export default {
    mixins: [form_mixin],
    props: {
        id: String,
    },
    data () {
        return {
            confirming: false,
            // qzId: '',
            // selectedAdmin: [],
            // selectedPart: [],
            // selectedPerson: [],
            // showAdmin: [],
            // selectedHelpSign: [],
            // showhelpSign: []
            // isDelete: false            
        }
    },
    methods: {
        // deleteAdmin(it,obj){
        //     this.selectedAdmin = this.selectedAdmin.filter((item)=>{
        //         this.showAdmin.push(item.memberId)
        //         if(item.memberId !== obj.memberId) {
        //             return true
        //         }
        //     })
        //     this.showAdmin = []

        //     this.selectedAdmin.forEach((item)=>{
        //         this.showAdmin.push(item.memberId)
        //     })

        //     it['value'] = this.showAdmin

        // },
        // showDelete(it){
        //     let dataClass = 'image' + it.memberId;
        //     let dom = document.getElementsByClassName(dataClass)[0];

        //     let listClass = 'list' + it.memberId;
        //     let list = document.getElementsByClassName(listClass)[0];

        //     dom.style.display = 'block';
        //     list.style.boxShadow = '0px 2px 10px 0px rgba(0, 0, 0, .3)';
        // },
        // hideDelete(it){
        //     let dataClass = 'image' + it.memberId;
        //     let dom = document.getElementsByClassName(dataClass)[0];

        //     let listClass = 'list' + it.memberId;
        //     let list = document.getElementsByClassName(listClass)[0];
            
        //     dom.style.display = 'none';
        //     list.style.boxShadow = '';
        // },
        // showSelectModel(val){
        //     let that = this;
        //     this.$seletMan.open({
        //         callback( res ){
        //             that.showAdmin = [];
        //             that.selectedPart = JSON.parse(res)['depMan']['selected'];
        //             that.selectedPerson = JSON.parse(res)['man']['selected'];
        //             that.selectedAdmin = that.selectedPart.concat(that.selectedPerson);
        //             that.selectedAdmin.forEach((item)=>{
        //                 that.showAdmin.push(item.memberId)
        //             })
        //             val['value'] = that.showAdmin;
 
        //         },
        //         "qzId":this.qzId,
        //         "memberId":231546,//获取和自己相关的内部群 需要传memberId ;
        //         "title": "选择管理员",
        //         "depMan": {
        //             "show": 1,
        //             "limit": 10000,
        //             "selected": that.selectedAdmin
        //         },
        //         "dep": {
        //             "show": false,
        //             "limit": 10000,
        //             "selected": []
        //         },
        //         "team": {
        //             "show": false,
        //             "limit": 10000,
        //             "selected": []
        //         },
        //         "man": {
        //             "show": 1,
        //             "limit": 10000,
        //             "selected": []
        //         }
        //     });
        // },
        // deleteHelpSign(it,obj){
        //     this.selectedHelpSign = this.selectedHelpSign.filter((item)=>{
        //         this.showhelpSign.push(item.memberId)
        //         if(item.memberId !== obj.memberId) {
        //             return true
        //         }
        //     })
        //     this.showhelpSign = []

        //     this.selectedHelpSign.forEach((item)=>{
        //         this.showhelpSign.push(item.memberId)
        //     })

        //     it['value'] = this.showhelpSign

        // },
        // showSignDelete(it){
        //     let dataClass = 'imageone' + it.memberId;
        //     let dom = document.getElementsByClassName(dataClass)[0];

        //     let listClass = 'listone' + it.memberId;
        //     let list = document.getElementsByClassName(listClass)[0];

        //     dom.style.display = 'block';
        //     list.style.boxShadow = '0px 2px 10px 0px rgba(0, 0, 0, .3)';
        // },
        // hideSignDelete(it){
        //     let dataClass = 'imageone' + it.memberId;
        //     let dom = document.getElementsByClassName(dataClass)[0];

        //     let listClass = 'listone' + it.memberId;
        //     let list = document.getElementsByClassName(listClass)[0];
            
        //     dom.style.display = 'none';
        //     list.style.boxShadow = '';
        // },
        // showSelectSignModel(val){
        //     let that = this;
        //     this.$seletMan.open({
        //         callback( res ){
        //             that.showAdmin = [];
        //             that.selectedPart = JSON.parse(res)['depMan']['selected'];
        //             that.selectedPerson = JSON.parse(res)['man']['selected'];
        //             that.selectedHelpSign = that.selectedPart.concat(that.selectedPerson);
        //             that.selectedHelpSign.forEach((item)=>{
        //                 that.showhelpSign.push(item.memberId)
        //             })
        //             val['value'] = that.showhelpSign;
 
        //         },
        //         "qzId":this.qzId,
        //         "memberId":231546,//获取和自己相关的内部群 需要传memberId ;
        //         "title": "选择管理员",
        //         "depMan": {
        //             "show": 1,
        //             "limit": 10000,
        //             "selected": that.selectedHelpSign
        //         },
        //         "dep": {
        //             "show": false,
        //             "limit": 10000,
        //             "selected": []
        //         },
        //         "team": {
        //             "show": false,
        //             "limit": 10000,
        //             "selected": []
        //         },
        //         "man": {
        //             "show": 1,
        //             "limit": 10000,
        //             "selected": []
        //         }
        //     });
        // },
        onInputFocus(item){
            item.illegal = null;
        },
        onInputBlur(item){
            item.illegal = !item.value;
        },
        onConfirm(){
            if(this.pass){
                this.confirming = true;
                console.log(this.formData);
                console.log(this.$store.state)
                homeActions.createConference({
                    memberId: this.$store.state.memberId,
                    conferenceId: this.id,
                    ...this.formData,
                    success: res =>{
                        this.confirming = false;
                        this.$emit('onConfirm', this.data);
                    },
                    error: res =>{
                        this.confirming = false;
                        this.$emit('onConfirm', this.data, res);
                    }
                });
            }
        },
        onCancel(){
            this.$emit('onCancel');
        },
        initForm(res){
            let _this = this;

            this.cache.assign('name',{
                id: 'name',
                label: this.lang.conference,
                type: 'text',
                required: true,
                placeholder: this.lang.please_enter_conference_name,
                value: res && res['name'] || '',
                maxlength: 50
            });

            this.cache.assign('dateRange',{
                startId: 'startTime',
                endId: 'endTime',

                label: this.lang.conference_time,
                type: 'dateRange',
                placeholder: this.lang.please_select_start_time,
                editable: false,
                required: true,
                value: [
                    res && res['startTime'] && new Date(res && res['startTime']) || '',
                    res && res['endTime'] && new Date(res && res['endTime']) || '',
                ],
                format: 'yyyy/MM/dd',
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

            this.cache.assign('topic',{
                id: 'topic',
                label: this.lang.conference_subject,
                type: 'textarea',
                value: res && res['topic'] || '',
                placeholder: this.lang.please_enter_conference_subject,
                required: true,
                maxlength: 500,
                autosize: {
                    minRows: 3,
                    maxRows: 5
                }
            });

            this.cache.assign('image',{
                id: 'image',
                label: this.lang.conference_cover_picture,
                type: 'upload',
                file: {
                    path: res && res['image'] || ''
                },
                required: false,
                scale: 2,
                value: res && res['image'] || '',
                options: {
                    'type': 'drag', // select 
                    'with-credentials': false,
                    'max-size': 1024 * 10, //kb
                    'format': ['jpg','jpeg','png','gif','bmp'],                    
                    'accept': 'image/gif,image/jpeg,image/png,image/jpg,image/bmp', 
                },
                getAction(){
                    return `${config.apiHost}rest/v1/conference/file/upload`;
                },
                onSuccess(res){
                    Object.assign(this.file || {}, {
                        path: res && res.fileUrl
                    });
                    this.value = res && res.fileUrl || '';
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
            
            // this.cache.assign('adminMemberIds',{
            //     id: 'adminMemberIds',
            //     label: this.lang.admin,
            //     type: 'selectAdmin',
            //     value: this.showAdmin || []
            // });

            // this.cache.assign('helpSignInRoles',{
            //     id: 'helpSignInRoles',
            //     label: this.lang.mainadmin,
            //     type: 'selectHelpSign',
            //     value: this.showhelpSign || []
            // });
        },
        loadData(callback){
            homeActions.getConferenceInfo({
                conferenceId: this.id,
                success: res =>{
                    // if(res.adminMembers.length) {
                    //     this.selectedAdmin = res.adminMembers;
                    //     this.selectedAdmin.forEach((item)=>{
                    //         item['userName'] = item['name']
                    //         this.showAdmin.push(item.memberId)
                    //     })
                    // }
                    // if('helpSignInMembers' in res){
                    //     this.selectedHelpSign = res.helpSignInMembers;
                    //     this.selectedHelpSign.forEach((item)=>{
                    //         item['userName'] = item['name']
                    //         this.showhelpSign.push(item.memberId)
                    //     })
                    // }
                    callback && callback(res);
                }
            });
        }  
    },
    mounted() {
    },
}
</script>

<style scoped lang="less">
   .form {
       width: 920px !important;
       padding: 30px 20px !important;

        .label {
            font-size:14px;
            color:#888888;
            line-height: 30px;
            text-align: right;
        }

        .row {
            padding: 10px 0;
        }

        img.cover {
            display: block;
            width: 270px;
            border-radius: 4px;
        } 

        input {
            &.illegal {
                border-color: #E14C46;
            }
        }

        .tip {
            font-size: 12px;
            color: #888888;
            padding-top: 8px;
            display: block;
        }

        .drag-wrap {
            height: 135px;
            line-height: 135px;
            text-align: center;
            i {
                font-size: 16px;
                color: #555555;
            }
        }

        .admin-list {
            overflow: hidden;
            padding-left: 5px;
            margin-top: 10px;
            &-info {
                float: left;
                position: relative;
                margin-right: 10px;
                margin-top: 5px;
                margin-bottom: 5px;
                padding: 7px 16px 7px 8px;
                max-width: 190px;
                height: 52px;
                border-radius: 3px;
                // box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);

                &-avatar {
                    position: relative;
                    float: left;
                    margin-right: 12px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-size: cover;
                }

                &-detail {
                    float: left;
                    max-width: 118px;

                    &-name {
                        font-size: 14px;
                        color: #555555;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }

                    &-deptname {
                        font-size: 12px;
                        color: #888888;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                }

                span {
                    display: none;
                    width: 14px;
                    height: 14px;
                    background: url('../../../assets/images/conference_list/delete.png') no-repeat;
                    background-size: cover;
                    position: absolute;
                    right: -7px;
                    top: 50%;
                    margin-top: -7px;
                    cursor: pointer;
                }
            }
        }

        .add-admin {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
            position: relative;
            top: 4px;
            width: 80px;
            height: 30px;
            border-radius: 3px;
            background-size: cover;
            background: #E4E4E4;
            cursor: pointer;
        }
    }
</style>



