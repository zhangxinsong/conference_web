<template>
    <div class="home">
        <div class="header">
            <router-link to="/" >
                <i class="icon-back" v-if="$route.path!='/'"></i>
                {{/\/update/.test($route.fullPath)? lang.create_conference : lang.conference_list}}
            </router-link>
            <div class="header-right">
                <span>{{this.$store.state.userName}}</span>
                <span class="logout" @click="logout">退出</span>
            </div>
        </div>

        <div class="body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        // console.log('home.beforeRouteEnter', to, from);
        next(vm =>{
            // todo..
            // console.log('home.beforeRouteEnter.resolve', to, from);
        });
    },
    beforeRouteUpdate(to, from, next){
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        // console.log('home.beforeRouteUpdate', to, from);
        next();
    },
    beforeRouteLeave(to, from, next){
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // console.log('home.beforeRouteLeave', to, from);
        next();
    },
    beforeCreate () {
        // console.log('beforeCreate', this);
    },
    created () {
    },
    beforeUpdate () {
        // console.log('beforeUpdate', this);
    },
    updated () {
        // console.log('updated', this);
    },
    beforeMount () {
        // console.log('beforeMount', this);
    },
    mounted () {
        // console.log('mounted', this);
    },
    beforeDestroy () {
        // console.log('beforeDestroy', this);
    },
    destroyed () {
        // console.log('destroyed', this);
    },
    methods:{
        logout(){
            this.$store.dispatch('memberId','');
            this.$router.push({name:'login'});
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    position: relative;
    .header {
        color:#111111;
        line-height:28px;
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        background-color: #ffffff;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        .header-right{
            float: right;
            margin-right: 20px;
            .logout{
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
    .body {
        position: absolute;
        left: 0;
        top: 60px;
        right: 0;
        bottom: 0;
    }
}
</style>

