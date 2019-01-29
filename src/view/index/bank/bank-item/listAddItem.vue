<template>
    <div class="add">
        <i class="icon-add"></i>
        <span>
            <slot></slot>
        </span>
        <div class="cover"></div>
    </div>
</template>

<style lang="less" scoped>
.add {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 30px;
    text-align: center;
    &:hover {
        box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);
        .cover {
            display: block;
            cursor: pointer;
            z-index: 1;
        }
    }
    .cover {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .1);
        opacity: .1;
    }
    & > * {
        display: block;
        text-align: center;
    }
    :nth-child(1){
        font-size: 24px;
    }
    :nth-child(2){
        font-size: 12px;
        margin-top: 5px;
        color: #888888;
    }
}
</style>
