<template>
    <div class="yy-country-code-web">
        <div class="yy-country-code-el" 
            ref="countryCodeEl" 
            v-clickoutside="handleClose"
            @click="handleClick">
            <slot></slot>
        </div>
        <ul class="country-code-content" 
            :style="{
                top: top
            }"
            v-if="isDisplayCountryCode">
            <li class="clearfix"
                v-for="(code, country) in codes" 
                @click="handleOnSelect({
                    country: country,
                    code: code,
                    value: t(`country.${country}`)
                }, true)"
                :key="country">
                <span class="country pull-left">
                    {{t(`country.${country}`)}}
                </span>
                <span class="code pull-right">
                    {{code}}
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
import Locale from '../../locale/'
import code from './code'
import clickoutside from '../../directives/clickoutside';

export default {
    name: 'countryCodeWeb',
    props: {
        onSelect: {
            type: Function,
            default: function(opt) {
                return false
            }
        },
    },
    directives: {
        clickoutside
    },
    data() {
        return {
            codes: code,
            isDisplayCountryCode: false,
            top: 0
        }
    },
    mixins: [Locale],
    methods: {
        handleOnSelect(opt, isEmit) {
            this.handleClose()
            if(isEmit) {
                this.onSelect(opt)
            }
        },
        handleClick() {
            this.isDisplayCountryCode = !this.isDisplayCountryCode
        },
        handleClose() {
            this.isDisplayCountryCode = false
        }
    },
    mounted () {
        this.top = this.$refs.countryCodeEl.offsetHeight + 'px'
    }
}
</script>
