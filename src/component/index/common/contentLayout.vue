<template>
    <div class="container">
        <div class="title txt-elips">
            <slot name="title"></slot>
        </div>

        <div class="content">
            <slot name="content"></slot>
        </div>

        <slot></slot>
    </div>
</template>

<style scoped lang="less">
.container {
    .title {
        padding: 15px 40px 16px;
        line-height:28px;
        box-shadow:0px 1px 0px 0px rgba(245,245,245,1);
        background-color: #ffffff;
        border-bottom:1px solid #E9E9E9;
        position: relative;
    }
    .content {
        position: absolute;
        top: 60px;
        right: 0;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #ffffff;
    }
}
</style>

