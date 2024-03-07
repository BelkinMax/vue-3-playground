<script>
import { defineComponent, ref } from 'vue'
import TheAlert from './components/TheAlert.vue';
import useAlert from './alert.composable.js'


export default defineComponent({
  name: 'ShowAlert',
  components: {
    TheAlert
  },
  setup() {
    const clicksLeft = ref(5);
    const isTeleported = ref(false);
    const { data, isRequired, updateData } = useAlert(
      'clicks-alert',
      { clicks: 0, clicksLeft: 5 },
      (data) => { return data?.value.clicks < 5 }
    );

    function onOk () { updateData({ clicks: data.value.clicks + 1 }); clicksLeft.value = clicksLeft.value - 1  };
    function onClose () { isTeleported.value = true };

    return {
      isRequired,
      clicksLeft,
      onOk,
      onClose,
      isTeleported
    }
  }
})
</script>

<template>
  <div class="show-alert">
    <Teleport v-if="isRequired" to="#global-alert" :disabled="isTeleported">
      <TheAlert
        kind="error"
        is-removable
        @ok="onOk"
        @close="onClose"
      >
        Click "Ok" {{ clicksLeft }} times
      </TheAlert>
    </Teleport>
  </div>
</template>
