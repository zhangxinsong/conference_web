<template>
    <div class="lottery-black-list">
        <div class="header clearfix">
            <span @click="$router.go(-1)"><i style="position: relative; left: -2px;" class="icon-back"></i>{{lang.set_blacklist}}</span>
            <Button type="primary" style="float:right;" @click="selectMember">
                {{lang.add_personnel}}
            </Button>
        </div>
        <div class="content">
            <fs-table :id="id" ref="tableList" :activityId="activityId" :prizeId="prizeId"></fs-table>
        </div>

        <fs-select-member ref="selectMember" @selectMemberCallback="onSelectMember"></fs-select-member>
    </div>
</template>

<script>
import config from 'app_src/config/';
import BaseList from 'app_src/utils/baseList';
import { getUserInfo } from 'app_src/actions/user';
import * as prizeActions from 'app_src/actions/activity/prize';

export default {
    props: ['id', 'activityId', 'prizeId'],
    components: {
        'fs-table': ()=> import('./table'),
    },
    methods: {
        selectMember(){
            this.$refs['selectMember'].open({
                title: this.lang.select_person,
                maxCount: 500,
                // 显示状态
                dep: false, 
                team: false, 
                man: true ,
                // 已选中项
                selected: {
                    dep: [],
                    team:[],
                    man: []
                }
            });
        },
        onSelectMember(res){
            if(res 
            && res.man 
            && res.man.length){
                const memberIds = res.man.map(item =>{
                    return item.id || item.memberId;
                });

                prizeActions.updateBlackList({
                    activityId: this.activityId,
                    prizeId: this.prizeId,
                    blacklist: memberIds,
                    success: res =>{
                        this.$refs['tableList'].getList();
                    },
                    error: res =>{
                    },
                });
            }
        }
    }
}
</script>

<style lang="less">
.lottery-black-list {
    .explain {
        padding: 0 30px 10px 25px !important;
    }
    .footer {
        margin-left: 28px !important;
        margin-right: 40px !important;
    }
    .ivu-table-wrapper {
        border: 0;
        .ivu-table {
            &-tip {
                table tbody tr td > span {
                    color: #bfbfbf;
                }
            }
        }
    }
}
</style>

<style lang="less" scoped>
.lottery-black-list {
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: relative;
    .header {
        height: 60px;
        line-height: 30px;
        box-shadow: 0px 1px 0px 0px rgba(245,245,245,1);
        border-bottom: 1px solid #D0D0D0;
        padding: 15px 40px 0 20px;
        :first-child{
            cursor: pointer;
        }
    }
    .content {
        position: absolute;
        top: 62px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
    }
}
</style>

