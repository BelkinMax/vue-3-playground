<script>
import { defineComponent } from 'vue'
import TheAlert from './components/TheAlert.vue';
import useAlert from './alert.composable.js'

export default defineComponent({
  name: 'ShowAlert',
  components: {
    TheAlert
  },
  setup() {
    const { data, isRequired, updateData } = useAlert(
      'clicks-alert',
      { clicks: 0 },
      (data) => { return data?.value.clicks < 5 }
    );

    /*
    *  TODO: https://vuejs.org/guide/built-ins/teleport.html
    *  1. Create a composable const { data, isRequired, updateData } = useAlert(alertKey, data, validationCb)
    *  2. Show warning alert with removable option in global-alert slot (element id: global-alert)
    *  3. If alert was closed show non removable error alert inside the page
    */

    return {
      isRequired,
      clicksLeft: 5,
      onOk: () => {},
      onClose: () => {}
    }
  }
})
</script>

<template>
  <div class="show-alert">
    <TheAlert
      kind="error"
      is-removable
      @ok="onOk"
      @close="onClose"
    >
      Click "Ok" {{ clicksLeft }} times
    </TheAlert>
  </div>
</template>
