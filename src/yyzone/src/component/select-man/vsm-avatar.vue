<template>
    <div class="vsm-avatar-wrapper" 
        :style="{
            width:size, 
            height:size,
            lineHeight:size,
            backgroundColor: backgroundColor
        }"> 
        <!-- 部门 -->
        <template v-if=" type=='dep' ">
            <span class="dep vsm-office" :style="{fontSize: parseInt(fontSize)+2+'px'}"></span>
        </template>
        <!-- 团队 -->
        <template v-if=" type=='team' ">
            <span class="team vsm-users" :style="{fontSize: parseInt(fontSize)+2+'px'}"></span>
        </template>
        <!-- 人员 -->
        <template v-if=" type=='man' ">
            <template v-if="avatar && !imgError">
                <div class="img-wrap">
                    <img 
                        class="avatar"
                        :src="avatar"
                        @error="imgErrorFun" />
                </div>
            </template>
            <template v-else>
                <span class="name" :style="{fontSize: fontSize}">{{ formatName }}</span>
            </template>
        </template>
    </div>
</template>
<script>

import md5 from '../../utils/md5.js';
const defineColors = [
    '#709fff', 
    '#1594ff', 
    '#ffa92f', 
    '#b587fa', 
    '#06cf86', 
    '#fa6771', 
    '#73d51c', 
    '#8991ff'
];
function encodeColor(str) {
    str = str || '';
    let char = md5(str).charAt(0).toLowerCase();
    let color = defineColors['abcdefghijklmnopqrstuvwxyz0123456789'.indexOf(char) % defineColors.length];
    return color;
};

export default{
    props: {
        avatar: {
            type: String,
            default:''
        },
        name: {
            type: String,
            default:''
        },
        size: {
            type: String,
            default: '28px'
        },
        nameLength: {
            type: Number,
            default: 2
        },
        fontSize: {
            type: String,
            default: "12px"
        },
        type: {
            type: String,
            default:'man'
        }
    },

    data() {
        return {
            imgError: false
        }
    },
    computed: {
        formatName: function() {
            return /[\u4e00-\u9fa5]/.test(this.name)
                  ? this.name.substr(-this.nameLength)
                  : this.name.substr(0, this.nameLength);
        },
        backgroundColor(){
            return encodeColor(this.name);
        }
    },
    watch:{
        avatar(){
            this.imgError=false;
        }
    },

    // 默认图当加载失败处理
    created(){
        if( this.avatar&&this.avatar.indexOf('default_avatar')>-1 ){
            this.imgError=true;
        }
    },

    methods: {
        imgErrorFun(e) {
            this.imgError = true;
        }
    }
};
</script>
<style lang="less" scoped>

