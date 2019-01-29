<template>
    <div class="loading">
        <Spin fix>
            <Icon type="ios-loading" :size="size" class="load-icon"></Icon>
            <p class="text">{{text}}</p>
        </Spin>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '正在加载...'
        },
        size: {
            type: Number,
            default: 20   
        }
    }
}
</script>

<style lang="less" scoped>
.loading {
    .load-icon{
        animation: ani-spin 1s linear infinite;
    }
    @keyframes ani-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .text {
        font-size: 14px;
        margin-top: 5px;
    }
}
</style>
