<template>
    <div class="guest-index">
         <Table 
            :columns="header" 
            :data="data.getAll()"
            :loading="loading"
            :border="false"
            :disabled-hover="true"
            @on-selection-change="onSelectionChange"></Table>

        <Row :class="['footer']">
            <Col span="4" :class="['tip']">
                {{lang.include}}{{total}}{{lang.record}}
            </Col>
            <Col span="20">
                <Page :current="page" :total="total" :page-size="size" show-elevator style="float: right" @on-change="onPageChange"></Page>
            </Col>
        </Row>



        <fs-add-form v-model="isShowAddModal" :id="id" @onConfirm="onAdd"></fs-add-form>
    </div>
</template>

<script>
import config from 'app_src/config/';
import BaseList from 'app_src/utils/baseList';
import { getUserInfo } from 'app_src/actions/user';
import * as guestActions from 'app_src/actions/guest';

export default {
    props: ['id'],
    components: {
        'fs-add-form': ()=> import('./add')  
    },
    data(){
        return {
            size: 10,
            page: 1,
            total: 0,

            loading: false,
            data: new BaseList(),
            original: new BaseList(),
            selection: [],

            isShowAddModal: false
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

                    if(row.editable !== true){
                        return h('span', row[column.key]);
                    }else{
                        return h('Input', {
                            props: {
                                type: 'text',
                                value: row[column.key],
                                placeholder: _this.lang.please_enter+`${column.title||''}`,
                                maxlength: 50
                            },
                            on: {
                                input(event){
                                    row[column.key] = event;

                                    _this.computedChanged(row, column);
                                }
                            }
                        });
                    }
                }
            },
            {
                title: this.lang.mobile,
                key: 'mobile',
                render(h, context) {
                    const {row, index, column} = context;
                    if(row.editable !== true){
                        return h('span', row[column.key]);
                    }else{
                        return h('Input', {
                            props: {
                                type: 'text',
                                value: row[column.key],
                                placeholder: _this.lang.please_enter+`${column.title||''}`,
                                maxlength: 50
                            },
                            on: {
                                input(event){
                                    row[column.key] = event;
                                    setTimeout(()=>{
                                        row[column.key] = event.replace(/[^0-9-]+/,'')
                                    })
                                    _this.computedChanged(row, column);
                                }
                            }
                        });
                    }
                }
            },
            {
                title: this.lang.email,
                key: 'email',
                render(h, context) {
                    const {row, index, column} = context;
                    if(row.editable !== true){
                        return h('span', row[column.key]);
                    }else{
                        return h('Input', {
                            props: {
                                type: 'text',
                                value: row[column.key],
                                placeholder: _this.lang.please_enter+`${column.title||''}`,
                                maxlength: 50
                            },
                            on: {
                                input(event){
                                    row[column.key] = event;

                                    _this.computedChanged(row, column);
                                }
                            }
                        });
                    }
                }
            },
            {
                title: this.lang.company,
                key: 'company',
                render(h, context) {
                    const {row, index, column} = context;
                    if(row.editable !== true){
                        return h('span', row[column.key]);
                    }else{
                        return h('Input', {
                            props: {
                                type: 'text',
                                value: row[column.key],
                                placeholder: _this.lang.please_enter+`${column.title||''}`,
                                maxlength: 50
                            },
                            on: {
                                input(event){
                                    row[column.key] = event;

                                    _this.computedChanged(row, column);
                                }
                            }
                        });
                    }
                }
            },
            {
                title: this.lang.position,
                key: 'position',
                render(h, context) {
                    const {row, index, column} = context;
                    if(row.editable !== true){
                        return h('span', row[column.key]);
                    }else{
                        return h('Input', {
                            props: {
                                type: 'text',
                                value: row[column.key],
                                placeholder: _this.lang.please_enter+`${column.title||''}`,
                                maxlength: 50
                            },
                            on: {
                                input(event){
                                    row[column.key] = event;

                                    _this.computedChanged(row, column);
                                }
                            }
                        });
                    }
                }
            },
            {
                title: this.lang.operation,
                key: 'mobile',
                render(h, context) {
                    const {row, index, column} = context;

                    if(row.editable !== true){
                        return h('div', {
                                class: 'opeater'
                            },[
                                h('span', {
                                    on: {
                                        click: () => {
                                            row.editable = !row.editable;
                                        }
                                    }
                                }, _this.lang.edit),
                                h('span', {
                                    on: {
                                        click: () => {
                                            _this.$confirm({
                                                title: _this.lang.confirm_to_delete,
                                                content: _this.lang.confirm_to_delete_the_member,
                                                onConfirm: () =>{
                                                    guestActions.remove({
                                                        conferenceId: _this.id,
                                                        guestId: row.id,
                                                        success(){
                                                            _this.data.remove(row.id);
                                                            _this.total--;
                                                            _this.getList();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                        }, _this.lang.delete)]);
                    }else{
                        return h('div',{
                                class: 'opeater'
                            },[
                                h('Button', {
                                    class: 'cancel',
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            row.editable = !row.editable;
                                            const original = _this.original.get(row.id);
                                            if(original){
                                                for(var x in original){
                                                    if(original.hasOwnProperty(x)){
                                                        row[x] = original[x];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, _this.lang.cancel),
                                h('Button', {
                                    class: ['confirm',{
                                        disable: !(row.changeList.length && (row['name'] && row['mobile']))
                                    }],
                                    on: {
                                        click: () => {
                                            if(!!(row.changeList.length && (row['name'] && row['mobile']))){
                                                guestActions.update({
                                                    conferenceId: _this.id,
                                                    guestId: row.id,
                                                    ...row,
                                                    success(res){
                                                        row.editable = !row.editable;
                                                        _this.getList();
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }, _this.lang.save),
                            ]);
                    }
                }
            });
            return header;
        }  
    },
    methods: {
        computedChanged(row, column){
            if(row && row.id){
                const original = this.original.get(row.id);
                row.changeList = row.changeList || [];
                const index = row.changeList.indexOf(row.id);
                if(index > -1){
                    row.changeList.splice(index, 1);
                }
                if(!!(!original ||  (original[column.key] != row[column.key]))){
                    row.changeList.push(row.id);
                }
            }
        },
        onSelectionChange(selection){
            this.selection = selection;
        },
        onPageChange(page){
            this.page = page;
            this.getList();
        },
        onAdd(data){
            this.getList();
        },
        getList(){
            this.loading = true;
            this.data.clear();
            this.original.clear();
            guestActions.getList({
                conferenceId: this.id,
                size: this.size,
                start: this.start,
                success: res =>{
                    this.loading = false;
                    if(res){
                        this.total = res.total || 0;
                         if(Array.isArray(res.data)){
                            res.data.forEach(item => {
                                // const data = this.data.get(item.id);
                                // if(!data){
                                    this.$set(item, 'editable', false);
                                    this.$set(item, 'changeList', []);
                                // }
                                this.data.set(item.id, item);
                                this.original.set(item.id, JSON.parse(JSON.stringify(item)));
                            });
                        }
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

        this.$eventbus.$off('tab_guest_add').$on('tab_guest_add', ()=>{
            this.isShowAddModal = true;
        });
    }
}
</script>

<style lang="less">
.guest-index {
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
.guest-index {
    padding: 20px 10px 0;
    .footer {
        margin: 20px;
        .tip {
            font-size: 12px;
            color: #888888;
        }
    }
}
</style>
