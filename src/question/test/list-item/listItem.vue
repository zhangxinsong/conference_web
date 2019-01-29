<template>
    <div :class="[`list-item`, `status_${status.state}`]">
        <div class="content">
            <div>
                <p>{{data.name}}</p>
                <span class="status">{{this.status.text}}</span>
            </div>
            <div class="time">
                <span>时间：{{dateFormat(data.startTime, 'yyyy.MM.dd')}}-{{dateFormat(data.endTime, 'yyyy.MM.dd')}}</span>
                <input type="text" id="copyObj" :value="url+'app/index.html#/question/start?examId='+data.id" style="opacity:0"/>
            </div>
        </div>
        <div class="cover">
            <i-button type="primary" long class="edit" @click="onEdit">编辑</i-button>
            <i-button type="primary" long class="delete" @click="onDelete">删除</i-button>
            <i-button type="primary" long class="delete" @click="onCopy">考试地址</i-button>
        </div>
    </div>
</template>

<script>
import config from '../../../config/index.js'
export default {
    data(){
        return {
            url: config.apiHost,
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        onEdit(){
            this.$router.push({
                path: `/question/setTest?id=${this.data.id}`,
            });
        },
        onDelete(){
            this.$emit('onDelete',this.data);
        },
        onCopy(){
            let url = document.querySelector('#copyObj');
            url.select(); // 选择对象
            document.execCommand("Copy");
            this.alert_success("复制成功");
        }
    },
    computed: {
        status(){
            const now = Date.now();
            if(this.data.startTime > now){
                return {
                    state: 0,
                    text: "未开始"
                };
            }else if(this.data.endTime > now){
                return {
                    state: 1,
                    text: "进行中"
                };
            }else{
                return {
                    state: 2,
                    text: "已结束"
                };
            }
        }
    }
}
</script>
<style lang="less" scoped>
.list-item {   
    padding: 15px 15px 20px 18px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    position: relative;
    width: 100%;
    height: 100%;
    .cover {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: -6px;
        background:#ffffff;
        box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);
        border-radius: 4px;
        padding: 8px 60px;
    }
    .content{
        width: 100%;
        height: 100%;
        p{
            display: inline;
            font-size: 14px;
        }
        .status {
            font-size: 12px;
            height: 20px;
            padding: 2px 5px;
            background: #F3F3F3;
            border-radius:2px;
            text-align: center;
            float: right;
        }
        .time{
            margin-top: 50px;
        }
    }
    &:hover {
        .cover {
            display: block;
        }
    }
    &.status_0 {
        border-left: 6px solid #FFAB00;
        .content {
            .status {
                color: #FFAB00;
            }
        }
    }
    &.status_1 {
        border-left: 6px solid #2BA497;
        .content {
            .status {
                color: #2BA497;
            }
        }
    }
    &.status_2 {
         border-left: 6px solid #888888;
        .content {
            .status {
                color: #888888;
            }
        }
    }
    button {
        height:30px;
        text-align: center;
        color:#E14C46;
        border: 1px solid #E14C46;
        background-color: #ffffff;
        border-radius: 3px;
        &:hover {
            background-color: #E14C46;
            color: #ffffff;
        }
        &.edit {
        }
        &.delete {
            margin-top: 8px;
        }
    }
}
</style>
