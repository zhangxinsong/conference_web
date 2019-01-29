import vsm from './_vsm.vue';

export default{
    install(Vue,options){
        // 当vue.use 的时候 动态创建选人组件 挂载到body上 ;
        var el = document.createElement('div');
            el.id = 'vsm-replace';
        // 添加到body ;
        document.body.appendChild( el );
        // 挂载到vue原型中 this.$selectMan.open(...) 直接打开选人组件 ;
        Vue.prototype.$seletMan = new Vue({
            mixins:[vsm],
            el:'#vsm-replace'
        })
    }
}