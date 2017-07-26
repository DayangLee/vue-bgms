<template>
  <div class="echarts">
    <IEcharts :option='pie' :style="{height:height,width:width}"></IEcharts>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3'
export default {
  name: 'ringChart',
  components: { IEcharts },
  props: {
    width: {
      type: String,
      default: '20vw'
    },
    height: {
      type: String,
      default: '35vh'
    }
  },
  data: () => ({
    pie: {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        height: 80,
        itemHeight: 20,
        itemWidth: 50,
        data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '40%'],
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '28',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#01cc00', '#d7c924', '#eb8a15', '#fe0000', '#993365', '#8f4748', '#8f4748'],
          data: [
            { value: 335, name: '优' },
            { value: 310, name: '良' },
            { value: 234, name: '轻度污染' },
            { value: 135, name: '中度污染' },
            { value: 135, name: '重度污染' },
            { value: 148, name: '严重污染' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  })
}
</script>

<style>

</style>
