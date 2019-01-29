<template>
    <div ref="Editor" class="yy-editor">

    </div>
</template>
<script>
// import E from 'wangeditor'

export default {
    name: 'Editor',
    data() {
        return {
            editor: null
        }
    },
    props: {
        value: null,
        menus: {
            type: Array,
            default() {
                return [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'video',  // 插入视频
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ]
            }
        },
        onChange: {
            type: Function,
            default() {
                return false
            }
        }
    },
    methods: {
        createEditor() { // 创建编辑器
            const _this = this
            _this.editor = new E(_this.$refs.Editor)
            // 菜单设置
            _this.editor.customConfig.menus = _this.menus
            // html 即变化之后的内容
            _this.editor.customConfig.onchange = function (html) {
                _this.handleChange(html)
            }
            // 多语设置
            _this.editor.create()
            if(_this.value) {
                _this.editor.txt.html(_this.value)
            }
        },
        handleChange(html) {
            console.log(html)
        }
    },
    mounted () {
        this.createEditor()
        console.log(this.value)
    }
}
</script>

