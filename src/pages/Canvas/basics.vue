<template>
    <div class="pagesDiv">
      <el-row>
        <el-col :span="24">canvas</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          画线
        </el-col>
        <el-col :span="18">
          <canvas id="basics1" width="500px" height="100px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" style="margin-right: 20px;">
          矩形
          <div>
            <p>rect(x,y,w,h)： 在x,y坐标点绘制一个矩形，宽高为w,h</p>
              在x,y位置绘时，canvas会在当前位置上向左绘制0.5像素，向右绘制0.5像素，这样合成1px
              但是浏览器实际上是不纯在半个像素的，所以浏览器会帮我们补上个半个像素，就成了2个像素了，
              如果要做成1像素边框，只需将坐标左移或右移半个像素，即0.5px，
              如果要精确绘图，须知这一点细节
          </div>
        </el-col>
        <el-col :span="4">
          <canvas id="basics2_1" width="200px" height="100px" style="background-color: #fff; border-radius: 8px"></canvas>
          rect + stroke 方式
        </el-col>
        <el-col :span="4">
          <canvas id="basics2_2" width="200px" height="100px" style="background-color: #fff; border-radius: 8px"></canvas>
          rect + fill 方式
        </el-col>
        <el-col :span="4">
          <canvas id="basics2_3" width="200px" height="100px" style="background-color: #fff; border-radius: 8px"></canvas>
          strokeRect 方式
        </el-col>
        <el-col :span="4">
          <canvas id="basics2_4" width="200px" height="100px" style="background-color: #fff; border-radius: 8px"></canvas>
          <div>fillRect 方式</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          写字: 
          <div>
            fillText(text,x,y,[maxWidth]);  顾名思义，这是填充文字<br/>
            strokeText(text,x,y,[maxWidth]); 顾名思义，这是描边文字<br/>
            参数：<br/>
              text ：需要绘制的文字<br/>
              x,y: 文字绘制的起始坐标<br/>
              [maxWidth] ： 文字的最大宽度，选填<br/>
          </div>
        </el-col>
        <el-col :span="18">
          <canvas id="basics3" width="800px" height="200px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
            案例效果
        </el-col>
        <el-col :span="18">
          <canvas id="basics4" width="900px" height="300px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
            图片
        </el-col>
        <el-col :span="18">
          <img src="./Imgs/p3.jpg" alt="tulip" id="tulip" style="margin-left:0px;width:100px;height:100px" /><br/>
          canvas: <br/>
          <canvas id="basics5" width="900px" height="300px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <img :src="newResult6" alt="tulip" style="margin-left:0px;width:100px;height:100px"/><br/>
          canvas: <br/>
          <canvas id="basics6" width="600px" height="300px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
           <input type="file" value="图片上传" id="fileItem" @change="fnt"/><br/>
           <img :src="result" alt="tulip" style="margin-left:0px;width:100px;height:100px"/><br/>
          canvas: <br/>
          <canvas id="basics7" width="600px" height="300px" style="background-color: #fff; border-radius: 8px"></canvas>
        </el-col>
      </el-row>
    </div>
