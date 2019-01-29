import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    memberId: '',
    userName: ''
}

const getters = {
    getMemberId(state){
        return state.memberId;
    },
    getUesrName(state){
        return state.userName;
    }
}

const mutations = {
    changeMemberId(state,value){
        state.memberId = value;
    },
    changUserName(state,value){
        state.userName = value;
    }
}

const actions = {
    memberId(context,value){
        context.commit('changeMemberId',value);
    },
    userName(context,value){
        context.commit('changUserName',value);
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
 
export default store;