<template>
    <Modal
        class="projection-setting"
        v-model="isShow" 
        width="450"
        :draggable="true" 
        :title="lang.lucky_draw_screen_mirroring">
        <div class="content">
            <Row v-for="(item,index) in form" :key="index">
                <Col span="4">
                    <label :for="item.id">
                        {{item.label}}
                    </label>
                </Col>
                <Col span="20">
                    <Select v-if="item.type == 'select'" v-model="item.value" :style="item.style" @on-change="onPrizeChanged(item.value)">
                        <Option v-for="(option,i) in item.options" :key="i" :value="option.value">{{option.label}}</Option>
                    </Select>
                    <RadioGroup v-else-if="item.type == 'radio'" v-model="item.value">
                        <Radio v-for="(radio,i) in item.radios" :key="i" :label="radio.label">
                            {{radio.name}}
                        </Radio>
                    </RadioGroup>
                    <InputNumber v-else-if="item.type == 'number'" v-model="item.value" :min="minNum" :max="maxNum" :style="item.style"></InputNumber>
                </Col>
            </Row>

            <Row>
                <Col span="4">
                    <label>
                        {{lang.usage}}：
                    </label>
                </Col>
                <Col span="20">
                    {{lang.lucky_draw_tip}}
                </Col>
            </Row>
        </div>
        <div slot="footer" class="footer">
            <Button type="primary" :class="['confirm',{disable: !pass || !maxNum}]" @click="onConfirm">{{lang.lucky_draw_screen_mirroring}}</Button>
        </div>
    </Modal>
</template>

<script>
import config from 'app_src/config/';
import form_mixin from 'app_src/mixin/form';
import BaseList from 'app_src/utils/baseList';
import lang from 'app_src/languages/';
import * as prizeActions from 'app_src/actions/activity/prize';

export default {
    mixins: [form_mixin],
    props: ['value', 'id', 'activityId','lottery'],
    computed: {
        isShow: {
            get(){
                return !!this.value;
            },
            set(value){
                this.$emit('input', !!value);
            }
        },
    },
    watch: {
        isShow(value){
            if(value){
                this.getPrizes();
            }else{
                this.initForm();
                this.minNum = 0;
                this.maxNum = 0;
            }
        }
    },
    data () {
        return {
            prizes: new BaseList(),      
            minNum: 0,
            maxNum: 0,
            current: null
        }
    },
    methods: {
        onPrizeChanged(id){
            const prize = this.prizes.get(id);
            if(prize){
                this.$set(this, 'current', prize);
            }
            if(this.current){
                this.maxNum = Math.max((this.current.amount || 0) - (this.current.lotteryAmount || 0), 0);
                this.minNum = this.maxNum >= 1? 1:0;

                const number = this.cache.get('number');
                if(number){
                    number.value = Math.min(number.value || 0, this.maxNum);
                }
            }
            console.log(this.current, this.minNum, this.maxNum);
        },
        onConfirm(){
            this.getPrizes(()=>{
                console.log(this.current, this.minNum, this.maxNum);
                if(!this.maxNum){
                    this.alert_warning(this.lang.prize_exhausted);
                }
                if(this.pass && this.maxNum){
                    // this.checkToken(info =>{
                    //     let url = config['projection']['lottery'][(this.lottery && this.lottery['projection'] && this.lottery['projection']['projectionType'] == 'TURN_TABLE')? '2d':'3d'];
                    //     const query = {
                    //         activityId: this.activityId,
                    //         token: info.token,
                    //         amount: this.formData.number,
                    //         prizeId: this.formData.prize,
                    //         // scope: this.formData.scope,
                    //         env: config.env,
                    //         scope: this.lottery && this.lottery['scopeSetting'] && this.lottery['scopeSetting']['scope'] || 'SIGN_IN',
                    //         bg: this.lottery && this.lottery['projection'] && this.lottery['projection']['projectionBackground'] || '',
                    //         lang: lang.getCurrent().id
                    //     };
                    //     for(let x in query){
                    //         if(query.hasOwnProperty(x)){
                    //             url += `${/\?/.test(url)? '&':'?'}${x}=${query[x]}`;
                    //         }
                    //     }
                    //     const result = this.openExternal(url, '_blank');
                    //     if(!result){
                    //         this.messageBox.info(this.lang.please_first_allow);
                    //     }
                    // });
                }
            });
        },
        initForm(params){
            params = params || this.data;

            // this.cache.assign('scope',{
            //     id: 'scope',
            //     label: '抽奖范围：',
            //     type: 'radio',
            //     required: true,
            //     radios: [
            //         {
            //             name: '全部人员',
            //             label: 'ALL',
            //         },
            //         {
            //             name: '签到人员',
            //             label: 'SIGN_IN',
            //         },
            //     ],
            //     value: params && params['scope'] || 'SIGN_IN',
            // });

            this.cache.assign('prize', {
                id: 'prize',
                label: this.lang.select_prize+'：',
                type: 'select',
                required: true,
                placeholder: this.lang.please_select,
                options: [
                ],
                value: params && params['prize'] || '',
            });

            this.cache.assign('number',{
                id: 'number',
                label: this.lang.number_of_prizes+'：',
                type: 'number',
                required: true,
                value: params && params['number'] || 0,
                validate(value){
                    return value - 0;
                },
                maxlength: 10,
                style: {
                    width: '100%'
                }
            });
        },  
        loadData(callback){
            callback && callback({});
        },
        getPrizes(callback){
            const _this = this;
            prizeActions.getList({
                activityId: this.activityId,
                success: res =>{
                    _this.prizes.clear();
                    if(Array.isArray(res)){
                        const prize = _this.cache.get('prize');
                        if(prize){
                            prize.options.length = 0;
                            res.forEach(item => {
                                item.id = item.id || item.prizeId;
                                prize.options.push({
                                    value: item.id,
                                    label: item.prize 
                                });
                                _this.prizes.set(item.id || item.prizeId, item);
                            });
                        }
                    }
                    if(_this.current){
                        _this.onPrizeChanged(_this.current.id);
                    }
                    callback && callback();
                }
            });
        }
    }
}
</script>

<style lang="less">
.projection-setting {
    text-align: left;
    .ivu-select  {
        text-align: left;
    }
    color: #555555;
    .ivu-modal-footer {
        border-top: none;
    }
    .ivu-row {
        &:not(:first-child) {
            margin-top: 20px;
        }
        .ivu-col:first-child {
            line-height: 30px;
        }
    }
}
</style>
