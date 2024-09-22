<template>
    <div>
        <div>
          <hr>
            <el-button @click="clearbao">var和let区别</el-button>
            <hr>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    clearbao() {
      let arr = [],
        arr2 = [],
        arr3 = []
      /*
        第一个for循环是用var定义i的 i也就是全局变量，i、值每一次循环就自增，数组里面的每一个i都指向同一个全局的i，这样运行时，i值都是最后一个循环的i值
        第二个for循环是用let定义i的 声明的变量仅在块级作用域内有效，最后输出的结果是3
      */
      for (var i = 0; i < 10; i++) {
        arr[i] = function() {
          console.log(`第${i}个函数`)
        }
      }
      for (let i = 0; i < 10; i++) {
        arr2[i] = function() {
          console.log(`第${i}个函数`)
        }
      }
      arr[3]()
      arr2[3]()
      // 为了解决第一个for循环中的问题(i为最后一个循环值)
      for (var i = 0; i < 10; i++) {
        ;(i => {
          arr3.push(function() {
            console.log(`这是第${i}个函数`)
          })
        })(i)
      }
      arr3[3]()
    },
    
  }
}
</script>

