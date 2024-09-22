<template>
    <div class="pages_div">
        <div v-for="item in MenuData" :key="item.navRouter">
            <el-submenu :index="item.navRouter" v-if="item.children">
                <template class="i-public-style" :index="item.navId" slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.navName}}</span>
                </template>
                <el-menu-item-group>
                    <mentItem :MenuData="item.children"/>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item class="i-public-style" v-if="!item.children" :index="item.navRouter">
                <i :class="item.icon"></i>
                <span>{{item.navName}}</span>
            </el-menu-item>
        </div>
    </div>
</template>
<script>
export default {
  name: "mentItem",
  data() {
    return {};
  },
  props: {
    MenuData: {
      type: Array
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/mentItem.less");
</style>

