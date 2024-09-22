<template>
  <section class="signature">
    <div class="signatureBox">
        <div class="canvasBox" ref="canvasHW">
            <canvas @touchstart='touchStart'
                    @touchmove='touchMove'
                    @touchend='touchEnd'
                    ref="canvasF"
                    @mousedown="mouseDown"
                    @mousemove="mouseMove"
                    @mouseup="mouseUp"></canvas>
            <div class="btnBox">
                <van-button
                    type="default"
                    @click="overwrite"
                    >重写</van-button>
                <van-button
                    size="small"
                    type="primary"
                    @click="commit"
                    >
                      
                    提交签名
                </van-button>
            </div>   
        </div>
    </div>
    <div class="signatureImg">
      <img :src="imgSrc" alt="" srcset="">
    </div>
  </section>    
</template>

<script>
// import { NavBar } from "vant";
// import axios from "axios";
// import AliOSS from "ali-oss";
// import ImageCompressor from "image-compressor.js";
// import { signContract } from "@/const/api";
export default {
  name: "signature",
  //   components: {
  //     "van-nav-bar": NavBar
  //   },
  head() {
    return { title: "签名" };
  },
  data() {
    return {
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
      imgSrc: ""
    };
  },
  created() {},
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 20;
    canvas.width = this.$refs.canvasHW.offsetWidth - 20;
    this.canvasTxt = canvas.getContext("2d");
  },
  methods: {
    //添加图片
    handleUpload(data) {
      this.fileUrl.push(data);
    },
    backHome() {
      window.history.back(-2);
    },
    //电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        console.log(obj);
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
        this.imgUrl =
          (this.$refs.canvasF && this.$refs.canvasF.toDataURL()) || "";
      }
    },
    //移动设备事件
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY - 48
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY - 48
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY - 48
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        debugger;
        this.imgUrl =
          (this.$refs.canvasF && this.$refs.canvasF.toDataURL()) || "";
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
    },
    //提交签名
    commit() {
      console.log(this.$refs.canvasF.toDataURL()); //签名
      this.imgSrc = this.$refs.canvasF.toDataURL();
    }
  }
};
</script>

<style lang="less" scoped>
.signature {
  display: flex;
  > div {
    width: 50%;
  }
  .signatureImg {
    height: 100%;
    background: #fff;
    border: 1px solid #ff0000;
  }
}
.signatureBox {
  min-height: 400px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.visaDetailTop {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  z-index: 2;
}
.visaDetailTop p {
  margin: 0px;
  text-align: center;
  color: #000;
  font-size: 1em;
  position: relative;
}
p.visaTitle {
  width: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  text-align: center;
  font-size: 1.2em;
}
.btnBack {
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: transparent;
  border-color: transparent;
  outline: none;
}
.btnDaoHang {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 2.2em;
  width: 2em;
  z-index: 1;
  background: transparent;
  border-color: transparent;
  outline: none;
}
.visaDetailTop p span {
  color: #fff;
  font-size: 1.2em;
}
.visaDetailTop p:first-of-type {
  float: left;
}
.visaDetailTop p:nth-of-type(2) {
  float: right;
}
.canvasBox {
  padding: 10px 5px;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
}
canvas {
  border: 1px solid #e3e3e3;
}
.btnBox {
  /*height: 30px;*/
  padding: 5px;
  text-align: right;
  /*line-height: 30px;*/
}
.btnBox button:first-of-type {
  background: transparent;
  border-radius: 4px;
  height: 40px;
  width: 80px;
  font-size: 14px;
  /*padding: 5px 10px;*/
}
.btnBox button:last-of-type {
  /*border: 1px solid #71b900;*/
  background: #71b900;
  color: #fff;
  border-radius: 4px;
  height: 40px;
  width: 80px;
  font-size: 14px;
  /*padding: 5px 10px;*/
}
@media only screen and (min-width: 750px) {
  .signatureBox {
    box-sizing: border-box;
    overflow: visible;
  }
}
</style>