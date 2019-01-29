<template>
    <fs-content-layout class="base">
        <template slot="title">{{lang.basic_info}}</template>
        <template slot="content">
            <component :is="fsContent" @onConfirm="onConfirm" @onCancel="onCancel" :id="id"></component>
        </template>
    </fs-content-layout>
</template>

<script>
export default {
    props: {
        id: String,
    },  
    data () {
        return {
            fsContent: 'fs-detail'
        }
    },
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
        'fs-detail': ()=> import('app_src/view/home/detail/detail'),
        'fs-form': ()=> import('app_src/view/home/detail/form'),
    },
    methods: {
        onConfirm(data, err){
            if(this.fsContent == 'fs-detail'){
                this.fsContent = 'fs-form';
            }else{
                if(data){
                    if(err){
                        this.alert_error(this.lang.failed_to_update);
                    }else{
                        this.alert_success(this.lang.updated_successfully);
                    }
                }
                this.fsContent = 'fs-detail';
            }
        },
        onCancel(e, data){
            this.fsContent = 'fs-detail';
        }
    }
}
</script>
<style scoped lang="less">
.base {
    .content {
        .form {
            width: 680px;
            padding: 30px 40px;
        }
    }
}
</style>


