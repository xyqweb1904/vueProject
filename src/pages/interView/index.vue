<template>
    <div class="pages-style">
        <div>
            <h2 class="css-item">css</h2>
            <div>
                <h3>div水平垂直居中</h3>
                <ul class="ul-style">
                    <li>
                        <div class="container-public-style container-flex">
                            <div class="item-public item-flex"><span>flex方式实现居中展示</span></div>
                        </div>
                    </li>
                    <li>
                        <div class="container-public-style container-position">
                            <div class="item-public item-position"><span>position方式实现居中展示</span></div>
                        </div>
                    </li>
                    <li>
                        <div class="container-public-style container-linehit">
                            <div class="item-public item-linehit"><span>position方式实现居中展示</span></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="js-item">
            <h2 class="css-item">js</h2>
            <div class="js-button">
                <div>
                    <div class="button button-bule font-white" @click="arrClick">数组扁平化</div>
                    <div class="button button-bule font-white margin_left_12" @click="closeClick">闭包</div>
                    <div class="button button-bule font-white margin_left_12" @click="arrTakeout">数组去重</div>
                    <div class="button button-bule font-white margin_left_12" @click="arrPX">数组排序</div>
                    <div class="button button-bule font-white margin_left_12" @click="antiShake">防抖</div>
                    <div class="button button-bule font-white margin_left_12" @click="antiShake">防抖</div>
                    <div class="button button-bule font-white margin_left_12" @click="ajaxGetTest">ajax</div>
                </div>
                <hr>
                <div>
                  <div>
                    防抖
                    <input type="text" v-model="inputValue" @input="onInput">
                  </div>
                  <div>
                    节流
                    <input type="text" v-model="inputValue_JL" @input="onInputJL">
                  </div>
                </div>
            </div>
        </div>
        <div class="js-item">
          <h2 class="css-item">Vuex</h2>
          <div class="js-button">
            <div>
              <div class="button button-bule font-white" @click="getVuexData">获取vuex中state中的变量</div>
              {{VuexName}}
              <input v-model="VuexName" @input="setVuexData"/>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import arrTakeoutObj from "./js/arrTakeoutJs.js";
