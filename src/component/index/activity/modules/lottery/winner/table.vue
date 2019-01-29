<template>
    <div class="lottery-prize-winner-table">
         <Table 
            :columns="header" 
            :data="data"
            :loading="loading"
            :border="false"
            :disabled-hover="true"
            ></Table>

        <Row :class="['footer']">
            <Col span="4" :class="['tip']">
                {{lang.include}}{{total}}{{lang.record}}
            </Col>
            <Col span="20">
                <Page :current="page" :total="total" :page-size="size" show-elevator style="float: right" @on-change="onPageChange"></Page>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from 'app_src/config/';
import BaseList from 'app_src/utils/baseList';
import { getUserInfo } from 'app_src/actions/user';
import * as prizeActions from 'app_src/actions/activity/prize';

export default {
    props: ['id','activityId','prizeId'],
    components: {
    },
    data(){
        return {
            size: 10,
            page: 1,
            total: 0,

            loading: false,
            data: [],
        }
    },
    computed: {
        start(){
            return this.size * Math.max(this.page - 1, 0);
        },
        header(){
            const _this = this;
            const header = [];
            header.push({
                title: this.lang.name,
                key: 'name',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['user'][column.key]);
                }
            },
            {
                title: this.lang.mobile,
                key: 'mobile',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['user'][column.key]);
                }
            },
            {
                title: this.lang.email,
                key: 'workEmail',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['user'][column.key]);
                }
            },
            {
                title: this.lang.company,
                key: 'orgName',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['user'][column.key]);
                }
            },
            {
                title: this.lang.position,
                key: 'duty',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['user'][column.key]);
                }
            },
            {
                title: this.lang.prize,
                key: 'prize',
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['prize'][column.key]);
                }
            });
            return header;
        }  
    },
    methods: {
        onPageChange(page){
            this.page = page;
            this.getList();
        },
        getList(){
            this.loading = true;
            prizeActions.getWinnerList({
                activityId: this.activityId,
                prizeId: this.prizeId,
                size: this.size,
                start: this.start,
                success: res =>{
                    this.loading = false;
                    if(res){
                        this.total = res.total || 0;
                        this.data = res.data || [];
                    }
                },
                error: res =>{
                    this.loading = false;
                }
            });
        },
    },
    created () {
        this.getList();
    }
}
</script>

<style lang="less">
.lottery-prize-winner-table {
    .ivu-table {
        font-size: 14px;
        .ivu-table-cell {
            padding-left: 27px;
            padding-right: 0;
        }

        .rich-text {
            img {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .ivu-table,
    .ivu-page {
        color: #555555;
    }
    .ivu-table-wrapper,
    .ivu-table th {
        border: none;
    }
    .ivu-table:after {
        width: 0;
    }

    .opeater {
        > span {
            color: #007ACE;
            margin-right: 20px;
            cursor: pointer;
        }
    }
}
</style>

<style lang="less" scoped>
.lottery-prize-winner-table {
    padding: 20px 10px 0;
    .footer {
        margin: 20px;
    }

    .explain {
        font-size: 14px;
        padding: 0 30px 10px;
        color: #888888;
    }
}
</style>
