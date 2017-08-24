<template>
  <div class="echarts">
    <IEcharts :option='circleOption' :style="{height:height,width:width}" :resizable="true"></IEcharts>
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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    circleOption: {
      type: Object
    }
  },
  data: () => ({
  })
}
</script>

<style>

</style>
