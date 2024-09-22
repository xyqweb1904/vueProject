<template>
    <div class="view-dialog" v-show="visible">
        <div class="view-mask"></div>
        <div class="view-dialog-postion">
            <div class="view-dialog-main">
                <div class="view-dialog-title" v-show="config.title" v-html="config.title"></div>
                <div class="view-dialog-icon" v-show="config.showIcon"></div>
                <div class="view-dialog-right-icon" @click="rightIconClick" v-if="config.showRightIcon">
                    <div class="right-icon"></div>
                </div>
                <div class="view-dialog-content" :style="contentStyle" v-html="config.content"></div>
                <div class="view-dialog-btn">
                    <div class="btn cancel" v-show="config.leftBtnShow" @click="cancelClick" v-html="config.leftBtn">不允许</div>
                    <div class="btn sure" v-show="config.rightBtnShow" @click="sureCliick" v-html="config.rightBtn"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Hello"
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function() {
        return {
          content: "",
          leftBut: "取消",
          rightBut: "确定",
          leftBtnShow: true,
          rightBtnShow: true
        };
      }
    }
  },
  computed: {
    contentStyle() {
      let style = {};
      if (this.config.title) {
        style.padding = "5px 22px 22px 22px";
      } else {
        style.padding = "22px";
      }
      return style;
    }
  },
  created() {
    console.log("进入index page");
  },
  mounted() {
    setTimeout(() => {
      let dom = document.getElementsByClassName("view-dialog-main");
      console.log("dom:", dom[0].style.width);
    }, 200);
  },
  methods: {
    cancelClick() {
      this.$emit("cancel");
    },
    sureCliick() {
      this.$emit("sure");
    },
    rightIconClick() {
      this.$emit("rightIconClick");
    }
  }
};
</script>
<style lang="less">
.view-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
}
.view-dialog .view-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  touch-action: none;
}
.view-dialog .view-dialog-postion {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: PingFangSc-Medium;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-icon {
  width: 36px;
  height: 36px;
  // background: url();
  background-size: 100% 100%;
  margin: 20px 0 0 0;
  display: inline-block;
}
.view-dialog .view-dialog-postion .view-dialog-main {
  //   min-width: 200px;
  //   min-height: 120px;
  max-width: 280px;
  padding: 0 12px;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-content {
  padding: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #272a30;
  word-break: break-all;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-right-icon {
  width: 100%;
  height: 20px;
  position: relative;
}
.view-dialog
  .view-dialog-postion
  .view-dialog-main
  .view-dialog-right-icon
  .right-icon {
  position: absolute;
  right: 8px;
  top: 10px;
  width: 15px;
  height: 15px;
  position: absolute;
  // background: url()
  background-size: 100% 100%;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-btn {
  width: 100%;
  display: flex;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: #716e6e;
    transform: scaleY(0.5);
  }
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-btn .btn {
  width: 100%;
  font-size: 18px;
  color: #716e6e;
  height: 40px;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-btn .cancel {
  position: relative;
  &::after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: #716e6e;
    transform: scaleX(0.5);
  }
}
.cancel:hover,
.sure:hover {
  background: #d9d9d9;
  cursor: pointer;
}
.view-dialog .view-dialog-postion .view-dialog-main .view-dialog-btn .sure {
  font-family: PingFangSC-Medium;
  color: #1752ff;
}
</style>

