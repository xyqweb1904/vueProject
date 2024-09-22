<template>
    <div class="pages_div menu_index">
        <div class="content_div">
            <div class="catalogue">
                <el-menu
                    :default-active="this.$route.path"
                    router
                    :default-openeds="MenuData" >
                    <MenuItem :MenuData="MenuData"/>
                </el-menu>
            </div>
        </div>
        
    </div>
</template>
<script>
import MenuItem from "./menu_item";
export default {
  name: "menuIndex",
  data() {
    return {};
  },
  props: {
    MenuData: {
      type: Array,
      default: []
    }
  },
  components: {
    MenuItem
  },
  created() {
    console.log("MenuData:", this.MenuData);
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
};
</script>
<style lang="less" scoped>
@import url("./css/index.less");
</style>

