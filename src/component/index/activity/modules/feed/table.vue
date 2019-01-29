<template>
    <div class="feed-table">
        <fs-search-form @onConfirm="onSearch" @onSearchClear="onSearch" class="top"></fs-search-form>

        <Row :class="['header']">
            <Col span="8">
                <RadioGroup v-model="status" type="button" @on-change="onTabChange">
                    <Radio label="PENDING">{{lang.unreviewed}}</Radio>
                    <Radio label="PASS">{{lang.agreed}}</Radio>
                    <Radio label="REJECT">{{lang.rejected}}</Radio>
                </RadioGroup>
            </Col>
            <Col span="8" offset="8">
                <div style="float:right;" v-if="status == 'PENDING'">
                    <Button type="primary" :class="['cancel',{disable: !selection || !selection.length}]" style="margin-right: 10px;" @click="batchAuditing(null, 'REJECT')">{{lang.batch_reject}}</Button>
                    <Button type="primary" :class="['confirm',{disable: !selection || !selection.length}]" @click="batchAuditing(null, 'PASS')">{{lang.batch_agree}}</Button>
                </div>
            </Col>
        </Row>

        <Table 
            :columns="header" 
            :data="data"
            :loading="loading"
            :border="false"
            :disabled-hover="true"
            @on-select="onSelect"
            @on-selection-change="onSelectionChange"
            @on-select-all="onSelectionAll"></Table>

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
import lang from 'app_src/languages/';
import { getUserInfo } from 'app_src/actions/user';
import * as feedActions from 'app_src/actions/activity/feed';

export default {
    props: ['id', 'activityId'],
    components: {
        'fs-search-form': () => import('./searchForm')
    },
    data(){
        return {
            size: 10,
            page: 1,
            total: 0,

            status: 'PASS',
            loading: false,
            data: [],
            selection: [],
            searchData: null
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
                title: this.lang.content_of_the_speech,
                key: 'content',
                render(h, context) {
                    const {row, index, column} = context;
                    const children = [
                        h('div', {
                            class: 'rich-text',
                            domProps: {
                                innerHTML: row['feed'][column.key]
                            }
                        }),
                    ];
                    if(row.feed.hasFile){
                        if(row.feed.files.image 
                        && row.feed.files.image.length){
                            const lis = [];
                            row.feed.files.image.forEach(image =>{
                                lis.push(h('li',[
                                    h('img',{
                                        attrs: {
                                            src: image.filePath
                                        }
                                    })
                                ]));
                            });
                            const imageList = h('ul',{
                                class: ['imageList', 'clearfix']
                            }, lis);
                            children.push(imageList);
                        }
                    }
                    return h('div',{
                        class: 'rich-content',
                        style: {
                            'padding': '20px 0'
                        }
                    }, children);
                }
            },
            {
                title: this.lang.published_by,
                key: 'nickname',
                maxWidth: 160,
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', row['feed']['memberInfo'][column.key]);
                }
            },
            {
                title: this.lang.time_five,
                key: 'created',
                maxWidth: 230,
                render(h, context) {
                    const {row, index, column} = context;
                    return h('span', new Date(row['feed'][column.key]).format('yyyy-MM-dd hh:mm:ss'));
                }
            });
            if(this.status == 'PENDING'){
                header.unshift({
                    type: 'selection',
                    width: 60,
                    align: 'center',
                });
                header.push({
                    title: this.lang.operation,
                    key: 'mobile',
                    maxWidth: 160,
                    render(h, context) {
                        const {row, index, column} = context;
                        return h('div', {
                                    class: 'opeater'
                                },[
                                    h('span', {
                                        on: {
                                            click: () => {
                                                _this.batchAuditing(row['feed']['id'], 'PASS');
                                            }
                                        }
                                    }, _this.lang.agree),
                                    h('span', {
                                        on: {
                                            click: () => {
                                                _this.batchAuditing(row['feed']['id'], 'REJECT');
                                            }
                                        }
                            }, _this.lang.reject)]);
                    }
                });
            }
            return header;
        }  
    },
    methods: {
        onSearch(data){
            this.searchData = data;
            this.getList(data);
        },
        batchAuditing(feedIds, status){
            feedIds = feedIds || this.selection.map(item =>{
                return item['feed']['id'];
            });
            if(typeof feedIds == 'string' 
            || (Array.isArray(feedIds) && feedIds.length)){
                feedActions.batchAuditing({
                    activityId: this.activityId,
                    feedIds: typeof feedIds == 'string'? [feedIds]: feedIds,
                    status: status || this.status,
                    success: res =>{
                        this.getList();
                        this.alert_success(this.lang.operation_succeeded);
                    },
                    error: res =>{
                        this.alert_error(this.lang.operation_failed);
                    }
                });
            }
        },
        onSelect(selection, row){
            // console.log('onSelect:',selection, row);
        },
        onSelectionChange(selection){
            console.log('onSelectionChange:',selection);
            this.selection = selection;
        },
        onSelectionAll(selection){
            // console.log('onSelectionAll:',selection);
        },
        onTabChange(){
            this.page = 1;
            this.getList();
        },
        onPageChange(page){
            this.page = page;
            this.getList();
        },
        getList(){
            this.loading = true;
            feedActions.getList({
                activityId: this.activityId,
                size: this.size,
                start: this.start,
                status: this.status, //pending, PASS, REJECT 
                ...this.searchData,
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
.feed-table {
    .ivu-table {
        font-size: 14px;
        .ivu-table-cell {
            padding-left: 38px;
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

    ul.imageList {
        li {
            float: left;
            width: 40px;
            height: 40px;
            margin: 10px 10px 0 0;

            img {
                width: 100%;
            }
        }
    }
}
</style>


<style lang="less" scoped>
.feed-table {
    .top {
        padding: 0 40px;
    }

    .header {
        padding: 20px 40px 14px 40px;
    }

    .footer {
        margin: 20px 40px;
        .tip {
            font-size: 12px;
            color: #888888;
        }
    }
}
</style>
