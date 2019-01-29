<template>
    <div class="agenda">
        <div class="clearfix">
            <span class="block">{{checked? lang.morning_agenda: lang.all_agendas}}</span>
            <Checkbox v-model="checked" class="checked" style="float:right;" @on-change="onAmPmChanged">{{lang.differentiate_agendas}}</Checkbox>
        </div>

        <ul class="clearfix content">
            <li v-for="(item,index) in (!checked? list : amList)" :key="index">
                <fs-list-item :data="item" @onEdit="onEdit(item)" @onDelete="onDelete(item)"></fs-list-item>
            </li>
            <li>
                <fs-list-item-add @click.native="onAddAgenda">
                    {{lang.add_agenda}}
                </fs-list-item-add>
            </li>
        </ul>

        <template v-if="pmList && pmList.length">
            <div v-if="checked" class="block" style="margin-top: 20px">{{lang.afternoon_agenda}}</div>
            <ul class="clearfix content" v-if="checked">
                <li v-for="(item,index) in pmList" :key="index">
                    <fs-list-item :data="item" @onEdit="onEdit(item)" @onDelete="onDelete(item)"></fs-list-item>
                </li>

                <li>
                    <fs-list-item-add @click.native="onAddAgenda">
                        {{lang.add_agenda}}
                    </fs-list-item-add>
                </li>
            </ul>
        </template>

        <component :is="`fs-agenda-add`" :activityId="activityId" :agenda="agenda" :id="id" v-model="isShowAddWin" @onConfirm="onAddConfirm"></component>

        <fs-qr-code-modal v-model="isShowQrCodeModal" @getQrCode="getQrCode" :title="this.lang.preview" :describe="this.lang.please_use_youzone"></fs-qr-code-modal>
    </div>
</template>

<script>
import config from 'app_src/config/';
import * as agendaActions from 'app_src/actions/activity/agenda';

export default {
    props: ['value', 'id', 'activityId'],
    components: {
        'fs-list-item': ()=> import('./listItem'),
        'fs-list-item-add': ()=> import('app_component/home/listAddItem'),
        'fs-agenda-add': ()=> import('./add'),
    },
    computed: {
        amList(){
            return this.list && this.list.filter(item=>{return `${item.startTime}`.localeCompare('12:00') < 0}) || [];
        },  
        pmList(){
            return this.list && this.list.filter(item=>{return `${item.startTime}`.localeCompare('12:00') >= 0}) || [];
        }  
    },
    watch: {
        activityId(value){
            if(value){
                this.getList();
            }
        }
    },
    data () {
        return {
            isShowQrCodeModal: false,
            checked: false,
            list: null,
            isShowAddWin: false,
            agenda: null
        }
    },
    methods: {
        onAmPmChanged(){
            agendaActions.withAmPmTitle({
                 activityId: this.activityId,
                 enable: !!this.checked,
                 success: res=>{
                 }
            });
        },
        getQrCode(callback){
            callback && callback(`${config.apiHost}app/index.html#/conferenceAgenda?conferenceId=${this.id}&upesntype=urlWithUserCode`);
        },
        onAddAgenda(){
            this.isShowAddWin = true;
            this.agenda = null;
        },
        onEdit(data){
            this.agenda = data;
            this.isShowAddWin = true;
        },
        onDelete(data){
            this.$confirm({
                title: this.lang.confirm_to_delete,
                content: this.lang.confirm_to_delete_the_agenda,
                onConfirm: () =>{
                    agendaActions.deleteAgenda({
                        activityId: this.activityId,
                        agendaId: data.id || data.agendaId,
                        success: res =>{
                            this.alert_success(this.lang.deleted_successfully);
                            this.getList();
                        },
                        error: res =>{
                            this.alert_error(this.lang.failed_to_delete);
                        },
                    });
                }
            });
        },
        onAddConfirm(){
            this.getList();
        },
        addAgenda(){
            this.isShowAddWin = true;
        },
        getList(){
            this.list = [];
            agendaActions.getList({
                activityId: this.activityId,
                success: res=>{
                    if(Array.isArray(res.agendas)){
                        this.list = res.agendas || [];
                    }
                    this.checked = !!res.withAmPmTitle;
                    console.log('agendas_list', this.list);
                },
                error: res =>{
                    this.list = [];
                }                
            });
        }
    },
    created () {
        this.getList();
        
        this.$eventbus.$off('tab_agenda_preview').$on('tab_agenda_preview', ()=>{
            this.isShowQrCodeModal = true;
        });
    },
}
</script>

<style lang="less" scoped>
.agenda {
    background-color: #F3F3F3;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 40px 20px 40px 40px;

    .checked,
    .block {
        color: #555555;
        font-size: 14px;
    }

    .content {
        li {
            width: 270px;
            height: 140px;
            background-color: #ffffff;
            box-shadow:0px 1px 0px 0px rgba(245,245,245,1);
            border-radius: 4px;
            margin: 10px 20px 10px 0; 
            float: left;
        }
    }
}
</style>
