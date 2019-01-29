<template>
    <div class="lottery">
        <div class="top">
            <fs-form v-model="data" :id="id" :activityId="activityId"></fs-form>
        </div>

        <div class="septer"></div>

        <div class="middle">
            <fs-table :activityId="activityId" :id="id"></fs-table>
        </div>

        <fs-projection-setting v-model="projection_setting" :activityId="activityId" :id="id" :lottery="data"></fs-projection-setting>
    </div>
</template>

<script>
import * as lotteryActions from 'app_src/actions/activity/lottery';
import * as userActions from 'app_src/actions/user';
import config from 'app_src/config/';

export default {
    props: ['id', 'activityId'],
    components: {
        'fs-form': ()=> import('./form'),
        'fs-table': ()=> import('./table'),
        'fs-projection-setting': ()=> import('./projectionSetting'),
    },
    data () {
        return {
            projection_setting: false,
            data: null,
        }
    },
    methods: {
        goToIndex(){
            this.$router.push({
                path: `${this.$route.fullPath.replace(/(\/activity\/[^\\\/]+)(\/[^\\\/]+)*$/, `$1/sigin`)}`
            });
        },
        goToStatistics(){
            this.$router.push({
                path: `${this.$route.fullPath.replace(/(\/activity\/[^\\\/]+)(\/[^\\\/]+)*$/, `$1/statistics`)}`
            });
        },
        getList(){
            console.log('lotteryActions',lotteryActions);
            lotteryActions.getList({
                activityId: this.activityId,
                success: res =>{
                    this.data = res || null;
                }
            });
        }
    },
    created () {
        this.getList();

        this.$eventbus.$off('tab_lottery_projection').$on('tab_lottery_projection', ()=>{
            this.projection_setting = !this.projection_setting;
        });
    }
}
</script>

<style lang="less">
.lottery {
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
}
</style>


<style lang="less" scoped>
.lottery {
    .row-group:not(:first-child) {
        margin-top: 20px;
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
            // width: 100px;
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
        padding: 10px;

        .title {

        }

        .left-item {
            color: #888888;
            // width: 100px;
            text-align: right; 
            padding-right: 10px;
        }

        .right-item {
            color: #555555;
        }

        .form {
            width: 570px;
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

    .bottom {
        padding: 30px 40px;
    }
}
</style>
