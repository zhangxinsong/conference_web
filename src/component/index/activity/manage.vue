<template>
    <Modal
        class="activity-manage"
        v-model="isShow" 
        width="900"
        :border="false"
        :draggable="true" 
        :title="lang.activity_mgmt">
        <div class="content">
            <Table 
                :columns="header" 
                :loading="loading" 
                :data="data.getAll()" 
                height="460"
                :border="false"
                :disabled-hover="false"
                ></Table>
        </div>
        <div slot="footer" class="footer clearfix">
            <Button type="primary" class="normal" v-if="adding !== true" style="float: right;" @click="adding=true">{{lang.add_activity}}</Button>
            <fs-add-activity v-else :conferenceId="id" @onSuccess="onAddSuccess" @onCancel="adding=false" @onError="onAddError"></fs-add-activity>
        </div>
    </Modal>
</template>

<script>
import BaseList from 'app_src/utils/baseList';
import * as activityActions from 'app_src/actions/activity';

export default {
    props: ['value', 'id', 'activityId'],
    components: {
        'fs-add-activity': () => import('./add')  
    },
    computed: {
        isShow: {
            get(){
                return !!this.value;
            },
            set(value){
                this.$emit('input', !!value);
            }
        }
    },
    watch: {
        isShow(value){
            if(!!value){
                this.getList();
            }else{
                this.adding = false;
            }
        }  
    },
    data () {
        return {
            loading: true,
            adding: false,

            header: null,
            data: new BaseList(),
            original: new BaseList(),
        }
    },
    methods: {
        initHeader(){
            const _this = this;
            this.header = [{
                    title: _this.lang.activity_date,
                    key: 'activityDate',
                    render(h, context) {
                        const {row, index, column} = context;
                        
                        if(row.editable !== true){
                            return h('span', new Date(row[column.key]).format('yyyy-MM-dd'));
                        }else{
                            return h('DatePicker',{
                                props: {
                                    type: 'date',
                                    value: new Date(row[column.key]).format('yyyy-MM-dd'),
                                    placeholder: _this.lang.please_select_date,
                                    editable: false,
                                    maxlength: 100,
                                },
                                on: {
                                    input(event){
                                        row[column.key] = new Date(event).getTime();
                                        _this.computedChanged(row, column);
                                    },
                                }
                            });
                        }
                    }
                },
                {
                    title: _this.lang.activity_time,
                    key: 'time',
                    render(h, context) {
                        const {row, index, column} = context;
                        if(row.editable !== true){
                            return h('span', row['startTime'] && row['endTime']? `${new Date(row['startTime']).format('hh:mm')} - ${new Date(row['endTime']).format('hh:mm')}`: ``);
                        }else{
                            return h('TimePicker',{
                                props: {
                                    type: 'timerange',
                                    value: [
                                        (row['startTime']? new Date(row['startTime']): new Date()).format('hh:mm'),
                                        (row['endTime']? new Date(row['endTime']): new Date()).format('hh:mm'),
                                    ],
                                    placeholder: _this.lang.select_time,
                                    editable: false,
                                    format: 'HH:mm',
                                },
                                on: {
                                    input(event){
                                        if(event[0]){
                                            row['startTime'] = new Date(`${new Date(row['activityDate']).format('yyyy-MM-dd')} ${event[0]}`).getTime();
                                        }
                                        if(event[1]){
                                            row['endTime'] = new Date(`${new Date(row['activityDate']).format('yyyy-MM-dd')} ${event[1]}`).getTime();
                                        }
                                        _this.computedChanged(row, column, 'startTime');
                                        _this.computedChanged(row, column, 'endTime');
                                    },
                                }
                            });
                        }
                    }
                },
                {
                    title: _this.lang.activity_title,
                    key: 'name',
                    render(h, context) {
                        const {row, index, column} = context;

                        if(row.editable !== true){
                            return h('span', row[column.key]);
                        }else{
                            return h('Input', {
                                props: {
                                    type: 'textarea',
                                    value: row[column.key],
                                    placeholder: _this.lang.please_enter+`${column.title}`,
                                    maxlength: 100,
                                    autosize: {
                                        minRows: 1,
                                        maxRows: 3
                                    }
                                },
                                on: {
                                    input(event){
                                        row[column.key] = event;
                                        _this.computedChanged(row, column);
                                    },
                                }
                            });
                        }
                    }
                },
                {
                    title: _this.lang.operation,
                    key: 'operate',
                    align: 'center',
                    render: (h, context) => {
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
                                            if(_this.activityId == row.id){
                                                _this.alert_error(_this.lang.activity_being_opened_cannot_be_deleted);
                                            }else{
                                                _this.$confirm({
                                                    title: _this.lang.confirm_to_delete,
                                                    content: _this.lang.confirm_to_delete_the_activity,
                                                    onConfirm: () =>{
                                                        activityActions.deleteActivity({
                                                            conferenceId: _this.id,
                                                            activityId: row.id,
                                                            success(res){
                                                                _this.data.remove(row.id);
                                                                _this.total--;
                                                                _this.getList();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }, _this.lang.delete)
                            ]);
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
                                        disable: !(row.changeList.length && (row['activityDate'] && row['startTime'] && row['endTime'] && row['name'] ))
                                    }],
                                    on: {
                                        click: () => {
                                            if(!!(row.changeList.length && (row['activityDate'] && row['startTime'] && row['endTime'] && row['name']))){
                                                activityActions.updateActivity({
                                                    conferenceId: _this.id,
                                                    activityId: row.id,
                                                    activityDate: row['activityDate'],
                                                    startTime: new Date(`${new Date(row['activityDate']).format('yyyy-MM-dd')} ${new Date(row['startTime']).format('hh:mm')}`).getTime(),
                                                    endTime: new Date(`${new Date(row['activityDate']).format('yyyy-MM-dd')} ${new Date(row['endTime']).format('hh:mm')}`).getTime(),
                                                    name: row['name'],
                                                    success: res =>{
                                                        row.editable = !row.editable;
                                                        _this.getList();
                                                        _this.$eventbus.$emit('onActivityUpdated', res);                     
                                                    },
                                                });
                                            }
                                        }
                                    }
                                }, _this.lang.save)
                            ]);
                        }
                    }
                }];
        },
        computedChanged(row, column, key){
            if(row && row.id){
                const original = this.original.get(row.id);
                row.changeList = row.changeList || [];
                const index = row.changeList.indexOf(row.id);
                if(index > -1){
                    row.changeList.splice(index, 1);
                }
                if(!!(!original || (original[key || column.key] != row[key || column.key]))){
                    row.changeList.push(row.id);
                }
            }
        },
        getList(){
            activityActions.getList({
               conferenceId: this.id,
               success: res =>{
                   this.loading = false;
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
                    this.$eventbus.$emit('activity_list_update', res.data || []);
               }
           }); 
        },
        onAddSuccess(){
            this.adding = false;
            this.activity = null;
            this.getList();
        },  
        onAddError(){

        },  
    },
    created () {
        this.initHeader();
        this.getList();
    }
}
</script>

<style lang="less">
.activity-manage {
    .content {
        .opeater {
            button {
                padding: 0 !important;
                width: 52px;
                height: 28px;
            }
            span {
                color: #007ACE;
                margin-left: 10px;
                margin-right: 10px;
                cursor: pointer;
            }
            .cancel span {
                color: #555;
            }
            .confirm span {
                color: #fff;
            }

        }
    }

    .ivu-table {
        font-size: 14px;
    }

    .ivu-table {
        font-size: 14px;
    }
    .ivu-table-wrapper,
    .ivu-table th {
        border: none;
    }
    .ivu-table:after,
    .ivu-table:before {
        width: 0;
    }
    .ivu-modal-content {
        border-radius: 3px;
        .ivu-icon-ios-close-empty:before {
            color: #555;
        }
        .ivu-modal-header-inner {
            font-weight: normal;
        }
        .ivu-modal-body {
            .title {
                color: #111;
            }
            .content {
                font-size: 14px;
                color: #555;
            }
        }
        .ivu-modal-footer {
            border-top: none;
        }
    }
}
</style>
