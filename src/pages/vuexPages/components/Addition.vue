<template>
    <div>
        <h3>1.当前最新的count值为：{{$store.state.count}}</h3>
        <h3>2.当前最新的count值为：【{{$store.getters.showNum}}】</h3>
        <button @click="btnHandler1">+1</button>
        <button @click="btnHandler2">+n</button>
        <button @click="btnHandler3">延时1秒+1</button>
        <button @click="btnHandler4">延时1秒+n</button>
        <button @click="getState">获取数据</button>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    btnHandler1() {
      // this.$store.state.count++  // 这种方式虽然能够实现操作state中的数据，当是非常不建议，因为在项目中，使用vuex频率非常高，这样写，不利于维护。也不晓得具体是那些页面修改的值
      // commit:调用某个Mutation中的某个函数
      this.$store.commit('add')
    },
    btnHandler2() {
      this.$store.commit('addN', 2)
    },
    // 异步处理
    btnHandler3() {
      //   this.$store.commit('addY')
      this.$store.dispatch('addAsync')
    },
    btnHandler4() {
      this.$store.dispatch('addNAsync', 2)
    },
    getState() {
      console.log('count:', this.$store.state.count)
    }
  }
}
</script>
