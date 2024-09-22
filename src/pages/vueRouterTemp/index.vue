<template>
    <div class="router_div">
        <el-row>
            <el-col :span="24" class="border_buttom">
                vueRouter/路由介绍
            </el-col>
            <el-col :span="24" class="border_buttom">
                <el-row>
                    <el-col :span="24">路由传参/通过params方式</el-col>
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-input v-model="parameter"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <!-- <grandpa/> -->
                            <el-button @click="goGrandpa">给grandpa组件 路由传值</el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" class="border_buttom">
                <el-row>
                    <el-col :span="24">路由传参/通过query方式</el-col>
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-input v-model="parameter2"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <!-- <grandpa/> -->
                            <el-button @click="goGrandpa2">给grandpa组件 路由传值</el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" class="border_buttom">
                <el-row>
                    <el-col :span="24">路由传参/通过router-link方式</el-col>
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-input v-model="parameter3"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <!-- <grandpa/> -->
                            <router-link :to="{path:'/grandpa',query:{parameter3:parameter3}}">给grandpa组件 路由传值</router-link>
                            <!-- <el-button @click="goGrandpa3">给grandpa组件 路由传值</el-button> -->
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import grandpa from "./components/grandpa_moduel";
export default {
  data() {
    return {
      parameter: "",
      parameter2: "",
      parameter3: ""
    };
  },
  components: {
    grandpa
  },
  methods: {
    goGrandpa2() {
      this.$router.push({
        name: "grandpa",
        query: {
          parameter: this.parameter2
        }
      });
    },
    goGrandpa() {
      this.$router.push({
        name: "grandpa",
        params: {
          parameter: this.parameter
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/routers_vue.less");
</style>
