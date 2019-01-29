<template>
    <div :class="[`list-item`, `status_${status.state}`]">
        <i-row class="title">
            <i-col span="17" class="name txt-elips-mul2">
                {{data.name}}
            </i-col>
            <i-col span="6" offset="1" class="status">
                {{status.text}}
            </i-col>
        </i-row>

        <i-row class="content">
            <i-col span="7" class="name">
                {{lang.conference_time}}：
            </i-col>
            <i-col span="17" class="value txt-elips">
                {{dateFormat(data.startTime, 'yyyy.MM.dd')}}-{{dateFormat(data.endTime, 'yyyy.MM.dd')}}
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
            <i-button type="primary" long class="edit" @click="onEdit">{{lang.edit}}</i-button>
            <i-button type="primary" long class="delete" @click="onDelete">{{lang.delete}}</i-button>
        </div>
    </div>
</template>

<script>
import * as homeActions from 'app_src/actions/home';
export default {
    data(){
        return {
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
                name: 'index',
                params:{
                    id: this.data.conferenceId
                }
            });
        },
        onDelete(){
            this.$confirm({
                title: this.lang.confirm_to_delete,
                content: this.lang.confirm_to_delete_the_conference,
                onConfirm: () =>{
                    homeActions.deleteConference({
                        conferenceId: this.data.conferenceId,
                        memberId: this.$store.state.memberId,
                        success: res =>{
                            this.$emit('onDelete');
                            this.alert_success(this.lang.deleted_successfully);
                        },
                        error: res =>{
                            this.alert_error(this.lang.failed_to_delete);
                        },
                    });
                }
            });
        }  
    },
    computed: {
        status(){
            const now = Date.now();
            if(this.data.startTime > now){
                return {
                    state: 0,
                    text: this.lang.not_started
                };
            }else if(this.data.endTime > now){
                return {
                    state: 1,
                    text: this.lang.in_progress
                };
            }else{
                return {
                    state: 2,
                    text: this.lang.ended
                };
            }
        }
    }
}
</script>
<style lang="less" scoped>
.list-item {   
    padding: 20px 14px 20px 24px;
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

    .content {
        margin-top: 40px;
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
