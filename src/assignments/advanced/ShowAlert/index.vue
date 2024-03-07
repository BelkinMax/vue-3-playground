<script>
import {computed, defineComponent, ref} from 'vue'
import TheAlert from './components/TheAlert.vue';
import useAlert from './alert.composable.js'

export default defineComponent({
  name: 'ShowAlert',
  components: {
    TheAlert
  },
  setup() {
    const {data, isRequired, updateData} = useAlert(
        'clicks-alert',
        {clicks: 0},
        (data) => {
          return data?.value.clicks < 5
        }
    );
    const clicksLeft = computed(() => 5 - data.value?.clicks);
    const isError = ref(false);

    const onOk = () => {
      updateData({clicks: data.value.clicks + 1})
    };

    const onClose = () => {
      isError.value = true;
    };

    /*
    *  TODO: https://vuejs.org/guide/built-ins/teleport.html
    *  1. Create a composable const { data, isRequired, updateData } = useAlert(alertKey, data, validationCb)
    *  2. Show warning alert with removable option in global-alert slot (element id: global-alert)
    *  3. If alert was closed show non removable error alert inside the page
    */

    return {
      isRequired,
      clicksLeft,
      isError,
      onOk,
      onClose
    }
  }
})
</script>

<template>
  <div class="show-alert">
    <Teleport v-if="isRequired" to="#global-alert" :disabled="isError">
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
