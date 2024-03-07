<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowAlert',
  setup() {
    /*
    * TODO:
    * show local or global alert (element id: global-alert).
    * https://vuejs.org/guide/built-ins/teleport.html
    * */

    return {}
  }
})
</script>

<template>
  <div class="show-alert">
    ShowAlert
  </div>
</template>

<style lang="scss" scoped>
.show-alert {}
</style>