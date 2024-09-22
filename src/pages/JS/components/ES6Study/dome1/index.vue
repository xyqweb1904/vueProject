<template>
    <div>ES6</div>
</template>
<script>
export default {
  data() {
    return {
      zfcFunLog: false,
      regExpFunLog: true
    }
  },
  created() {
    // 解构
    this.jgFun()
    // 遍历map结构
    this.mapFun()
    // 遍历字符串
    this.zfcFun()
    // 正则表达式
    this.regulaFun()
  },
  methods: {
    jgFun() {
      let [a, b] = [1, 2, 3]
      //   console.log('a:', a)
      //   console.log('b:', b)
      let [c, d] = [3, a + b]
      // console.log('d:', d)
      // 字符串解构
      let [z, f] = 'hello'
      //   console.log(z, f)
      let x = 1
      let y = 2
      // 交换赋值
      ;[x, y] = [y, x]
      //   console.log('x:', x)
      //   console.log('y:', y)
    },
    mapFun() {
      const map = new Map()
      map.set('小明', '18')
      map.set('小红', '15')
      //   console.log('map:', map)
      for (let [key, value] of map) {
        // console.log(`${key}今年${value}岁了！`)
      }
    },
    zfcFun() {
      let str = 'hello'
      for (let i of str) {
        this.zfcFunLog ? console.log('i:', i) : ''
      }
      if (this.zfcFunLog) {
        console.log(`模板字符串中可以调用函数，如${this.textFun('Y')}`)
      }
    },
    textFun(type) {
      let text = type == 'Y' ? '哈哈哈' : '嘻嘻嘻'
      return text
    },
    regulaFun() {
      // RegExp 构造函数
      let str = 'hello word'
      let reg = new RegExp(str, 'i')
      this.regulaFun ? console.log('reg:', reg) : '' // /hello word/i
      let reg2 = new RegExp(/hello word/i)
      this.regulaFun ? console.log('reg2:', reg2) : ''
    }
  }
}
</script>

