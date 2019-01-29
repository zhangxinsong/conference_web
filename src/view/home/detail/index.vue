<template>
    <div class="detail">
        <fs-form :id="id" @onConfirm="onConfirm" @onCancel="onCancel">
            <h6 style="padding-left: 40px;" slot="title">{{lang.conference_basic_info}}</h6>
        </fs-form>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
    },
    components: {
        'fs-form': ()=> import('./form')
    },
    methods: {
        onConfirm(data, err){
            if(!data){
                if(err){
                    this.alert_error(this.lang.failed_to_create);
                }else{
                    this.alert_success(this.lang.created_successfully);
                    this.$router.go(-1);
                }
            }
        },
        onCancel(){
            this.$router.go(-1);
        }
    },
}
</script>


<style lang="less" scoped>
.detail {
    background-color: #ffffff;
    border-top: 1px solid #E9E9E9;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;

    h6{
        color: #555555;
        margin-bottom: 20px;
    }

    .form {
        margin: 40px auto;
        width: 450px;
    }
}
</style>
