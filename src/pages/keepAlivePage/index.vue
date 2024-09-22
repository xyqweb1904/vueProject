<template>
    <div>keepAlivePage
        <div class="pages_padding_12">
            <h3 class="margin_bottom_12">keep-alive组件使用</h3>
            <router-link to="./pages1">首页</router-link>
            <router-link to="./pages2">用户</router-link>
            <keep-alive>
                <router-view/>
            </keep-alive>
            <div class="dispFiex">
                <div class="div_conter">123</div>
            </div>
        </div>
    </div>
</template>
<script>
import pages1 from './components/pages1'
import pages2 from './components/pages2'
export default {
  data() {
    return {}
  },
  components: {
    pages1,
    pages2
  },
  created() {
    console.log('用户组件创建')
  },
  destroyed() {
    console.log('用户组件销毁')
  }
}
</script>
<style lang="less">
.dispFiex {
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .div_conter {
    display: inline-block;
    margin: 12px 10px;
    padding: 10px;
    border: 1px solid #f00;
  }
}
</style>