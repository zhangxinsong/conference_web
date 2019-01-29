<template>
    <fs-content-layout class="barrage">
        <template slot="title">
            {{lang.interactive_barrage}}

            <div class="fixed-menus">
                <Button :class="item.class" class="normal" v-for="(item,index) in fixedMenu" :key="index" @click="$eventbus.$emit(item.event)">
                    {{item.name}}
                </Button>
            </div>
        </template>
        <template slot="content">
            <div class="module">
                <router-view></router-view>
            </div>
        </template>
    </fs-content-layout>
</template>

<script>
import config from 'app_src/config/';
import { getUserInfo } from 'app_src/actions/user';
import form_mixin from 'app_src/mixin/form';
import lang from 'app_src/languages/';
import * as barrageActions from 'app_src/actions/barrage';
import * as bgActions from 'app_src/actions/background';

export default {
    props: ['id'],
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout'),
    },
    computed: {
        fixedMenu(){
            const menus = {
                barrageIndex: [{
                    class: 'confirm',
                    name: this.lang.barrage_screen_mirroring,
                    event: 'tab_barrage_projection'
                }],
            };
            return menus[this.$route.name] || [];
        }
    }
}
</script>

<style lang="less">
.barrage {
    
}
</style>

<style lang="less">
.barrage {
    .fixed-menus {
        position: absolute;
        top: 15px;
        right: 40px;

        button {
            margin-left: 10px;
        }
    }
   .tip {
        position: relative;
        top: -8px;
    }
}
</style>
