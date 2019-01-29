/**
 * 路由处理
 * @author rongqb@yonyou.com 
    0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

    1. 定义 (路由) 组件。
    可以从其他文件 import 进来
    
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }

    2. 定义路由
    每个路由应该映射一个组件。 其中"component" 可以是
    通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
    我们晚点再讨论嵌套路由。
    
    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]

    3. 创建 router 实例，然后传 `routes` 配置
    你还可以传别的配置参数, 不过先这么简单着吧。
    
    const router = new VueRouter({
        routes // (缩写) 相当于 routes: routes
    })

    4. 创建和挂载根实例。
    记得要通过 router 配置参数注入路由，
    从而让整个应用都有路由功能
    
    const app = new Vue({
        router
    }).$mount('#app')

    现在，应用已经启动了！
    
    5. 通过注入路由器，
    我们可以在任何组件内通过 this.$router 访问路由器： 
    this.$router
    
    也可以通过 this.$route 访问当前路由：
    this.$route 
    this.$route.params 
    this.$route.query

    6.当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active

    7.router.push(location, onComplete?, onAbort?)
      router.replace(location, onComplete?, onAbort?),它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录 <router-link :to="..." replace>	router.replace(...)
    可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。
    这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。
    
    8.router.go(n)
    这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import iView from 'iview';
import store from '../store/';

// Vue.use(iView);
Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history', // history 看不到hash，默认 ‘hash’
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log('router.scrollBehavior', to, from, savedPosition);
        /**
         * 1.如果你要模拟“滚动到锚点”的行为：
         */
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
        /**
         * 2.返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
         */
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

/**
 * 完整的导航解析流程
    1.导航被触发。
    2.在失活的组件里调用离开守卫。 beforeRouteLeave
    3.调用全局的 beforeEach 守卫。
    4.在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    5.在路由配置里调用 beforeEnter。
    6.解析异步路由组件。
    7.在被激活的组件里调用 beforeRouteEnter。
    8.调用全局的 beforeResolve 守卫 (2.5+)。
    9.导航被确认。
    10.调用全局的 afterEach 钩子。
    11.触发 DOM 更新。
    12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
 */

/**
 * 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
    每个守卫方法接收三个参数：
        to: Route: 即将要进入的目标 路由对象
        from: Route: 当前导航正要离开的路由
        next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
            next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
            next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
            next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
            next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

    确保要调用 next 方法，否则钩子就不会被 resolved。
 */
router.beforeEach((to, from, next) => {
    console.log('router.beforeEach', to, from);
    iView.LoadingBar.start();
    console.log(store.state.memberId);
    if(store.state.memberId == '' && to.name != 'login'){
        next({name:'login'})
    }else{
        next();
    }
    // try {
    //     // todo
    // } catch (e) {
    //     // todo
    // } finally {
    
    // }
});

/**
 * 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
 */
router.beforeResolve((to, from, next) => {
    // console.log('router.beforeResolve', to, from);
    //     try {
    //         // todo
    //     } catch (e) {
    //         // todo
    //     } finally {
    next();
    //     }
});

/**
 * 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
 */
router.afterEach((to, from) => {
    iView.LoadingBar.finish();
    // console.log('router.afterEach', to, from);
    // ...
})

export default router;