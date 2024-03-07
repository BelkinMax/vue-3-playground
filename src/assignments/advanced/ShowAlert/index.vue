<script>
import { defineComponent, computed, ref } from 'vue'
import TheAlert from './components/TheAlert.vue';
import useAlert from './alert.composable.js'

export default defineComponent({
  name: 'ShowAlert',
  components: {
    TheAlert
  },
  setup() {
    const CLICKS_LEFT = 5
    const { data, isRequired, updateData } = useAlert(
      'clicks-alert',
      { clicks: 0 },
      (data) => { return data?.value.clicks < 5 }
    );

    const clicksLeft = computed(() => CLICKS_LEFT - data.clicks.value)

    const isError = ref(false)

    /*
    *  TODO: https://vuejs.org/guide/built-ins/teleport.html
    *  1. Create a composable const { data, isRequired, updateData } = useAlert(alertKey, data, validationCb)
    *  2. Show warning alert with removable option in global-alert slot (element id: global-alert)
    *  3. If alert was closed show non removable error alert inside the page
    */

    return {
      isError,
      isRequired,
      clicksLeft,
      onOk: () => updateData(),
      onClose: () => { isError.value = true },
    }
  }
})
</script>

<template>
  <div class="show-alert">
    <Teleport to="#global-alert" :disabled="isError">
      <TheAlert
        :kind="isError ? 'error' : 'warning'"
        :is-removable="!isError"
        @ok="onOk"
        @close="onClose"
      >
        Click "Ok" {{ clicksLeft }} times
      </TheAlert>
  </Teleport>
  </div>
</template>
