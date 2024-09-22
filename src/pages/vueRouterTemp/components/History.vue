<template>
    <div class="pages-div">
        <el-row>
            <el-col :span="24">History对象</el-col>
            <el-row class="border-style">
                <el-col :span="4">History介绍</el-col>
                <el-col :span="20">
                    History 对象包含用户（在浏览器窗口中）访问过的 URL。<br/>
                    History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。<br/>
                    注释：没有应用于 History 对象的公开标准，不过所有浏览器都支持该对象。</el-col>
                <el-col :span="24">History 对象方法</el-col>
                <el-col :span="4">back()</el-col>
                <el-col :span="20">加载 history 列表中的前一个 URL。</el-col>
                <el-col :span="4">forward()</el-col>
                <el-col :span="20">加载 history 列表中的下一个 URL。</el-col>
                <el-col :span="4">go()</el-col>
                <el-col :span="20">加载 history 列表中的某个具体页面。</el-col>
            </el-row>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
.pages-div {
  padding: 20px;
  .border-style {
    .el-col {
      padding: 5px;
      border: 1px solid #c9c4c4;
    }
  }
}
</style>
