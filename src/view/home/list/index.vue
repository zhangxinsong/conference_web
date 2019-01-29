<template>
    <ul class="content clearfix">
        <li v-for="(item,index) in data" :key="index">
            <fs-list-item :data="item" @onDelete="onDelete"></fs-list-item>
        </li>
        <li>
            <fs-list-item-add @click.native="onclick">
                {{lang.add_conference}}
            </fs-list-item-add>
        </li>
    </ul>
</template>

<script>
import BaseList from 'app_src/utils/baseList';
import * as homeActions from 'app_src/actions/home';

export default {
    components: {
        'fs-list-item': ()=> import('app_component/home/listItem'),
        'fs-list-item-add': ()=> import('app_component/home/listAddItem')  
    },
    data () {
        return {
            data: null,
        }
    },
    computed: {
        // list(){
        //     const result = [];
        //     if(Array.isArray(this.data)){
        //         const now = Date.now();
        //         return result
        //         .concat(this.data.filter(item=>{return item.startTime < now && item.endTime > now;}).sort(function(val1,val2){return val1['startTime'] - val2['startTime']}))
        //         .concat(this.data.filter(item=>{return item.startTime > now;}).sort(function(val1,val2){return val1['startTime'] - val2['startTime']}))
        //         .concat(this.data.filter(item=>{return item.endTime < now;}).sort(function(val1,val2){return val1['startTime'] - val2['startTime']}))
        //     }
        //     return result;
        // }  
    },
    methods: {
        onclick(){
            this.$router.push({
                name: 'update'
            });
        },
        onDelete(){
            this.getList();
        },
        getList(info){
            homeActions.getList({
                success: res=>{
                    this.data = res.data || [];
                    console.log('list', this.data);
                }
            });
        }
    },
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
    mounted () {
        this.getList();      
    },
   
}
</script>
<style lang="less" scoped>
.content {
    padding: 40px 20px 40px 40px;
    li {
        width: 270px;
        height: 140px;
        background-color: #ffffff;
        box-shadow:0px 1px 0px 0px rgba(245,245,245,1);
        border-radius: 4px;
        margin: 0 20px 20px 0; 
        float: left;
    }
}
</style>

