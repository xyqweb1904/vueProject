<template>
    <div class="pages-div">
      <div id="div1">
        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
        <a href="https://www.wangeditor.com/doc/">网址：https://www.wangeditor.com/doc/</a>
      </div>
    </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      jsonType: [
        {
          tag: "p",
          attrs: [],
          children: [
            "欢迎使用 ",
            {
              tag: "b",
              attrs: [],
              children: ["wangEditor"]
            },
            " 富文本编辑器"
          ]
        },
        {
          tag: "p",
          attrs: [],
          children: [
            {
              tag: "img",
              attrs: [
                { name: "src", value: "xxx.png" },
                { name: "style", value: "max-width:100%;" }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    let then = this;
    console.log(document.getElementById("div1"));
    const editor = new E(document.getElementById("div1"));
    // 选中的内容区域
    editor.config.onSelectionChange = function(newSelection) {
      console.log("onSelectionChange", newSelection);
      /**
      {
        text:'wangeditor', // 当前选择文本
        html: '<p>wangeditor</p>', // 当前选中的html
        selection: selection, // 原生selection对象
      }
    */
    };
    // 获取焦点区域
    editor.config.onblur = function(newHtml) {
      console.log("onblur", newHtml); // 获取最新的 html 内容
    };
    // 失去焦点
    editor.config.onfocus = function(newHtml) {
      console.log("onfocus", newHtml); // 获取最新的 html 内容
      let text = editor.txt.text();
      console.log("jsonType:", then.jsonType);

      let json = editor.txt.setJSON([...then.jsonType]);
      console.log("text:", text);
      console.log("json:", json);
    };

    editor.create();
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.pages-div {
  padding: 20px;
}
</style>
