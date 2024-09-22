1.安转vuex依赖包
    npm install vuex --sava
2.导入vuex包
    import vuex from 'vuex'
3.创建store对象
    const state = new Vuex.Store({
        // state 中存放的是全局共享数据
        state: {
            count: 0
        }
    })
4.将state挂载到vue实例中
    new Vue({
        el: "#app",
        render: => h(app),
        router,
        // 将创建的共享数据对象state挂载到vue实例中
        // 所有组件就可以直接从state中获取全局的数据了
        state
    })
5.Vuex核心概念
    5.1 state：提供唯一的公共数据源，所有共享的数据都要统一放到store的state中进行存储
        const store = Vuex.Store({
            state: {
                count: 0
            },
        })
        组件中访问state中数据的第一种方式：
            this.$store.state.count
        组件中访问state中数据的第二种方式：
            1.从vuex中按需导入mapState函数
                import {mapState} from 'vuex
                通过导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性
                computed： {
                    ...mapState(['count])
                }
    5.2 Mutation
        Mutation用于变更state中的数据
        1.只能通过Mutation变更state中的数据，不可以直接操作store中的数据（不建议）
        2.通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化
        定义mutation
            const store = Vuex.Store({
                state: {
                    count: 0
                },
                mutation: {
                    add(state, step) {
                        // state: 就是上面那个state的对象
                        // step：外部传入的参数
                        // 变更状态
                        state.count++
                    }
                }
            })
        组件中使用Mutation
            1.触发Mutation的第一种方式
                methods: {
                    handlel() {
                        this.$store.commit('add', 3)
                    }
                }
            2.触发Mutation的第二种方式
               2.1 从vuex中按需导入mapMutations函数
                import { mapMutations } from 'vuex
                通过导入的mapMutations函数，将需要的Mutation函数映射为当前组件的methods方法
                methods: {
                    ...mapMutations(['add],'addN')
                }
    5.3 Action
        Action用于处理异步任务
        必须通过Action处理异步任务，而不能使用mutation处理。但在Action中还是要通过触发mutation的方式间接变更数据
        state: {
                count: 0
            },
            mutation: {
                add(state, step) {
                    // state: 就是上面那个state的对象
                    // step：外部传入的参数
                    // 变更状态
                    state.count++
                }
            },
            actions: {
                addAsync(context, step) {
                    // context: 就是store实例
                    setTimeout(() => {
                        context.commit('add', step)
                    }, 1000)
                }
            }
        })
        组件中调用，触发action
        methods: {
            触发actions的第一种方式:
                handle() {
                    this.$store.dispatch('addAsync', step)
                }
            触发actions的第二种方式:
                从vuex中按需导入mapActions函数
                    import { mapActions } from 'vuex
                将需要的actions函数映射为当前组件的methods方法
                    methods: {
                        ...mapActioms(['addAsunc', 'addNAsunc'])
                    }
        }
    5.4 Getter
        用于store中的数据进行加工处理形成新数据
        1. 对store中的数据进行加工处理形成新数据，类似Vue的计算属性
        2.store中数据发生变化，Getter的数据也会发生变化
        定义Getter
            const store = Vuex.Store({
                state: {
                    count: 0
                },
                getters: {
                    showNum: state => {
                        return '当前最新的数量是['+ state.count +']'
                    }
                }
            })
        组件中使用Getter的第一种方式
            this.$store.getter.名称
        组件中使用Getter的第二种方式
            import mapGetters from 'vuex'
            computed: {
                ...mapGetters(['showNum'])
            }

    {
        "semi": false,
        "singleQuote": true,
    }