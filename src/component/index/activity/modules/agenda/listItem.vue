<template>
    <div :class="[`list-item`]">
        <i-row class="title">
            <i-col span="24" class="name">
                <div class="txt-elips">
                    {{data.title}}
                </div>
                <div class="subtitle txt-elips-mul2">
                    {{data.subTitle}}
                </div>
            </i-col>
            <!-- <i-col span="6" offset="1" class="status">
                {{status.text}}
            </i-col> -->
        </i-row>

        <i-row class="content">
            <i-col span="4" class="name">
                {{lang.time_five}}：
            </i-col>
            <i-col span="18" class="value txt-data">
                {{`${data.startTime}-${data.endTime}`}}
            </i-col>
        </i-row>

        <!-- <i-row class="content" style="margin-top: 5px;">
            <i-col span="7" class="name">
                大会空间：
            </i-col>
            <i-col span="16" offset="1" class="value txt-elips">
                {{status.text}}
            </i-col>
        </i-row> -->

        <div class="cover">
            <i-button type="primary" long class="edit" @click="$emit('onEdit', data)">{{lang.edit}}</i-button>
            <i-button type="primary" long class="delete" @click="$emit('onDelete', data)">{{lang.delete}}</i-button>
        </div>
    </div>
</template>

<script>
import * as homeActions from 'app_src/actions/home';
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    // computed: {
    //     status(){
    //         const now = Date.now();
    //         if(this.data.startTime > now){
    //             return {
    //                 state: 0,
    //                 text: '未开始'
    //             };
    //         }else if(this.data.endTime > now){
    //             return {
    //                 state: 1,
    //                 text: '进行中'
    //             };
    //         }else{
    //             return {
    //                 state: 2,
    //                 text: '已结束'
    //             };
    //         }
    //     }
    // }
}
</script>
<style lang="less" scoped>
.list-item {   
    padding: 20px 24px; 
    // border-top-left-radius: 4px;
    // border-bottom-left-radius: 4px;
    position: relative;
    width: 100%;
    height: 100%;
    .cover {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        // left: -6px;
        left: 0;
        background:#ffffff;
        box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);
        border-radius: 4px;
    }

    &:hover {
        .cover {
            display: block;
        }
    }

    .title {
        .name{
            color: #111111;
            font-size: 15px;
            height: 40px;
            line-height: 20px;
        }
        .status {
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            background: #F3F3F3;
            border-radius:2px;
            text-align: center;
        }
    }
    &.status_0 {
        border-left: 6px solid #FFAB00;
        .title {
            .status {
                color: #FFAB00;
            }
        }
    }
    &.status_1 {
        border-left: 6px solid #2BA497;
        .title {
            .status {
                color: #2BA497;
            }
        }
    }
    &.status_2 {
         border-left: 6px solid #888888;
        .title {
            .status {
                color: #888888;
            }
        }
    }

    .txt-elips {
        margin-bottom: 8px;
        font-size: 15px;
        color: #111111;
    }

    .txt-data {
        margin-bottom: 4px;
        color: #111111;
    }

    .subtitle {
        color: #555555;
        font-size: 12px;
        max-height: 40px;
        line-height: 18px;
    }

    .content {
        margin-top: 50px;
        font-size: 12px;
        .name {
            color: #888888;
        }
        .value {
            color: #555555;
        }
    }

    .cover {
        padding: 35px 60px; 
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
            margin-top: 10px;
        }
    }
}
</style>
