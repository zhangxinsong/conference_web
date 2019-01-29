<template>
    <div class="lottery-prize-winner">
        <div class="header clearfix">
            <span @click="$router.go(-1)"><i style="position: relative; left: -2px;" class="icon-back"></i>{{lang.winner_list}}</span>
        </div>
        <div class="content">
            <fs-table :id="id" :activityId="activityId" :prizeId="prizeId"></fs-table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id', 'activityId', 'prizeId'],
    components: {
        'fs-table': ()=> import('./table')
    }
}
</script>

<style lang="less">
.lottery-prize-winner {
    .footer {
        margin-left: 22px !important;
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
.lottery-prize-winner {
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

