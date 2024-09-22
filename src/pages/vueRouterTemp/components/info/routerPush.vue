<template>
    <div class="pages_padding_12">
        <h2>通过push方式实现路由跳转，以及获取其所携带的参数</h2>
        <div>
          {{routerParams.type}}携带的参数 <br/>
          创建时间：{{routerParams.time}}
        </div>
        <h2>总结</h2>
        <div>
          params方式传参：地址栏不会带有传入的参数，而且再次刷新页面后参数会丢失<br/>
          query方式传参：参数会拼接到地址栏中，刷新页面不会清掉参数
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      routerParams: {}
    };
  },
  created() {
    console.log("route:", this.$route.params);
    this.$route.params.type || this.$route.params.time
      ? (this.routerParams = this.$route.params)
      : (this.routerParams = this.$route.query);
    console.log("this.routerParams:", this.routerParams);
  }
};
</script>
<style lang="less" scoped>
</style>
