<template>
    <div class="layout">
        <!-- <div class="header">
            <slot name="header"></slot>
        </div> -->
        <div class="body">
            <slot name="body"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
.layout {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
    }
    .body {
        position: absolute;
        left: 0;
        right: 0;
        // top: 50px;
        top: 0;
        bottom: 0;
        overflow-y: auto;
        background-color: #f3f3f3;
    }
}    
</style>