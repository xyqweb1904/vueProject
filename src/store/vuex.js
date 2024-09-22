import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        name: '张三',
        nametwo: '李四',
        number: 0,
        list: [
            { id: 1, name: '111' },
            { id: 2, name: '222' },
            { id: 3, name: '333' }
        ]
    },
    // 获取state中的数据
    getters: {
        getMessage(state) {
            console.log("state:", state);
            return `hello ${state.name}`
        }
    },
    /*
        修改state中的数据
        注意： Mutations里面的函数必须是同步操作，不能包含异步操作！
    */ 
    mutations: {
    setName(state, payload) {
            // payload：官方建议传过来一个对象，如果传过来的是一个变量，那么改变量名称要与实参保持一致
            console.log("ppayload:", payload);
            state.name = payload.name
        }
    }
})
export default store
// export default createdStore({
//     // 基本数据
//     state: {
//         pagesTitle: "我是vuex"
//     },
//     //保存受state影响的数据
//     getters: {

//     },
//     // 在mutations中写方法修改state中的值  保存修改数据的方法
//     mutations: {
//         pagesTitle(updataValue, pagesTitle) {
//             state.pagesTitle = pagesTitle
//         }
//     },
//     actions: {
//         // 通过actions触发mutations中的方法
//         dataOne(context, data) {
//             // 第一个pagesTitle：是mutations定义的方法，第二个mutations：是页面传来的参数
//             context.commit('pagesTitle', pagesTitle)
//         }
//     },
//     modules: {

//     }
// })