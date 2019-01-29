<template>
    <fs-content-layout class="signin">
        <template slot="title">{{ lang.registration_approval }}</template>
        <template slot="content">
        	<approve :id="id"></approve>
        </template>
    </fs-content-layout>
</template>

<script>
export default {
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
        'approve': ()=> import('./approve')
    },
    props:{
        id: String
    }
}
</script>

<style scoped lang="less">
.signin {
    
}
</style>