import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        // 只有mutations才有权利操作state中的数据
        add(state) {
            state.count++
        },
        addN(state, step) {
            state.count += step
        },
        sub(state) {
            state.count--
        },
        subN(state, step) {
            state.count -= step
        },
        addY(state) {
            // 不要在mutations中执行异步操作,不建议这样处理
            console.log("state:", state);
            setTimeout(() => {
                state.count++
            }, 10000)
        },
    },
    actions: {
        addAsync(context) {
            // context:state实例对象
            // 在actions中，不能直接修改state中的数据，必须通过cotext.commit()触发某个mutation才行
            console.log("context:", context);

            setTimeout(() => {
                context.commit('add')
            }, 1000)
        },
        addNAsync(context, step) {
            setTimeout(() => {
                context.commit('addN', step)
            }, 1000)
        },
        subAsync(context) {
            setTimeout(() => {
                context.commit('sub')
            }, 1000)
        },
        subNAsync(context, step) {
            setTimeout(() => {
                context.commit('subN', step)
            }, 1000)
        }
    },
    getters: {
        showNum(state) {
            return `当前最新的数据是：${state.count}`
        }
    }
})