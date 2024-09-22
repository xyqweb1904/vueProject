<template>
    <div class="hash_div">
      <el-row class="title">
        <el-col :span="24">hash模块</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">网址：https://blog.csdn.net/lh134241/article/details/117257645</el-col>
      </el-row>
      <el-row>
        <el-col>
            <el-button @click="getBook('book')">读书</el-button>
            <el-button @click="getBook('bao')">看报</el-button>
            <el-button @click="getBook('dodo')">打豆豆</el-button>
        </el-col>
      </el-row>
      <el-row id="book" class=row_style>
        <el-col>我是读书</el-col>
      </el-row>
      <el-row id="bao" class=row_style>
        <el-col>我是看报</el-col>
      </el-row>
      <el-row id="dodo" class=row_style>
        <el-col>我是打豆豆</el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getBook(id) {
      let div_top = document.getElementById(id).offsetTop;
      console.log("div_top：", div_top);

      window.scrollTo({ top: div_top - 100, behavior: "smooth" });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.hash_div {
  padding: 5px;
  .title {
    margin-bottom: 10px;
    font-size: 24px;
  }
  .row_style {
    background: #fff;
    padding: 20px;
    margin: 5px;
    border-radius: 8px;
    height: 300px;
  }
}
</style>
