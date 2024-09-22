<template>
    <div>
        <ul>
            <li>
                什么是路由：<br/>
                    1、一个路由就是一组映射关系（key-value）<br/>
                    2、key为路径，value可能是function或component
            </li>
            <li>
                路由的分类：<br/>
                    1、后端路由<br/>
                    （1）理解：value是function，用于处理客户端提交的请求。<br/>
                    （2）工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据。<br/>
                    2、前端路由<br/>
                    （1）理解：value是component，用于展示页面内容。<br/>
                    （2）工作过程：当浏览器的路径改变时，对应的组件就会显示。
            </li>
            <li>

            </li>
            <li>
                <div>
                    <h3>router-link方式实现路由跳转</h3>
                    <!-- 1.不带参数 -->
                    <router-link to="/rountLink">router-link方式</router-link>
                    <!-- 2.带参数 -->
                    <router-link to="/rountLink?pagesName=vueRouterInfo&time=2022/07/21">router-link方式-带参数</router-link>
                    <router-link :to="{name: 'rountLink', query: {item: JSON.stringify(routerObj)}}">router-link方式-带参数-传对象</router-link>
                </div>
                <div>
                    <h3>push方式实现路由跳转</h3>
                    <el-button @click="notParamsRouter">不带参-push</el-button>
                    <el-button @click="withParamsRouter">带参数-params方式传参</el-button>
                    <el-button @click="notQueryRouter">不带参数-query方式传参</el-button>
                    <el-button @click="withQueryRouter">带参数-query方式传参</el-button>
                </div>
                <div>
                    <!-- <el-button></el-button> -->
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      routerObj: {
        pagesName: "vueRouterInfo",
        time: "2022/07/25"
      }
    };
  },
  methods: {
    notParamsRouter() {
      this.$router.push("/routerPush");
    },
    withParamsRouter() {
      // name  别名方式跳转 -- 只能用params方式封装参数
      this.$router.push({
        name: "routerPush",
        params: { type: "params方式", time: "2022/07/25" }
      });
      // console.log(this.$router);
    },
    notQueryRouter() {
      // path方式跳转
      this.$router.push({
        path: "routerPush"
      });
    },
    withQueryRouter() {
      this.$router.push({
        path: "routerPush",
        query: { type: "query方式", time: "2022/07/25" }
      });
    }
  }
};
</script>