<template>
    <div class="template_div">
        <el-row>
            <el-col :span="24" class="title_medium left">JS模块</el-col>
            <el-col :span="24" class="title_small left">
                <el-row>
                    <el-col :span="2">模块内容:</el-col>
                    <el-col :span="22" class="crumbs">
                      <el-button type="primary" @click="dialogVisible = true">展开</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <p>1.原型链</p>
                <el-button @click="newFunctionTest">通过函数方式创建对象</el-button>
            </el-col>
            <el-col :span="24">
                <p>2.arguments</p>
                <div style="padding-left:20px">
                  arguments 是一个对应于传递给函数的参数的类数组对象。
                  <br>
                  把arguments转成数组的方法 Array.prototype.slice.call(arguments);
                  <br>
                  <br>
                  <el-button @click="argumentsTestFun">arguments</el-button>
                </div>
            </el-col>
            <el-col :span="24">
                <p>3. this</p>
                <el-row>
                  <el-col :span="24" style="margin-bottom: 20px">this的指向问题</el-col>
                  <el-col :span="10">
                    <span style="color: red">【核心概念】</span>：当this没有明确的调用对象的时候，this默认绑定到window
                  </el-col>
                  <el-col :span="14">
                    <a href="static/thisWindow.html">跳转到html页面1</a>
                    <a href="static/pointToThe.html">跳转到pointToThe页面</a>
                    <el-button @click="thisWindow">跳转到html页面</el-button>
                  </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <p>4. call和apply</p>
                <el-row>
                  <el-col :span="24" style="margin-bottom: 20px">this的指向问题</el-col>
                  <el-col :span="10">
                    <span style="color: red">【核心概念】</span>：当this没有明确的调用对象的时候，this默认绑定到window
                  </el-col>
                  <el-col :span="14">
                    <a href="static/thisWindow.html">跳转到html页面</a>
                    <a href="static/pointToThe.html">跳转到pointToThe页面</a>
                    <el-button @click="thisWindow">跳转到html页面</el-button>
                  </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <p>6. js面向对象：封装 继承 多肽</p>
                <el-row>
                  <el-col :span="24" style="margin-bottom: 20px">多肽</el-col>
                  <el-col :span="24">
                    <span style="color: red">【核心概念】</span>
                    同一方法，入参不同，则有不同的效果，从而实现，一套代码功能多样性
                  </el-col>
                </el-row>
                 <el-row style="margin-top: 10px">
                  <el-col :span="24" style="margin-bottom: 20px">继承</el-col>
                  <el-col :span="24">
                    <span style="color: red">【核心概念】</span>
                    子级可以使用父级或者使用window所带的方法
                  </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <p>7. File、Blob、FileReader、ArrerBuffer、Base64</p>
                <el-row>
                  <div>
                    <p>blob定义:</p>Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。 通常可以用于声音、视频等多媒体文件的存储；
                  </div>
                  <div>
                    <p>File:</p>
                    获取file：
                      1.在input元素上选择文件后返回的FileList对象
                      2.文件拖放操作生成的DataTransfer对象
                      <input type="file" id="fileID"/>
                  </div>
                </el-row>
            </el-col>
            <el-col class="margin-top-12" :span="24">
              <jsjc/>
            </el-col>
            <el-col class="margin-top-12" :span="24">
              <ES6StudyDome1></ES6StudyDome1>
            </el-col>
        </el-row>
        <!-- 展开弹窗 -->
        <div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-row>
              <el-col :span="6" v-for="item in jsData" :key="item.key">
                <el-button :type="item.bgType" class="button_bottom"  @click="gotoPlace(item.onclickCallback)">{{item.title}}</el-button>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <button @click="JSProp">JS弹窗</button>
        </div>
    </div>
