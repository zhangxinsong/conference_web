<template>
    <Modal
        class="qrcode-global"
        v-model="isShow" 
        width="300"
        :draggable="true" 
        :title="title"
        >
        <div class="content">
            <div class="qr-code">
                <!-- <fs-qr-code 
                    :text="path" 
                    :size="size"
                    :margin="margin"
                    :callback="callback"/> -->
                <img :src="url" v-if="url" :width="size"/>    
                <a class="qrcode-cover" :href="url" :download="getName()">
                    <i class="icon-download"></i>
                    <p>{{lang.download_qr_code}}</p>
                </a>
            </div>
                <!-- :colorDark="colorDark"
                :colorLight="colorLight"
                :bgSrc="bgSrc"
                :backgroundDimming="backgroundDimming"
                :logoSrc="logoSrc"
                :logoScale="logoScale"
                :logoMargin="logoMargin"
                :logoCornerRadius="logoCornerRadius"
                :whiteMargin="whiteMargin"
                :dotScale="dotScale"
                :autoColor="autoColor"
                :binarize="binarize"
                :binarizeThreshold="binarizeThreshold"
                :bindElement="bindElement" -->

            <div class="tip">
                {{describe}}
            </div>    
        </div>
        <div slot="footer" class="footer">
            <Button type="primary" @click="close">{{lang.close}}</Button>
        </div>
    </Modal>
</template>

<script>
import * as userActions from 'app_src/actions/user';
import config from 'app_src/config/';
import QRCode from 'qrcode';

export default {
    props: {
        value: Boolean,
        text: {
            type: String,
            required: false,
            dafault: ''
        },
        title: {
            type: String,
            default: '预览'
        },
        describe: {
            type: String,
            default: '请用友空间扫一扫二维码进行预览'
        }
    },
    computed: {
        isShow:{
            get(){
                return !!this.value;
            },
            set(value){
                this.$emit('input', !!value);
            }
        }
    },
    watch: {
        value(value){
            if(value){
                this.checkText();
            }
        }  
    },
    data(){
        return {
            url: '',
            path: '',
            size: 238,
        };
    },
    methods: {
        getName(){
            return `${Date.now()}.png`;
        },
        close(){
            this.$emit('input', false);
        },
        callback(url, id){
            this.href = url;
        },
        getQrCode(){
            QRCode.toDataURL(this.path, { 
                errorCorrectionLevel: 'Q', 
                type: 'image/png',
                margin: 0,
            }, (err, url)=> {
                if(!err){
                    this.url = url;
                }else{
                    this.url = '';
                }
            });  
        },
        checkText(){
            const info = userActions.getUserInfo();
            this.path = '';
            if(/^https?\:\/\//i.test(this.text)){
                this.path = this.text || '';

                this.getQrCode();
            }else{
                if(this.text){
                    if(/^https?\:\/\//i.test(this.text)){
                        this.path = this.text;
                    }else{
                        this.path = `${config.apiHost}${this.text}`;
                    }
                    this.path = `${this.path}${/\?/.test(this.text)?'&':'?'}upesntype=urlWithUserCode`;
                    this.getQrCode();
                }else{
                    this.$emit('getQrCode', text =>{
                        if(text && typeof text == 'string'){
                            if(/^https?\:\/\//i.test(text)){
                                this.path = text || '';
                            }else{
                                this.path = `${config.apiHost}${text}`;
                            }
                            this.path = `${this.path}${/\?/.test(text)?'&':'?'}upesntype=urlWithUserCode`;
                            this.getQrCode();
                        }
                    });
                }
            }
        }
    }
}
</script>

<style lang="less">
.qrcode-global {
    .content {
        text-align: center;
        .qr-code {
            display: inline-block;
            position: relative;
            img {
                border: 1px solid #d0d0d0;
                padding: 5px;
            }
    
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
                right: 0;
                background: rgba(255,255,255,.9);
                padding-top: 100px;
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
    
        .tip {
            color: #555555;
            text-align: center;
            margin-top: 10px;
            display: block;
            font-size: 14px
        }
    }
    .ivu-modal-footer {
        border: none;
    } 
}
</style>
