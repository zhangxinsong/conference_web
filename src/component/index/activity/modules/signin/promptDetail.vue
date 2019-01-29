<template>
     <div class="prompt-detail">

        <Row :class="['row-group']">
            <Col :class="['title']">{{lang.check_in_tips}}</Col>
        </Row>
        <Row>
            <Col span="5" :class="['left-item']">{{lang.greetings}}：</Col>
            <Col span="19" :class="['right-item']">
                {{value && value['notifySetting'] && value['notifySetting']['successMessageTemplate'] || lang.checked_in_successfully}}
            </Col>
        </Row>
        <Row>
            <Col span="5" :class="['left-item']">{{lang.failure_prompt}}：</Col>
            <Col span="19" :class="['right-item']">
                {{value && value['notifySetting'] && value['notifySetting']['failureMessageTemplate'] || lang.check_in_failed}}
            </Col>
        </Row>
        <Row>
            <Col span="5" :class="['left-item']">{{lang.duplicated_check_in_tips}}：</Col>
            <Col span="19" :class="['right-item']">
                {{value && value['notifySetting'] && value['notifySetting']['alreadySignInMessageTemplate'] || lang.checked_in_successfully}}
            </Col>
        </Row>


        <Row :class="['row-group']">
            <Col :class="['title']">{{lang.send_message_to_the_checked_in_users}}</Col>
        </Row>
        <Row>
            <template v-if="value && value['notifySetting'] && value['notifySetting']['enable'] === true">
                <Col span="5" :class="['left-item']">{{lang.message_info}}：</Col>
                <Col span="19" :class="['right-item']">
                    {{value && value['notifySetting'] && value['notifySetting']['appNotifyMessageTemplate'] || ''}}
                </Col>
            </template>
            <template v-else>
                 <Col span="5" style="text-align: left" :class="['left-item']">{{lang.do_not_push_app_message}}</Col>
            </template>
        </Row>
        <Row v-if="value && value['notifySetting'] && value['notifySetting']['enable'] === true">
            <Col span="5" :class="['left-item']">{{lang.message_link}}：</Col>
            <Col span="19" :class="['right-item']" style="word-break: break-all;">
                {{value && value['notifySetting'] && value['notifySetting']['messageUrl'] || ''}}
            </Col>
        </Row>

        <Row :class="['row-group']">
            <Col :class="['title']">{{lang.success_join_team}}</Col>
        </Row>
        <Row>
            <template v-if="value && value['joinGroupSetting'] && value['joinGroupSetting']['enable'] === true">
                <Col span="5" :class="['left-item']">{{lang.join_team}}：</Col>
                <Col span="19" :class="['right-item']">
                    {{group && group.name || ''}}
                </Col>
            </template>
            <template v-else>
                 <Col span="5" style="text-align: left" :class="['left-item']">{{lang.do_not_join_team}}</Col>
            </template>
        </Row>

        <i-button :class="['confirm','row-group']" @click="$emit('onChange')">{{lang.edit}}</i-button>
    </div>
</template>

<script>
import * as commonActions from 'app_src/actions/common';

export default {
    props: {
        value: {
            type: Object,
            default: {}
        },
        group: {
            type: Object,
            default: {}
        },
    },
}
</script>

<style lang="less" scoped>
.prompt-detail{
    width: 570px;
    .row-group:not(:first-child) {
        margin-top: 28px;
    } 
    .left-item {
        color: #888888;
        // width: 100px;
        text-align: right; 
    }
    
    .right-item {
        // padding-left: 10px;
        color: #555555;
    }

    .item {
        color: #888888;
    }
    
    .form {
        width: 570px;
    }
}
</style>
