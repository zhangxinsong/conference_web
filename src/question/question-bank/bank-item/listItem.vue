<template>
    <div class="list-item">
        <div class="content" :style="{opacity: data.questionBlankDO.enable ? 1 : 0.5 }">
            <div>
                <p>{{data.questionBlankDO.name}}</p> 
            </div>
            <div class="time">
                <p>描述：{{data.questionBlankDO.description}}</p><br>
                <p>单选数量： {{data.singleCount}}</p><br>
                <p>多选数量： {{data.multipleCount}}</p>
            </div>
        </div>
        <div class="cover">
            <i-button type="primary" long @click="onEdit">编辑</i-button>
            <i-button type="primary" long class="edit" @click="onQuestion">题目</i-button>
            <i-button type="primary" long class="edit" :class="data.questionBlankDO.enable ? 'disable' : null" @click="onEnable">{{ data.questionBlankDO.enable ? "禁用" : "启用"}}</i-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        onEdit(){
            this.$emit('onEdit',this.data.questionBlankDO);
        },
        onQuestion(){
            this.$router.push({
                path: '/question/questionList',
                query: {id: this.data.questionBlankDO.id}
            });
        },
        onEnable(){
            this.$emit('onEnable',this.data.questionBlankDO);
        }
    }
}
</script>
<style lang="less" scoped>
.list-item {   
    padding: 15px 15px 20px 18px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    position: relative;
    width: 100%;
    height: 100%;
    .cover {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background:rgba(255,255,255,0.8);
        box-shadow:0px 4px 8px 0px rgba(41,42,45,0.16);
        border-radius: 4px;
        padding: 8px 60px; 
    }
    .content{
        width: 100%;
        height: 100%;
        p{
            display: inline;
            font-size: 14px;
        }
        .status {
            font-size: 12px;
            height: 20px;
            padding: 2px 5px;
            background: #F3F3F3;
            border-radius:2px;
            text-align: center;
            float: right;
        }
        .time{
            margin-top: 10px;
            color: rgb(102, 101, 101);
        }
    }
    &:hover {
        .cover {
            display: block;
        }
    }
    button {
        height:30px;
        text-align: center;
        color:#E14C46;
        border: 1px solid #E14C46;
        background-color: #ffffff;
        border-radius: 3px;
        margin-top: 4px;
        &:hover {
            background-color: #E14C46;
            color: #ffffff;
        }
        &.disable {
            border: 1px solid #f3f3f3;
            background: #f3f3f3;
            &:hover{
                color: black;
            }
        }
    }
}
</style>
