<template>
    <div>
        <canvas id="canvas" width="600" height="300" style="border:1px solid #000000;"></canvas>
    </div>
</template>
<script>
let canvas;
let ctx;
export default {
  mounted() {
    // this.initCanvas();
    // 当调整窗口大小时重绘canvas
    this.testto();
  },
  methods: {
    testto() {
      var canvas = document.getElementById("canvas"); //获取canvas
      // canvas.width = 800; //设定canvas的宽度
      // canvas.height = 800; //设定canvas的高度x

      if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d"); //获取绘图的上下文环境
        context.fillStyle = "#fff";
        context.lineWidth = 5;
        context.beginPath();
        context.strokeStyle = "#f00";
        context.arc(300, 200, 100, Math.PI, -180, false);
        context.stroke();
        context.beginPath();

        context.strokeStyle = "blue";
        context.arc(300, 200, 50, Math.PI, Math.PI * 1 / 4, false);
        context.stroke();
        context.beginPath();

        context.fillStyle = "yellow";
        context.arc(300 - 100, 200, 5, 0, 2 * Math.PI, true);
        context.fill();
        context.beginPath();

        //黄色的小圆点
        for (let i = 0; i < 5; i++) {
          context.beginPath();
          context.arc(
            300 - 100 * Math.cos(i * Math.PI / 4),
            200 - 100 * Math.sin(i * Math.PI / 4),
            5,
            0,
            2 * Math.PI
          );
        }
        context.fill();
        context.beginPath();
        // context.beginPath();
        // context.arc(
        //   300 - 100 * Math.cos(Math.PI / 4),
        //   200 - 100 * Math.sin(Math.PI / 4),
        //   5,
        //   0,
        //   2 * Math.PI,
        //   true
        // );
        // context.fill();
        // context.beginPath();

        // context.arc(
        //   300 - 100 * Math.cos(Math.PI / 2),
        //   200 - 100 * Math.sin(Math.PI / 2),
        //   5,
        //   0,
        //   2 * Math.PI,
        //   true
        // );
        // context.fill();
        // context.beginPath();

        // context.arc(
        //   300 - 100 * Math.cos(3 * Math.PI / 4),
        //   200 - 100 * Math.sin(3 * Math.PI / 4),
        //   5,
        //   0,
        //   2 * Math.PI,
        //   true
        // );
        // context.fill();
        // context.beginPath();

        // context.arc(
        //   300 - 100 * Math.cos(Math.PI),
        //   200 - 100 * Math.sin(Math.PI),
        //   5,
        //   0,
        //   2 * Math.PI,
        //   true
        // );
        // context.fill();
        // context.beginPath();
      } else {
        alert("您的浏览器不支持canvas,请更换浏览器尝试~");
      }
    }
  }
};
</script>
<style>
#canvas {
  /* width: 100vw;
  height: 100vh; */
  /* background: #f00; */
}
</style>

