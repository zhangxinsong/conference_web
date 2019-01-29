<template>
    <Modal
        v-model="isShow"
        :closable="closable"
        :mask-closable="isMaskClosable"
        :loading="loading"
        :draggable="draggable"
        :mask="mask"
        :ok-text="ok_text"
        :cancel-text="cancel_text"
        :width="width"
        :styles="styles"
        :transition-names="transitionNames"
        :class-name="className"
        :footer-hide="isFooterHide"
        :class="['confirm-box']"
        @on-ok="onConfirm"
        @on-cancel="onCancel">
        <div class="container">
            <h6 class="title">
                {{title}}
            </h6>
            <div class="content txt-elips-mul2">
                {{content}}
            </div>
        </div>
        <div slot="footer" class="footer">
            <Button class="cancel" @click="onCancel">{{cancel_text || lang.cancel}}</Button>
            <Button type="primary" class="confirm" @click="onConfirm">{{ok_text || lang.confirm}}</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    data () {
        return {
            width: 370,
            isShow: true,
            closable: true,
            isMaskClosable: true,
            loading: false,
            draggable: true,
            isFooterHide: false,
            mask: true,
            title: '',
            content: '',
            ok_text: '',
            cancel_text: '',
            styles: {},
            className: '',
            transitionNames: [],
            transfer: false
        }
    },
    methods: {
        onConfirm(){},
        onCancel(){}
    }
}
</script>

<style lang="less">
.confirm-box {
    .ivu-modal-footer {
        border-top: none;
    }
}
</style>

<style lang="less" scoped>
.confirm-box {
    .container {
        padding: 20px 20px 0 20px;
        .title {
            font-size: 16px;
            line-height: 24px;
        }
    
        .content {
            line-height: 18px;
            color: #555555;
            max-height: 40px;
            margin-top: 10px;
        }
    }
}
</style>
