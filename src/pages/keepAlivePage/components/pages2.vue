<template>
    <div>我是用户页
        <input type="text"/>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log('用户页被创建')
  },
  activated() {
    console.log('切换回用户组件')
  },
  destroyed() {
    console.log('用户页被销毁')
  }
}
</script>
