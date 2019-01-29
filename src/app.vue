<template>
    <!-- 总体布局 -->
    <fs-layout class="upesn-confrence">

        <!-- 框架头部 -->
        <!-- <fs-header slot="header"></fs-header> -->

        <!-- 框架主体 -->
        <template slot="body">
            <transition>
                <router-view></router-view>
            </transition>
        </template>
    </fs-layout> 
</template>
<script>
export default {
    components: {
        'fs-header': ()=> import('app_component/app/header'),  
        'fs-body': ()=> import('app_component/app/body'),  
        'fs-layout': ()=> import('app_component/app/layout'),  
    },
    watch: {
        '$route': {
            immediate: true,
            handler(){
                console.log('app.watch.$route', this, this.$route);
            }
        }
    },
    created () {
    }
}
</script>
<style scoped lang="less"> 
.upesn-confrence {
    font-size: 14px;
}
</style>
