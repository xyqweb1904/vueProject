<template>
    <div>
        <div>123</div>
        <div id="main" style="width: 500px;height:300px"></div>
    </div>
</template>
<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
require("echarts/lib/component/legend");
require("echarts/lib/chart/line");
export default {
  data() {
    return {};
  },
  mounted() {
    // this.rendImg();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      //   title: {
      //     text: "Stacked Line"
      //   },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {}
      //     }
      //   },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "房租",
          type: "line",
          stack: "Total",
          data: [690, 706, 688, 772, 784, 844, 949]
        },
        {
          name: "支",
          type: "line",
          stack: "Total",
          data: [116000, 113000, 108000, 106000, 104000, 102000, 100884.95]
        },
        {
          name: "平",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 57264]
        },
        {
          name: "深",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 22429]
        },
        {
          name: "工",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 10000]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {}
};
</script>