<script>
import { defineComponent, ref, computed } from 'vue'
import TheAlert from './components/TheAlert.vue';
import useAlert from './alert.composable.js'

export default defineComponent({
  name: 'ShowAlert',
  components: {
    TheAlert
  },
  setup() {
    const isGlobal = ref(true);
    const { data, isRequired, updateData } = useAlert(
      'clicks-alert',
      { clicks: 0 },
      (data) => { return data?.value.clicks < 5 }
    );

    const clicksLeft = computed(() => 5 - data.value.clicks)

    function onOk () {
      updateData();
    }

    function onClose () {
      isGlobal.value = false;
    }

    /*
    *  TODO: https://vuejs.org/guide/built-ins/teleport.html
    *  1. Create a composable const { data, isRequired, updateData } = useAlert(alertKey, data, validationCb)
    *  2. Show warning alert with removable option in global-alert slot (element id: global-alert)
    *  3. If alert was closed show non removable error alert inside the page
    */

    return {
      isRequired,
      clicksLeft,
      updateData,
      onOk,
      onClose,
      isGlobal
    }
  }
})
</script>

<template>
  <div class="show-alert" v-if="isRequired">
    <Teleport :disabled="!isGlobal" to="#global-alert">
      <TheAlert
        :kind="isGlobal ? 'warning' : 'error'"
        :is-removable="isGlobal"
        @ok="onOk"
        @close="onClose"
      >
        Click "Ok" {{ clicksLeft }} times
      </TheAlert>
    </Teleport>
  </div>
</template>
