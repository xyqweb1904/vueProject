<template>
  <div class="grandpa_moduel_div pages_padding_12">
    <el-row>
      <el-col :span="24">grandpa组件</el-col>
    </el-row>
    <el-row class="rowBgcolor">
      <el-col :span="12" class="border_buttom">路由传参 传过来的值<br/> 通过this.$route.params传来的值</el-col>
      <el-col :span="12" class="border_buttom">从index页面中：{{parameter}}</el-col>
    </el-row>
    <el-row class="rowBgcolor">
      <el-col :span="12" class="border_buttom">路由传参 传过来的值<br/> 通过this.$route.query传来的值</el-col>
      <el-col :span="12" class="border_buttom">从index页面中：{{parameter2}}</el-col>
    </el-row>
    <el-row class="rowBgcolor">
      <el-col :span="12" class="border_buttom">路由传参 传过来的值<br/> 通过router-link传来的值</el-col>
      <el-col :span="12" class="border_buttom">从index页面中：{{parameter3}}</el-col>
    </el-row>
    <el-row class="rowBgcolor">
      <el-col :span="12" class="border_buttom">
        <el-button @click="back">返回</el-button>
      </el-col>
    </el-row>
  </div>  
</template>
<script>
export default {
  data() {
    return {
      parameter: "",
      parameter2: "",
      parameter3: ""
    };
  },
  created() {
    this.parameter = this.$route.params.parameter;
    this.parameter3 = this.$route.query.parameter3;
    console.log("this.parameter3:", this.parameter3);

    this.parameter2 = this.$route.query.parameter;
  },
  methods: {
    back() {
      this.$router.replace({
        name: "vueRouter"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../css/grandpa_moduel.less");
</style>