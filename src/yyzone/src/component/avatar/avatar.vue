<template>
    <div class="yy-avatar" 
        @mouseover="onHover($event, {
            name: name || '',
            memberId: memberId || ''
        })"
        @click="onClick($event, {
            name: name  || '',
            memberId: memberId || ''
        })"
        :style="{
            width: size
        }">
        <div class="avatar-info">
            <span v-if="isDisplayName" 
                class="avatar-info-col path">
                <img 
                    :src="path"
                    @error="handleOnError">
            </span>
            <span v-else 
                :style="{
                    backgroundColor: getColor()
                }"
                class="avatar-info-col name">
                <i 
                    :style="{
                        fontSize: fontSize
                    }">
                    <slot name="icon">
                        {{formatName}}
                    </slot>
                </i>
            </span>
        </div>
    </div>
</template>
<script>
/** nizhja 2018/08/21
 * @size 尺寸 等宽等高
 * @path 人员图片地址
 * @name 人员名称
 * @defaultPath 人员头像默认地址
 * @displayIcon 是否显示Icon 显示icon不显示人员图片、人员名称
 * :on-hover 鼠标经过事件
 * :on-click 鼠标点击事件
*/
import getColor from '../../utils/get-color'
export default {
    name: 'avatar',
    props: {
        size: {
            type: String,
            default: '64px'
        },
        fontSize: {
            type: String,
            default: '14px'
        },
        path: {
            type: String
        },
        name: {
            type: String,
            required: true
        }, 
        memberId: {
            type: String | Number,
        },
        defaultPath: {
            type: String
        },
        displayIcon: { 
            type: Boolean,
            default: false
        },
        onHover: {
            type: Function,
            default: function() {
                return false
            }
        },
        onClick: {
            type: Function,
            default: function() {
                return false
            }
        }
    },
    data() {
        return {
            loadError: false
        }
    },
    computed: {
        isDisplayName() { // 当path中含有default字段的时候不使用默认图片
            if(this.displayIcon) {
                return true
            }
            if(!this.loadError || this.path.indexOf('default_avatar') < 0) {
                return false
            }
            return true
        },
        formatName: function() {
            return /[\u4e00-\u9fa5]/.test(this.name)
                  ? this.name.substr(-2)
                  : this.name.substr(0, 2);
        }
    },
    methods: {
        handleOnError() {
            this.loadError = true
        }, 
        getColor() {
            return getColor(this.name)
        }
    }
}
</script>