import { mapState, mapGetters, mapMutations } from "vuex";
import apiTest from "../../common/ajax.js";
// import { userStort } from "vuex";
export default {
  name: "interView",
  data() {
    return {
      time: 5,
      timeOut: "",
      timeFD: 1000, // 防抖时间控制器
      timerJSQ: "", // 计时器
      timerONOFF: true, // 计时器开关
      inputValue: "",
      input_T: "",
      inputValue_JL: "",
      JL_ONOFF: true, // 节流开关
      VuexName: ""
    };
  },
  created() {
    console.log("vuex:", this.$store.state.name);
    // console.log("vuex2:", ...mapGetters([name]));
    console.log("vuex:", this.$store.getters.getMessage);
  },
  computed: {
    ...mapGetters([name])
  },
  methods: {
    ...mapMutations(["setName"]),
    getVuexData() {
      this.VuexName = this.$store.state.name;
    },
    setVuexData() {
      console.log("VuexName:", this.VuexName);
      // 方法一：
      // console.log("旧值：", this.$store.state.name);
      // this.$store.commit("setName", { name: this.VuexName });
      // console.log("新值：", this.$store.state.name);
      // 方法二
      // console.log("旧值：", this.$store.state.name);

      console.log("新值：", this.$store.state.name);
    },
    arrClick() {
      const arr = [1, [2, [3, [4, 5]]], 6];
      console.log("方法一：使用flat():", arr.flat(Infinity));
      console.log(
        "方法二：利用正则:",
        JSON.stringify(arr)
          .replace(/\[|\]/g, "")
          .split(",")
      );
      console.log(
        "方法三：正则改良版本:",
        JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]")
      );
    },
    // 闭包
    close_type() {
      let closeTest = "初始值";
      closeTest = closeTest + "_执行a";
      function b() {
        closeTest = closeTest + "_执行b";
        console.log("closeTest:", closeTest);
      }
      return b;
    },
    setTimeoutTest(time) {
      return function() {
        console.log("time【1秒后输出】:", time);
      };
    },
    setIntervaltest() {
      console.log(" this.timeOut:", this.timeOut);
      if (this.time > 0) {
        console.log("time:", this.time);
        this.time = this.time - 1;
        this.$UI.dialog({
          title: "倒计时",
          content: `倒计时还剩${this.time}`,
          leftBtnShow: false,
          rightBtnShow: false
        });
      } else {
        clearInterval(this.timeOut);
        let _this = this;
        this.$UI.dialog({
          title: "是否继续重新计时",
          leftBtn: "取消",
          rightBtn: "继续",
          sure: () => {
            _this.time = 5;
            _this.closeClick();
          }
        });
      }
    },
    closeClick() {
      /*
        概念: 如果一个函数访问了此函数的父级及父级以上的作用域变量，那么这个函数就是一个闭包
        */
      console.log("=================分割线=================");
      let c = this.close_type();
      c(); // 初始值_执行a_执行b
      c(); // 初始值_执行a_执行b_执行b
      console.log("=================分割线=================");
      let setTimeoutEntitv = this.setTimeoutTest(1);
      setTimeout(setTimeoutEntitv, 1000);
      this.timeOut = setInterval(this.setIntervaltest, 1000);
    },
    // 数组去重
    arrTakeout() {
      // const arr = [
      //   1,
      //   1,
      //   "1",
      //   17,
      //   true,
      //   true,
      //   false,
      //   false,
      //   "true",
      //   "a",
      //   {},
      //   {}
      // ];
      const arr = [1, 2, 1, 31, 11, 22, 11, 33, "a", "a", "1", 11, 2, 5];
      console.log("原数组Arr:", arr);

      // 方案一
      arrTakeoutObj.arrTakeoutType1(arr);
    },
    arrPX() {
      let arr = [2, 1, 5, 4, 1, 16, 21, 44, 7, 9];
      this.arrPXTwo(arr);
      // 方法一：
      // let mix = "";
      // for (let i = 0; i < arr.length; i++) {
      //   for (let j = 1; j < i; j++) {
      //     if (arr[i] > arr[j]) {
      //       mix = arr[j];
      //       arr[i] = arr[j];
      //       arr[j] = mix;
      //     }
      //   }
      // }
      // console.log("arr:", arr);
      arr.sort((a, b) => {
        return a - b;
      });
      console.log("arr:", arr);
    },
    // 交换排序
    arrPXTwo(arr) {
      // arr = [2, 1, 5, 4, 16, 21, 44, 7, 9];
      for (let i = 0; i < arr.length; i++) {
        let mixindex = i;
        // 找出当前循环下最小值的index位置
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[i]) {
            mixindex = j;
          }
        }
        // 利用数组解构赋值操作 来交换位置
        [arr[i], arr[mixindex]] = [arr[mixindex], arr[i]];
      }
      console.log("arr222:", arr);
    },
    // 防抖
    antiShake() {
      /*
        防抖触发高频率事件时n秒后只会执行一次,如果n秒内再次触发,则会重新计算。
        概述:每次触发时都会取消之前的延时调用。
      */
    },
    // 节流
    throttling() {
      /*
        应用场景：假如有一个轮播图，轮播图以固定的频率播放图片，用户可以点击切换上一张或者下一张，如果用户点击过快，轮播图就会一直切换。这时候，应该控制轮播图切换的频率，在用户的持续点击下，只按照固定的频率切换。
        节流函数的功能：连续的触发某个函数，只会以固定的频率去执行
      */
      if (this.timerONOFF) {
        this.timerONOFF = false;
        // 异步事件
        this.timerJSQ = setTimeout(() => {
          console.log("我点击了防抖按钮~");
        }, this.timeFD);
      } else {
        this.timerONOFF = true;
        // 清除计时器
        clearTimeout(this.timerJSQ);
      }
    },
    onInput() {
      // 防抖1.0
      // if (this.input_T) {
      //   clearTimeout(this.input_T);
      // }
      // this.input_T = setTimeout(() => {
      //   console.log("inputValue:", this.inputValue);
      // }, 500);

      // 防抖2.0 闭包的方式实现
      this.debounce(() => {
        console.log("输入的值为：", this.inputValue);
      }, 500)();
    },
    // 防抖公共方法
    debounce(fun, delay) {
      console.log("t");
      let _this = this;
      return function() {
        if (_this.input_T) {
          clearTimeout(_this.input_T);
        }
        _this.input_T = setTimeout(() => {
          fun();
        }, delay);
      };
    },
    // 节流
    onInputJL() {
      if (this.JL_ONOFF) {
        setTimeout(() => {
          console.log("节流-输入：", this.inputValue_JL);
          this.JL_ONOFF = true;
        }, 1000);
      }
      this.JL_ONOFF = false;
    },
    ajaxGetTest() {
      console.log("1111111111111111");
      apiTest();
    }
  }
};
</script>
<style lang="less">
@import url("./css/page-style.less");
</style>

