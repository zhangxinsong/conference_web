<template>
    <div class="prize">
        <Table 
        :columns="header" 
        :data="data.getAll()" 
        :loading="loading"
        :border="false"
        :disabled-hover="true"
        @on-select="onSelect"
        @on-selection-change="onSelectionChange"
        @on-select-all="onSelectionAll"
        ></Table>

        <div class="control">
            <Button type="primary" class="cancel normal" @click="addPrize" style="margin-left: 20px;margin-right: 10px;">{{lang.add_prize}}</Button>
            <Button type="primary"  @click="exportPrize" :class="['confirm', {disable: !selection || !selection.length}]">{{lang.export_winner_list}}</Button>
        </div>
    </div>
</template>

<script>
import * as prizeActions from 'app_src/actions/activity/prize';
import { getUserInfo } from 'app_src/actions/user';
import config from 'app_src/config/';
import BaseList from 'app_src/utils/baseList';

export default {
    props: ['id','activityId'],
    data () {
        return {
            data: new BaseList(),
            original: new BaseList(),
            header: null,
            loading: true,
            selection: null
        }
    },
    methods: {
        exportPrize(){
            if(this.selection 
            && this.selection.length){
                const prizeIds = this.selection.map(item =>{
                    return item.id;
                });
                const info = getUserInfo();
                const result = this.openExternal(`${config.apiHost}rest/v1/activity/${this.activityId}/lottery/record/export/${this.id}?prizeIds=${prizeIds}&token=${info && info.token || ''}`, '_blank');
                if(!result){
                    this.messageBox.info(this.lang.please_first_allow);
                }
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
        addPrize(){
            if(!this.data.get('temp')){
                this.data.set('temp', {
                    id: 'temp',
                    editable: true,
                    isChanged: true,
                    image: '',
                    prize: '',
                    prizeName: '',
                    amount: 0,
                    _disabled: true,
                    changeList: []
                });
            }
        },
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
        getList(){
            prizeActions.getList({
                activityId: this.activityId,
                success: res =>{
                    this.loading = false;
                    if(Array.isArray(res)){
                        res.forEach(item => {
                            item.id = item.id || item.prizeId;
                            // const data = this.data.get(item.id);
                            // if(!data){
                                this.$set(item, 'editable', false);
                                this.$set(item, 'changeList', []);
                            // }
                            this.data.set(item.id, item);
                            this.original.set(item.id, JSON.parse(JSON.stringify(item)));
                        });
                    }
                },
                error: res=>{
                    this.loading = false;
                }
            });
        },
        initHeader(){
            const _this = this;
            this.header = [
                {
                    type: 'selection',
                    width: 55,
                    align: 'left',
                },
                {
                    title: this.lang.picture,
                    key: 'image',
                    render(h, params){
                        const {row, index, column} = params;

                        const children = [ 
                            h('fs-image', {
                                attrs: {
                                    src: `${row[column.key]}.thumb.jpg` || '',
                                    scale: 1
                                }
                            })
                        ];

                        if(row.editable){
                             children.unshift(h('i', {
                                class: 'icon-add'
                            }));
                        }
                        
                        const content = h('div',{
                            class: ['img-content',{
                                'no-wrap': row.editable !== true
                            }]
                        }, children);

                        const uploadprizeimg = h('Upload',{
                            props: {
                                'type': 'drag',
                                'show-upload-list': false,
                                'on-success': res =>{
                                    row[column.key] = res && res.fileUrl;

                                    _this.computedChanged(row, column);
                                },
                                'format': ['jpg','jpeg','png'],
                                'max-size': 1024 * 10,
                                'accept': 'image/gif,image/jpeg,image/png,image/jpg,image/bmp', 
                                'on-format-error': ()=>{
                                    _this.alert_warning(_this.lang.invalid_attachment_format);
                                },
                                'on-error': ()=>{
                                    _this.alert_warning(_this.lang.uploading_failed_two);
                                },
                                'on-exceeded-size': ()=>{
                                    _this.alert_warning(`${_this.lang.attachment_size_exceeds_limit}10M`); 
                                },
                                'before-upload': res =>{
                                },
                                'action': (function(){
                                    const info = getUserInfo();
                                    return `${config.apiHost}rest/v1/client/file/upload`;
                                })()
                            },
                        },[content]);

                        const tip = h('p',{
                            style: {
                                "fontSize": '12px',
                                "color": '#888',
                                "line-height":"17px",
                                "text-align": "left"
                            },
                        },_this.lang.p_onetoone)

                        if(row.editable !== true){
                            return content;
                        }else{
                            return h('div',{
                               style: {
                                    textAlign: 'left',
                                    marginBottom: '20px'
                                }
                            },[
                                uploadprizeimg,
                                tip
                            ])
                        }
                    }
                },
                {
                    title: this.lang.prize,
                    key: 'prize',
                    render(h, params){
                        const {row, index, column} = params;
                        if(row.editable !== true){
                            return h('span', row[column.key]);
                        }else{
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: row[column.key],
                                    placeholder: _this.lang.please_enter_prize,
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
                    title: this.lang.prize_name,
                    key: 'prizeName',
                    render(h, params){
                        const {row, index, column} = params;
                        if(row.editable !== true){
                            return h('span', row[column.key]);
                        }else{
                            return h('Input', {
                                props: {
                                    type: 'textarea',
                                    value: row[column.key],
                                    placeholder: _this.lang.please_enter_prize_name,
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
                    title: this.lang.total_qty,
                    key: 'amount',
                    render(h, params){
                        const {row, index, column} = params;
                        if(row.editable !== true){
                            return h('span', `${row[column.key] || 1}`);
                        }else{
                            return h('InputNumber', {
                                props: {
                                    value: row[column.key],
                                    min: row['lotteryAmount'] || 1,
                                    max: 100000,
                                    editable: true
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
                    title: this.lang.number_pumped,
                    key: 'lotteryAmount',
                    render(h, params){
                        const {row, index, column} = params;
                        return h('span', `${row[column.key] || 0}`);
                    }
                },
                {
                    title: this.lang.operation,
                    key: 'opearte',
                    render(h, params){
                        const {row, index, column} = params;
                        if(row.editable !== true){
                            return h('div',{
                                class: 'opeater'
                            },[
                                h('span', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _this.$confirm({
                                                title: _this.lang.confirm_to_delete,
                                                content: _this.lang.confirm_to_delete_the_prize,
                                                onConfirm: () =>{
                                                    prizeActions.deletePrize({
                                                        activityId: _this.activityId,
                                                        prizeId: row.id,
                                                        success(){
                                                            _this.data.remove(row.id);
                                                            _this.total--;
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }, _this.lang.delete),
                                h('span', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            row.editable = !row.editable;
                                        }
                                    }
                                }, _this.lang.edit),
                                h('span', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _this.$router.push({
                                                name: 'lotteryWinner',
                                                params: {
                                                    prizeId: row.id
                                                }
                                            })
                                        }
                                    }
                                }, _this.lang.winner_list),
                                h('span', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _this.$router.push({
                                                name: 'lotteryBlackList',
                                                params: {
                                                    prizeId: row.id
                                                }
                                            })
                                        }
                                    }
                                }, _this.lang.settings),
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
                                            if(row.id == 'temp'){
                                                _this.data.remove(row.id);
                                            }else{
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
                                    }
                                }, _this.lang.cancel),
                                h('Button', {
                                    class: ['confirm',{
                                        disable: !(row.changeList.length && (row['image'] && row['prize'] && row['prizeName'] && (row['amount']>0)))
                                    }],
                                    on: {
                                        click: () => {
                                            if(!!(row.changeList.length && (row['image'] && row['prize'] && row['prizeName']))){
                                                prizeActions.updatePrize({
                                                    activityId: _this.activityId,
                                                    prizeId: row.id != 'temp'? row.id:'',
                                                    ...row,
                                                    success(res){
                                                        if(row.id == 'temp'){
                                                            _this.data.remove(row.id);
                                                        }
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
                }
            ];
        }  
    },
    created () {
        this.initHeader();

        this.getList();
    }
}
</script>

<style lang="less">
.prize {
    background-color: #ffffff;
    .ivu-table {
        font-size: 14px;
        .ivu-table-cell {
            padding-left: 31px;
            padding-right: 0px;
        }
        &-tip {
            tbody tr td span {
                color: #bfbfbf;
            }
        }
    }
    .ivu-table-wrapper,
    .ivu-table th {
        border: none;
    }
    .ivu-table:after {
        width: 0;
    }
    .ivu-upload-drag {
        margin: 20px 0 0 0;
        display: inline-block;
    }

    .img-content {
        position: relative;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        // img {
        //     width: 100%;
        //     // height: 100%;
        //     position: absolute;
        //     left: 0;
        //     top: 0;
        //     right: 0;
        //     // bottom: 0;
        //     z-index: 1;
        //     display: none;
        // }

        .image-cover {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        &.no-wrap {
            margin: 20px 0;
        }
    }
    .opeater {
        > span {
            color: #007ACE;
            margin-right: 20px;
            cursor: pointer;
        }
    }

    .control {
        margin-top: 15px;
        padding-bottom: 15px;
    }
}
</style>
