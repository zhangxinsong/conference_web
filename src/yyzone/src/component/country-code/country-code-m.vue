<template>
    <transition name="fade">
        <div class="yy-country-code-mobile" v-if="value">
            <div class="country-code-bg"
                @click="handleOnSelect"></div>
            <ul class="country-code-content">
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
    </transition>
</template>
<script>
import Locale from '../../locale/';
import code from './code'
export default {
    name: 'countryCodeMobile',
    props: {
        value: Boolean,
        onSelect: {
            type: Function,
            default: function(opt) {
                return false
            }
        },
    },
    data() {
        return {
            codes: code
        }
    },
    mixins: [Locale],
    methods: {
        handleOnSelect(opt, isEmit) {
            this.$emit('input', false)
            if(isEmit) {
                this.onSelect(opt)
            }
        }
    }
}
</script>
