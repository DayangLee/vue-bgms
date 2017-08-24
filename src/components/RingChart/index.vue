<template>
  <div class="echarts">
    <IEcharts :option='ringOption' :style="{height:height,width:width}" :resizable="true"></IEcharts>
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
      default: '100%'
    },
    height: {
      type: String,
      default: '95%'
    },
    ringOption: {
      type: Object
    }
  },
  data: () => ({
  })
}
</script>

<style>

</style>
