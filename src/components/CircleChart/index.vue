<template>
  <div class="echarts">
    <IEcharts :option='pie' :style="{height:height,width:width}"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3'
export default {
  name: 'circleChart',
  components: { IEcharts },
  props: {
    width: {
      type: String,
      default: '20vw'
    },
    height: {
      type: String,
      default: '30vh'
    }
  },
  data: () => ({
    pie: {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        data: ['在线', '离线']
      },
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        color: ['#00FF00', '#FF0000'],
        data: [
          { value: 35, name: '在线' },
          { value: 310, name: '离线' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    },
  })
}
</script>

<style>

</style>
