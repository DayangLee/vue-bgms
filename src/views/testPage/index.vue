<template>
  <div class="data-container" style="width: 100%">
    <basicEditor></basicEditor>
  </div>
</template>

<script>
import basicEditor from '../../components/Editors/basic'
export default {
  components: { basicEditor }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.data-container {
  padding: 30px 50px;
  width: 100%;
  height: 100px;
  position: relative;
}
</style>
