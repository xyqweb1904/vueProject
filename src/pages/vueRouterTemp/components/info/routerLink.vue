<template>
    <div class="pages_padding_12">
        <div>rount-link页面</div>
        <div>所带参数【拼接字符串方式】：{{parmas}} {{time}}</div>
        <div>所带参数【对象方式】：{{routerObj.pagesName}} {{routerObj.time}}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      parmas: "",
      time: "",
      routerObj: {}
    };
  },
  created() {
    console.log("router1:", this.$route.query.pagesName);
    console.log("router1-2:", this.$route.params.pagesName);
    console.log("router2:", this.$route.query.time);
    console.log("router3:", this.$route.query.item);

    this.time = this.$route.query.time;
    this.routerObj = this.$route.query.item
      ? JSON.parse(decodeURIComponent(this.$route.query.item))
      : {};
    console.log("routerObj:", this.routerObj);
  }
};
</script>