</template>
<script>
// import jz from '../../common/entrance.js'
const fn = event => {
  console.log('event1', event.target.files[0])
  const readObj = new FileReader()
}
export default {
  data() {
    return {
      newResult6: '',
      result: ''
    }
  },
  created() {},
  computed: {},
  mounted() {
    // 画线
    this.basicsFun1()
    // 矩形
    this.basicsFun2()
    // 写字
    this.basicsFun3()
    // 案例效果
    this.basicsFun4()
    //
    this.basicsFun5()
    this.basicsFun6()
  },
  methods: {
    fnt(event) {
      console.log('event2', event.target.files[0])
      const file = event.target.files[0]
      var file2 = document.getElementById('fileItem').files[0]
      const readObj = new FileReader()
      // this.readObj = readObj
      /*
        注意事项：
          在FileReader对象中，必须要先读取readAsBinaryString(file)后才能调用onload、onloadend方法
          load：文件读取完成时的触发事件
          error：文件读取发生错误时的触发事件。FileReader对象的error属性会包含错误信息。这个属性是一个对象，只包含一个属性code。这个错误码可能是：1（未找到）、2（安全错误）、3（读取被中断）、4（文件不可读）、5（编码错误）
          progress：这个事件每隔50毫秒会触发一次，与XMLHttpRequest的progress类似，主要有3个属性：lengthComputable（布尔值，进度是否可衡量。）、loaded（已读取字节数）、total（文件总字节数）
          onabort	中断时触发
          onerror	出错时触发
          onload	文件读取成功完成时触发
          onloadend	读取完成触发，无论成功或失败
          onloadstart	读取开始时触发
          onprogress	读取中
          读取完成之后触发load事件，读取结果存储在FileReader实例的result属性上，
          也可以通过e.target.result获取读取结果，两者等价
      */
      let imagArr = ['jpeg', 'jpg', 'png', 'gif']
      let fileArr = ['txt', 'doc', 'docx', 'ppt', 'pptx']
      let refs = file.name.split('.')
      console.log('refs:', refs)
      // console.log("refsp[refs.length]:",refs.reverse()[0]) // reverse() 数组翻转
      debugger
      let refs_to = refs.reverse()[0]
      console.log('refs_to:', refs_to)
      if (imagArr.includes(refs_to)) {
        console.log('1111111111111')
        readObj.readAsDataURL(file) //读取图片
      } else if (fileArr.includes(refs_to)) {
        console.log('2222222222222')
        readObj.readAsText(file2, 'UTF-8')
      }
      let _this = this
      readObj.onload = e => {
        // console.log('e:', e)
        console.log('readObj===:', readObj)
        _this.result = readObj.result
      }
      console.log('file2222===:', readObj.readAsText(file))
    },
    imgCompressFn(imgBase64, quality, mimeType) {},
    basicsFun6() {
      // const ACCEPT = ['image/jpeg', 'image/jpg','image/png']
      // const MAX_SIZE = 1024 * 1024;
      let canvas = document.getElementById('basics6')
      let ctx = canvas.getContext('2d')
      const Logo = require('./Imgs/p3.jpg') // 这里必须是通过require导入
      let imgStyle = new Image()
      imgStyle.src = Logo
      let _this = this
      imgStyle.onload = function(e) {
        // console.log("e===：",e)
        // console.log("imgStyle:",imgStyle.width)
        // console.log("imgStyle2:",imgStyle.height)
        let width = imgStyle.width
        let height = imgStyle.height
        let count = width * height / 1000000
        ctx.drawImage(imgStyle, 0, 0, canvas.width, canvas.height)
        let newResult = canvas.toDataURL('./Imgs/p3.jpg', 1)
        _this.newResult6 = newResult
        // console.log("newResult--------:",newResult)
      }
    },
    basicsFun5() {
      let canvas = document.getElementById('basics5')
      let tulip = document.getElementById('tulip')
      let context = canvas.getContext('2d')
      // context.drawImage(tulip, 90, 130, 90, 80, 20, 20, 90, 80);
      // debugger;
      context.clearRect(0, 0, 500, 400)
      const reader = new FileReader()
      let imagge = new Image()
      imagge.src = 'Imgs/p3.jpg'
      imagge.onload = function(v) {
        console.log('bbbbbbbbbbbbb:', v)
        console.log('bbbbbbbbbbbbb1111')
        var w = imagge.width
        var h = imagge.height
        canvas.drawImage(imagge, w, h)
      }
      let newResult = canvas.toDataURL()
      console.log('newResult :', newResult)
      // context.drawImage("./Imgs/canvas.jpg", "100px", "100px");
      context.stroke()
    },
    basicsFun4() {
      let canvas = document.getElementById('basics4')
      let context = canvas.getContext('2d')
      //  ------------------- 三角形 -----------------------------
      context.fillText('三角形', 20, 20)
      context.moveTo(20, 40)
      context.lineTo(80, 90)
      context.lineTo(20, 90)
      context.lineTo(20, 40)
      context.fillStyle = 'rgb(2,100,30)' // 设置填充颜色
      context.fill() // 开始进行着色
      context.lineWidth = 2 //线的宽度
      context.strokeStyle = 'red' //线的颜色
      context.stroke()
      context.beginPath()
      //  ------------------- 绘制一段弧 圆 -----------------------------
      // context.font = "italic bold 24px 微软雅黑";
      context.fillStyle = '#000'
      context.fillText('弧度', 150, 20)
      context.strokeStyle = '#005588'
      context.arc(150, 90, 50, 90 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()
      // 同心圆
      context.beginPath()
      context.fillText('同心圆', 300, 20)
      context.lineWidth = 8
      context.strokeStyle = '#999'
      context.arc(320, 120, 75, 0 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()
      context.beginPath()
      context.strokeStyle = '#005588'
      context.arc(320, 120, 45, 0 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()

      //进度条
      context.fillText('进度条', 500, 20)
      context.beginPath()
      context.arc(520, 120, 75, 0 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()
      // 度数计算
      let dushu = 1
      var timer = setInterval(() => {
        // console.log("dushu:", dushu);
        if (dushu > 230) {
          clearInterval(timer)
        } else {
          context.clearRect(440, 40, 160, 160)
          // 灰色的一段弧
          context.beginPath()
          context.strokeStyle = '#005588'
          context.arc(520, 120, 75, 0 * this.arcUnit(), 360 * this.arcUnit())
          context.stroke()
          // 黄色的一段弧
          context.beginPath()
          context.strokeStyle = '#ff0'
          context.arc(520, 120, 75, 0 * this.arcUnit(), dushu * this.arcUnit())
          context.stroke()
          dushu++
        }
      }, 10)

      let duEnd = 270
      // 刻度
      context.beginPath()
      context.fillText('进度条', 720, 20)
      context.lineWidth = 5
      context.beginPath()
      context.strokeStyle = '#999'
      context.arc(740, 170, 75, 0 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()

      // 进度条
      context.beginPath()
      let du = 1
      let timers = setInterval(() => {
        if (du >= duEnd) {
          clearInterval(timers)
          return
        }
        context.clearRect(740, 170, 160, 160)
        context.beginPath()
        context.strokeStyle = '#ff0'
        context.arc(740, 170, 75, 0 * this.arcUnit(), du * this.arcUnit())
        context.stroke()
        du += 1
      }, 1)
      // 以45度为一刻度
      for (let i = 0; i < 360 / 45; i++) {
        context.beginPath()
        // context.strokeStyle = "#999";

        if (i * 45 < duEnd) {
          context.strokeStyle = '#ff0'
        } else {
          context.strokeStyle = '#999'
        }
        context.arc(
          740 - Math.cos(i * Math.PI / 4) * 75,
          170 - Math.sin(i * Math.PI / 4) * 75,
          3,
          0,
          360 * this.arcUnit()
        )
        // context.strokeStyle = "#ff0";
        // context.moveTo(
        //   740 - Math.cos(i * Math.PI / 4) * 75,
        //   170 - Math.sin(i * Math.PI / 4) * 75
        // );
        // let x = 740 - Math.cos(i * Math.PI / 4) * 75;
        // let y = 170 - Math.sin(i * Math.PI / 4) * 75; // 提示线的坐标
        // // console.log("x - y", x, y);
        // console.log("i * Math.PI / 4:", i * Math.PI / 4 * 75);
        // let wireLength = 20; // 提示线的长度
        // // 通过判断度数来决定提示线的方向
        // if (i * Math.PI / 4 * 75 == 0) {
        //   x = x - wireLength;
        //   y = 170 - Math.sin(i * Math.PI / 4) * 75;
        // } else if (i * Math.PI / 4 * 75 < 160) {
        //   x = 740 - Math.cos(i * Math.PI / 4) * 75;
        //   y = y - wireLength;
        // } else if (i * Math.PI / 4 * 75 > 160 && i * Math.PI / 4 * 75 < 180) {
        //   console.log("------------------------");

        //   x = x + wireLength;ath.sin(i * Math.PI / 4) * 75;
        // } else if (i * Math.PI / 4 * 75 <= 360) {
        //   y = 170 - M
        //   x = 740 - Math.cos(i * Math.PI / 4) * 75;
        //   y = y + wireLength;
        // }

        // context.lineTo(x, y);

        context.stroke()
      }
      setTimeout(() => {}, 3000)
    },
    // 进度条循环
    progressBar() {
      context.beginPath()
      context.strokeStyle = '#999'
      context.arc(520, 120, 75, 0 * this.arcUnit(), 360 * this.arcUnit())
      context.stroke()
    },
    basicsFun3() {
      let canvas = document.getElementById('basics3')
      let context = canvas.getContext('2d')
      context.fillText('你想对我说什么,fillText方式', 50, 50)
      context.strokeText('你想对我说什么，strokeText方式', 50, 70)
      context.font = 'italic bold 20px 微软雅黑 '
      // 基准线
      context.textBaseline = 'top'
      context.fillStyle = 'red'
      context.fillText('你想对我说什么，fillText方式', 50, 100)
      context.strokeStyle = 'red'
      context.strokeText('你想对我说什么，strokeText方式', 50, 150)
      context.shadowOffsetX = 5
      context.shadowOffsetY = 5
      context.shadowBlur = 5
      context.shadowColor = '#000'
      context.strokeText('加阴影，strokeText方式', 250, 10)
      context.fillText('加阴影，fillText方式', 250, 40)
      // 计算文本的宽度
      context.font = '24px 微软雅黑'
      context.fillStyle = 'green'
      var txt = '快告诉我们我自己有多宽'
      var w = context.measureText(txt).width
      context.fillText(txt, 400, 80)
      context.fillText('你的宽度：' + w + 'px', 400, 120)
    },
    basicsFun2() {
      let canvas = document.getElementById('basics2_1')
      let canvas2 = document.getElementById('basics2_2')
      let canvas3 = document.getElementById('basics2_3')
      let canvas4 = document.getElementById('basics2_4')
      let context = canvas.getContext('2d')
      //用stroke
      context.rect(20.5, 20.5, 50, 50)
      context.stroke()
      //用fill
      let context2 = canvas2.getContext('2d')
      context2.rect(20, 20, 50, 50)
      context2.fill()
      //用strokeRect
      let context3 = canvas3.getContext('2d')
      context3.strokeRect(20.5, 20.5, 50, 50)
      //用fillRect
      let context4 = canvas4.getContext('2d')
      context4.fillRect(20, 20, 50, 50)
    },
    basicsFun1() {
      let canvas = document.getElementById('basics1')
      // 获取在 canvas 上绘图的 canvasRenderingContent2D 对象 目前只有2d
      let context = canvas.getContext('2d')
      // 移动画笔到x：100 y：100的位置上画线的起点
      context.moveTo(100, 10)
      // lineTo 意思是连接最后一点的坐标
      context.lineTo(200, 90)
      // 绘制，此为空心的
      context.stroke()
    },
    arcUnit() {
      // 1角度对应的弧度长
      return Math.PI / 180
    }
  }
}
</script>
<style lang="less" scoped>
.pagesDiv {
  /deep/.el-row {
    border: 1px solid #b6a0a0;
    border-radius: 8px;
    padding: 10px;
    // /deep/.el-col {
    //   border: 1px solid #333;
    // }
  }
}
</style>

 