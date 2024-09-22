<template>
    <div>
        <h3>当前最新的count值为：{{count}}</h3>
        <h3>当前最新的count值为：【{{showNum}}】</h3>
        <button @click="btnHandler1">-1</button>
        <button @click="btnHandler2">-n</button>
        <button @click="btnHandler3">异步-1</button>
        <button @click="subAsync">异步-1/第二种</button>
        <button @click="btnHandler4">异步-n</button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNAsync']),
    btnHandler1() {
      this.sub()
    },
    btnHandler2() {
      this.subN(2)
    },
    btnHandler3() {
      this.subAsync()
    },
    btnHandler4() {
      this.subNAsync(2)
    }
  }
}
</script>
