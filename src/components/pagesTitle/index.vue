<template>
    <div class="pages-div">
        <div class="title" ref="bgColorRef">
          {{title}}
          <div v-if="subTitle" v-html="subTitle" class="sub-title"></div>
          <el-button class="button-style" v-if="buttonShow" @click="iframeShowClick">{{buttonName}}</el-button>
        </div>
        <iframe v-if="iframeShow" src="https://www.somd5.com/" width="100%" height="500px" frameborder="2px" scrolling="yes"></iframe>
    </div>
</template>
<script>
export default {
  name: "PagesTitle",
  data() {
    return {
      iframeShow: false,
      buttonName: "iframe组件引入"
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    buttonShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 子组件一旦被修改，会导致父组件传过来的样式bakeground发生改变
    this.$emit("pagesTitleClick");
  },
  methods: {
    addClick() {
      this.add = this.add + 1;
      this.$forceUpdate();
    },
    info() {
      console.log("--------------");
    },
    iframeShowClick() {
      console.log("asdasdasd");
      this.iframeShow = !this.iframeShow;
      this.iframeShow
        ? (this.buttonName = "关闭")
        : (this.buttonName = "iframe组件引入");
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/index.less");
</style>

