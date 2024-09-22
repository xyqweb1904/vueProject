<template>
  <div class="canvas-pages">
    <div class="canvas-title">
      <h2>截图软件【canvas】</h2>
    </div>
    <div class="canvas-area">
      <div class="canvas-button">
        <table border="1px" class="canvas-table">
          <tr>
            <td>
              <div class="img-button button-value">
                <input class="button-file" type="file" @change="tirggerFile($event)" alt="不支持此类文件上传" name="" id=""/>
                <span class="button-title">上传图片</span>
              </div>
            </td>
            <td>
              <div @click="getImg" class="img-button">截取图片</div>
            </td>
          </tr>
          <tr>
            <td class="get-img-info">{{imgName}}</td>
            <td>
              <img src=""/>
            </td>
          </tr>
        </table>
      </div>
      <div class="canvas-show-img">
        <div class="upload-img" id="superMap">
          <img :src="uploadImgSrc" class="img-style"/>
        </div>
        <div class="cutout-img">
          <img :src="imgSrc" alt="" srcset="" class="img-style"/>
        </div>
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "Screenshot",
  data() {
    return {
      imgSrc: "",
      uploadImgSrc: "",
      imgName: "请选择您需要上传的图片"
    };
  },
  mounted() {
    let url = require("./img/await.jpg");
    console.log("url:", url);
    this.getBase64(url);
  },
  methods: {
    getBase64(url) {
      //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
      let Img = new Image();
      let base64_string = "";
      Img.src = url;
      Img.onload = () => {
        //要先确保图片完整获取到，这是个异步事件
        let canvas = document.createElement("canvas"); //创建canvas元素
        let width = Img.width; //确保canvas的尺寸和图片一样
        let height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        base64_string = canvas.toDataURL("image/png"); //转换图片为base64
        console.log("base64_string:", base64_string);
        this.uploadImgSrc = base64_string;
      };
    },
    // 截取指定位置区域的图像
    getImg() {
      setTimeout(() => {
        html2canvas(document.getElementById("superMap"), {
          // superMap：需要截屏的区域
          backgroundColor: null, // 画出来的图片有白色的边框，不要可设置背景色为透明色（null）
          useCORS: true, // 支持图片跨域
          scale: 1 // 设置放大的倍数
        }).then(canvas => {
          let img = new Image();
          //  图片格式转换base64
          img.src = canvas.toDataURL("image/jpg");
          this.imgSrc = img.src;
        });
      }, 500);
    },
    // 上传图片
    tirggerFile(event) {
      console.log(event.target.files);
      let fileList = event.target.files[0];
      // 判断文件类型
      let fileType = [
        "gif",
        "jpeg",
        "psd",
        "png",
        "tiff",
        "ai",
        "eps",
        "svg",
        "raw",
        "pdf",
        "bmp"
      ];
      let typeString = fileList.type;
      let postfix = typeString.substr(
        typeString.indexOf("/") + 1,
        typeString.length
      );
      console.log(postfix);
      // 图片类型
      if (fileType.includes(postfix)) {
        this.imgName = fileList.name;
        //创建读取文件的对象
        let reader = new FileReader();
        let _this = this;
        reader.onload = function(res) {
          console.log("res:", res.target.result);
          _this.uploadImgSrc = res.target.result;
        };
        //正式读取文件
        reader.readAsDataURL(fileList);
      } else {
        // 文本类型
      }
    }
    /*
      梳理了其大致的思路：
        递归取出目标模版的所有DOM节点，填充到一个rederList，并附加是否为顶层元素/包含内容的容器 等信息
        通过z-index ,postion, float等css属性和元素的层级信息将rederList排序，计算出一个canvas的renderQueue
        遍历renderQueue，将css样式转为setFillStyle可识别的参数，依据nodeType调用相对应canvas方法，如文本则调用fillText，图片drawImage，设置背景色的div调用fillRect等
        将画好的canvas填充进页面
        https://blog.csdn.net/weixin_41884808/article/details/118306564
    */
  }
};
</script>
<style lang="less">
@import url("./style/canvasType.less");
</style>
