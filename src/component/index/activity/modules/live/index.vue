<template>
    <div class="live">
        <Row :class="['row-group']">
            <Col :class="['title']">{{lang.live_settings}}:</Col>
        </Row>
        <Row>
            <Col>
                <RadioGroup v-model="enable">
                    <Radio label="false">{{lang.live_broadcasting_not_needed}}</Radio>
                    <Radio label="true">{{lang.live_required}}</Radio>
                </RadioGroup>
            </Col>
        </Row>

        <template v-if="enable == 'true'">
            <fs-form :id="id" :activityId="activityId" v-model="data"></fs-form>
        </template>
        <template v-else-if="data && (`${data.enable}` != enable)">
            <i-button class="confirm" @click="onConfirm" style="margin-top: 20px;" :loading="confirming">{{lang.save}}</i-button>
        </template>
    </div>
</template>

<script>
import * as liveActions from 'app_src/actions/activity/live';
import * as userActions from 'app_src/actions/user';
import config from 'app_src/config/';

export default {
    props: ['id', 'activityId'],
    components: {
        'fs-form': ()=> import('./form')
    },
    data () {
        return {
            data: null,
            enable: 'false',
            confirming: false
        }
    },
    methods: {
        onConfirm(){
            this.confirming = true;
            liveActions.updateLive({
                activityId: this.activityId,
                enable: false,
                success: res=>{
                    this.data = res;
                    this.confirming = false;
                },
                error: res=>{
                    this.confirming = false;
                }
            });
        },
        getList(){
            liveActions.getList({
                activityId: this.activityId,
                success: res =>{
                    this.data = res || null;
                    this.enable = `${!!(this.data && this.data.enable)}`;
                }
            });
        }
    },
    created () {
        this.getList();
    }
}
</script>

<style lang="less">
.live {
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

    .ivu-radio-wrapper:not(:last-child) {
        margin-right: 30px;
    }
    .ivu-radio-wrapper {
        color: #555555;
    }
}
</style>


<style lang="less" scoped>
.live {
    padding: 40px;
    .ivu-row {
        .title {
            color: #888888;
            // width: 100px;
            line-height: 30px;
        }
        &:not(:first-child){
            margin-top: 10px;
        }
        &.row-group:not(:first-child) {
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
}
</style>
