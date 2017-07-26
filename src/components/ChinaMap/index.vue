<template>
  <div class="echarts">
    <IEcharts :option='map' :style="{height:height,width:width}"></IEcharts>
  </div>
</template>

<script>
import { getKGMapData } from '../../api/KG'
import IEcharts from 'vue-echarts-v3'
import chinaJson from '../../assets/json/china.json'
IEcharts.registerMap('china', chinaJson)
export default {
  name: 'chinaMap',
  components: { IEcharts },
  props: {
    width: {
      type: String,
      default: '100vw'
    },
    height: {
      type: String,
      default: '100vh'
    }
  },
  data: () => ({
    //data1: [],
    //data2: [],
    map: {
      title: {
        text: '地域分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['KG1', 'KG2']
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: 'right',
        top: 'center',
        text: ['高', '低'],
        calculable: true,
        inRange: {
          color: ['#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      },
      toolbox: {
        show: false
      },
      // color: ['#20a0ff', '#13CE66', '#F7BA2A', '#FF4949'],
      series: [{
        name: 'KG1',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: this.data1
      }, {
        name: 'KG2',
        type: 'map',
        mapType: 'china',
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: this.data2
      }]
    }
  }),
  methods: {
    getData() {
      getKGMapData('KG1').then(res => {
        console.log(res.data)
        this.map.series[0].data = res.data
      })
      getKGMapData('KG2').then(res => {
        console.log(res.data)
        this.map.series[1].data = res.data
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>

</style>