</template>
<script>
import argumentsTest from './js/argumentsTest.js'
// import thiswindow from "./js/thisWindow.js";
import { thisWindowFun, thisWindow2 } from './js/thisWindow.js'
import jsjc from './components/JS-jc'
import ES6StudyDome1 from './components/ES6Study/dome1/index'
export default {
  data() {
    return {
      dialogVisible: false,
      jsData: [
        {
          key: 1,
          title: '原型链',
          onclickCallback: 'Prototype_chain',
          bgType: 'primary'
        },
        {
          key: 2,
          title: '原型链',
          onclickCallback: 'Prototype_chain',
          bgType: 'success'
        },
        {
          key: 3,
          title: '原型链',
          onclickCallback: 'Prototype_chain',
          bgType: ''
        },
        {
          key: 4,
          title: '原型链',
          onclickCallback: 'Prototype_chain'
        },
        {
          key: 5,
          title: '原型链',
          onclickCallback: 'Prototype_chain'
        }
      ]
    }
  },
  components: { jsjc, ES6StudyDome1 },
  created() {
    this.jsDataFun()
    // this.Promisetest()
    this.Promisetest2()
    // this.JC_js()
    this.publicFun(
      0,
      this.testPublicFun1,
      this.testPublicFun2,
      this.testPublicFun3
    )
  },
  mounted() {
    this.blobFunction()
    this.fileFunction()
  },
  methods: {
    /*
      作用：传入很多方法，使得前一个方法的返回值作为下一个方法的入参
    */
    publicFun(value, ...functionArg) {
      functionArg.forEach(item => {
        value = item(value)
      })
      console.log('publicFun:', value)
      return value
    },
    testPublicFun1(a = 1) {
      console.log('testPublicFun1:', a)
      let sum = a + 1
      console.log('testPublicFun1_sum:', sum)
      return sum
    },
    testPublicFun2(a) {
      console.log('testPublicFun2:', a)
      let sum = a + a
      console.log('testPublicFun2_sum:', sum)
      return sum
    },
    testPublicFun3(a) {
      console.log('testPublicFun3:', a)
      let sum = a + a
      console.log('testPublicFun3_sum:', sum)
      return sum
    },
    JC_js() {
      var o = {
        a: 10,
        b: {
          a: 12,
          fu: function() {
            // console.log('this:', this)
            console.log('this.a:', this.a)
          }
        }
      }
      var j = o.b.fu
      o.b.fu() // 12
      j() // undefinde
    },
    Promisetest2() {
      // 只会输出：then: success1  因为他只要经过resolve或者reject就直接出去了，后面不会执行
      const promise = new Promise((resolve, reject) => {
        resolve('success1')
        reject('error')
        resolve('success2')
      })
      promise
        .then(res => {
          console.log('then:', res)
        })
        .catch(err => {
          console.log('catch:', err)
        })
    },
    Promisetest() {
      // 输出 1 2 4 3 （error不会输出）
      const pxx = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
        reject('error')
      })
      pxx
        .then(() => {
          console.log(3)
        })
        .catch(e => {
          console.log(e)
        })
      console.log(4)
    },
    fileFunction() {
      let fileObj = document.getElementById('fileID')
      fileObj.onchange = function(e) {
        // 获取文件的fileList对象
        let fileList = e.target.files
        console.log('fileList:', fileList)
      }
    },
    thisWindow() {
      thisWindowFun.thisWindowMain()
    },
    blobFunction() {
      let blob = new Blob(['hellowrold'], { type: 'text/plain' })
      console.log('blob:', blob)
      let blob2 = blob.slice(0, 5, 'text/plain') // 切片从0截取5个
      console.log('blob2:', blob2)
      let filereader = new FileReader()
      let result = filereader.readAsText(blob2)
      filereader.onload = function() {
        console.log('result:', filereader.result)
      }
    },
    // 处理jsData的默认值
    jsDataFun() {
      this.jsData.map(item => {
        if (!item.bgType && item.bgType !== '') {
          item.bgType = 'primary'
          name
        }
      })
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          //   done();
        })
        .catch(_ => {})
    },
    gotoPlace(JSType) {
      console.log(JSType)
    },
    FunctionTest(name) {
      this.name = name
    },
    newFunctionTest() {
      //   let Fun = this.FunctionTest();
      //   let obj = new Fun("小明");
      var M = function(name) {
        this.name = name
      }
      var Obj = new M('o3')
      console.log('obj:', obj)
    },
    argumentsTestFun() {
      argumentsTest.giveParameter()
    },
    JSProp() {
      this.$UI.dialog({
        content: '我有一头小毛驴，我从来也不骑',
        sure: () => {
          console.log('确定')
        }
      })
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   console.log('2232312312312312312313')
  //   console.log('from:', from)
  //   let url = from.fullPath
  //   console.log('locatost:', location.href)
  //   next(false)
  // }
}
</script>
<style lang="less" scoped>
@import url('./css/index.less');
</style>
