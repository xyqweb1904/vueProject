<template>
    <div>我是首页
        <input type="text"/>
    </div>
    
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log('首页被创建')
  },
  activated() {
    console.log('切换回首页组件')
  },
  destroyed() {
    console.log('首页被销毁')
  }
}
</script>
