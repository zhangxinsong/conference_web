<template>
<div ref="scroller" class="yy-scroller">
    <div class="yy-scroller-content">
        <div ref="scrollerContent">
            <div ref="scrollerListContent">
                <slot></slot>
            </div>
            <div class="pull-up loading" ref="pull-up" v-if="pullUpLoad">
                <slot name="pullUpLoad" :isPullingUp="isPullingUp">
                    <loading type="base" v-show="isPullingUp"></loading>
                </slot>
                <span class="pull-upload-txt">
                    {{isPullingUp ? pullUpLoadTxt.loading : 
                    !hasFinishInfinite ? pullUpLoadTxt.more : pullUpLoadTxt.noMore}}
                </span>
            </div>
        </div>
        <div class="pull-down" v-if="pullDownRefresh">
            <div class="loading">
                <slot name="pullDownRefresh" :isPullingDown="isPullingDown">
                    <loading></loading>
                </slot>
                <span class="pull-download-txt">
                    {{isPullingDown ? pullDownLoadTxt.loading : pullDownLoadTxt.refresh}}
                </span>
            </div>
        </div>
    </div>
    <slot name="empty"></slot>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import Locale from '../../locale/'
import {t} from '../../locale/locale'
import Loading from '../loading/'

const getRect = function (el) {
    return {
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight
    }
}
export default {
    mixins: [Locale],
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        click: { // 点击列表是否派发click事件
            type: Boolean,
            default: true
        },
        scrollX: { // 是否开启横向滚动
            type: Boolean,
            default: false
        },
        scrollY: { // 是否开启纵向滚动
            type: Boolean,
            default: true
        },
        listenScroll: { // 是否派发滚动事件
            type: Boolean,
            default: false
        },
        listenScrollEnd: { // 是否派发滚动结束事件
            type: Boolean,
            default: false
        },
        listenBeforeScroll: { // 是否派发列表滚动开始的事件
            type: Boolean,
            default: false
        },
        pullUpLoadTxt: {
            type: Object,
            default() {
                return {
                    more: t('scroller.pullUpLoadTxt.more'),
                    noMore: t('scroller.pullUpLoadTxt.noMore'),
                    loading: t('scroller.pullUpLoadTxt.loading')
                }
            }
        },
        pullUpLoad: { // 是否启用上拉加载
            type: Boolean,
            default: false
        },
        pullDownLoadTxt: {
            type: Object,
            default() {
                return {
                    refresh: t('scroller.pullDownLoadTxt.refresh'),
                    loading: t('scroller.pullDownLoadTxt.loading')
                }
            }
        },
        pullDownRefresh: { // 是否启用下拉刷新
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isPullingDown: false,
            isPullingUp: false,
            dpr: 1,
            rotate: 0,
            initTimer: null,
            hasFinishInfinite: false, // 监测是否还有更多数据 false还有 true未有
        };
    },
    components: {
        Loading,
    },
    computed: {
        pullDownInitTop() {
            return 30 * this.dpr
        }
    },
    methods: {
        _initList() { // 供外部调用
            this.hasFinishInfinite = false;
            this._computeScrollerHeight();
        },
        _initScroller() { // 初始化滚动条
            if (!this.$refs.scroller) {
                return;
            }
            let options = {
                probeType: this.probeType,
                click: this.click,
                // preventDefault: false,
                eventPassthrough: 'horizontal'
            }
            if(this.pullDownRefresh) {
                options.pullDownRefresh = {
                    threshold: this.pullDownInitTop, 
                    stop: this.pullDownInitTop 
                }
            }
            if(this.pullUpLoad) {
                options.pullUpLoad = {
                    threshold: 0
                }
            }
            
            // 控制list最小高内容不满也可以上拉下拉
            if (this.$refs.scrollerContent && (this.pullDownRefresh || this.pullUpLoad)) {
                this.$refs.scrollerContent.style.minHeight = `${getRect(this.$refs.scroller).height + 1}px`
            }

            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.scroller, options);
            
            if (this.listenScroll) { // 滚动监听
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }

            if (this.listenScrollEnd) { // 滚动停止监听
                this.scroll.on('scrollEnd', (pos) => {
                    this.$emit('scroll-end', pos)
                })
            }
            if (this.listenBeforeScroll) { // 滚动开始监听
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScrollStart')
                })

                this.scroll.on('scrollStart', () => {
                    this.$emit('scroll-start')
                })
            }

            if(this.pullDownRefresh) { // 初始化下拉刷新
                this._initPullDownRefresh()
            }
            if(this.pullUpLoad) { // 初始化上拉加载
                this._initPullUpLoad()
            }
        },
        _initPullDownRefresh() { // 下拉刷新
            this.scroll.on('pullingDown', () => {
                this.isPullingDown = true
                this.$emit('refresh', () => {
                    this._forceUpdate(()=>{
                        this._triggerInfinite();
                    });
                })
            })
            this.scroll.on('scroll', (pos) => {
                let y = pos.y;
                if(pos.y <= this.pullDownInitTop) {
                    this.rotate = 180 - 180 * (this.pullDownInitTop-pos.y)/this.pullDownInitTop
                } else {
                    this.rotate = 180
                }
            })
        },
        _triggerInfinite() { // 触发加载
            let scrollerHeight = getRect(this.$refs.scroller).height;
            let scrollerListHeight = getRect(this.$refs.scrollerListContent).height;
            if(scrollerListHeight<scrollerHeight && !this.hasFinishInfinite) { // 当内容小于屏幕的时候继续加载
                this._computeScrollerHeight()
            }
        },
        _computeScrollerHeight() { // 递归上拉加载
            this.isPullingUp = true
            this.$emit('infinite', () => {
                this._forceUpdate(()=>{
                    this._triggerInfinite();
                });
            })
        },
        _initPullUpLoad() { // 上拉加载
            this.scroll.on('pullingUp', () => {
                if (!this.hasFinishInfinite) {
                    this.isPullingUp = true
                    this._computeScrollerHeight();
                } else {
                    this._forceUpdate();
                }
            })
        },
        _forceUpdate(call) { // 强制更新
            setTimeout(() => {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.isPullingDown = false
                    this.scroll.finishPullDown()
                    this.refresh()
                } else if (this.pullUpLoad && this.isPullingUp) {
                    this.isPullingUp = false;
                    this.scroll.finishPullUp()
                    this.refresh()
                } else {
                    this.scroll.finishPullDown()
                    this.scroll.finishPullUp()
                    this.refresh()
                }
                call && call()
            }, 20);
        },
        finishInfinite(type) { // 数据已加载完成
            this.hasFinishInfinite = !!type
        },
        disable() { // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable();
        },
        enable() { // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable();
        },
        refresh() { // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo() { // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() { // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    mounted() {
        let metaEl = document.querySelector('meta[name="viewport"]');
        let match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            let scale = parseFloat(match[1]);
            let dpr = parseInt(1 / scale);
            this.dpr = dpr;
        } 
        this.$nextTick(()=>{
            setTimeout(() => { // 保证在DOM渲染完毕后初始化better-scroll
                this._initScroller()
            }, 200)
        })
    }
}
</script>
<style lang="less" scoped>

</style>
