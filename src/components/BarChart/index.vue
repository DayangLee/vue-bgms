<template>
  <div class="echarts">
    <IEcharts :option='bar' :style="{height:height,width:width}"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3'
export default {
  name: 'barChart',
  components: { IEcharts },
  props: {
    width: {
      type: String,
      default: '20vw'
    },
    height: {
      type: String,
      default: '40vh'
    }
  },
  data: () => ({
    bar: {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }

  }),
  methods: {
    // getData() {
    //   for (let i = 0; i < 50; i++) {
    //     this.xAxisData.push(i);
    //     this.data.push((Math.sin(i / 5) * (i / 5) + i / 6) * 5);
    //   }
    // }
  },
  created() {
    //this.getData()
  }
}
</script>

<style>

</style>
