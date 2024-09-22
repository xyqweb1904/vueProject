<template>
    <div class="pages-div">
      <div class="md5-div">
        <PagesTitle ref="test" title="MD5加/解密" :subTitle="subTitle" :buttonShow="true" @pagesTitleClick="pagesTitleClick"/>
        <div class="content-info" v-for="(item,index) in md5Arr" :key="index">
          <div>加密前：{{item.value}}</div>
          <div class="md5-style">加密后：{{item.value|md5}}</div>
        </div>
        <div class="add-input">
          <el-input v-if="addInput" v-model="addValue"></el-input>
          <el-button @click="addClick">{{buttonName}}</el-button>
        </div>
      </div>
      <div class="base64-div">
        <PagesTitle ref="base64Item" title="base64加/解密" :subTitle="subTitle_base64"  @pagesTitleClick="pagesTitleClick"/>
        <div v-for="(item,index) in base64Arr" :key="index"  class="content-info">
          <div @click="onInputClick(index)" class="base64-div-item jmq-style"><span class="sub-title">加密前：</span>
              <div v-if="item.showInput" class="base64-div-item">
                <input class="input-style" v-model="input_value"/>
                <div @click.stop="base64Ok(index)" class="base64-ok-button">确定</div>
              </div>
              <div v-if="!item.showInput">{{item.value}}</div>
          </div>
          <div class="md5-style add-style">加密后：{{item.value | base64Encrypt('J')}}</div>
          <div class="md5-style jm-style">解密后：{{base64_JM }}</div>
        </div>
      </div>
    </div>
</template>
<script>
import md5 from "md5";
import Utils from "../../common/utils.js";
export default {
  data() {
    return {
      md5Arr: [
        {
          value: "你好"
        }
      ],
      addInput: false,
      buttonName: "新增加密项【md5】",
      addValue: "",
      subTitle: "",
      bgColor: {
        direction: "top",
        oneColor: "#fff",
        twoColor: "#000"
      },
      buttonShow: false,
      subTitle_base64: "",
      base64Arr: [
        {
          value: "未来更好",
          showInput: false
        }
      ],
      showInput: false, // 默认关闭
      input_value: ""
    };
  },
  filters: {
    md5(value) {
      return md5(value);
    },
    base64Encrypt(value) {
      let str1 = "我就是个字符串";
      // console.log("加密:", Utils.encode(str1));
      // 5oiR5bCx5piv5Liq5a2X56ym5Liy
      // console.log("解密:", Utils.base64decode("5oiR5bCx5piv5Liq5a2X56ym5Liy"));
      return Utils.encode(value);
    }
  },
  computed: {
    base64_JM() {
      let JM = Utils.encode(this.input_value);
      console.log("Utils.base64decode(JM):", Utils.base64decode(JM));
      return Utils.base64decode(JM);
    }
  },
  created() {
    this.subTitle = `<div style="font-size: 12px">
      <h4>什么是MD5：可以产生出一个128位（16字节）的散列值（hash value）
      也就是说MD5加密 会产生16位的字符串<h4>
      百度说 这是不被认可为安全加密方式，可以被加以破解。<br/>
      目前来说：市面上的MD5解密，一般都是采用碰撞的方式取解出来。<br/>
      什么意思呢？
      我有密码a ，经过加密后 xxxxxxxxxxxxxxxx
      添加到密码库中。<br/>
      你用网站查 输入一个MD5加密的值，去取值。取到了，就查到了，找不到，那就算了。<br/>
      网址：<a style="color: #a4a4e7" href="https://cloud.tencent.com/developer/article/1934146?from=15425">介绍</a><br/>
      解密网址：【赋值加密后的字段去网站中解密】<a href="https://www.somd5.com/">MD5解密网站</a> 
    </div>`;
    this.subTitle_base64 = `<div style="font-size: 12px">
      <h4>什么是base64:base64是一种加密算法，有着广泛的应用和支持，但却是当今最弱的编码标准之一。它主要是对明文转换后的二进制序列做处理，使之变为不能被人直接识别的形式。</h4>
      特点：<br/>
        1.使用最广泛<br/>
        2.简单易上手<br/>
        3.可以将图片转译存储<br/>
        4.编码之后的结果，只有64个字符 az AZ 0~9 / + 再加上一个辅助字符 =
    </div>`;
    console.log("Utils===:", Utils.moneyUp("10086"));
    console.log("Utils regMoneyAndDou===:", Utils.regMoneyAndDou("10086"));
    console.log("Utils getUrlParameter===:", Utils.getUrlParameter("ssEnv"));
  },
  methods: {
    addClick() {
      this.addInput = !this.addInput;
      if (this.addInput) {
        this.buttonName = "完成";
      } else {
        this.md5Arr.push({
          value: this.addValue
        });
        this.buttonName = "新增加密项【md5】";
      }
    },
    pagesTitleClick() {
      console.log("=========================================");
      // 组件定义的ref必须不同
      this.$refs.test.$refs.bgColorRef.style.background =
        "linear-gradient(to right top,red,yellow,green)";
      this.$refs.base64Item.$refs.bgColorRef.style.background =
        "linear-gradient(to left top,red,yellow,green)";
    },
    onInputClick(index) {
      console.log("index:", index);
      this.base64Arr[index].showInput = true;
      this.input_value = this.base64Arr[index].value;
    },
    base64Ok(index) {
      console.log("base64Ok:", this.base64Arr[index]);
      this.base64Arr[index].showInput = false;
      this.base64Arr[index].value = this.input_value;
      console.log("base64Ok222:", this.base64Arr[index]);
    }
  }
};
</script>
<style lang="less">
@import url("./css/index.less");
</style>
