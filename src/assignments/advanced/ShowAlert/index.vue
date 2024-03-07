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
    const { data, isRequired, updateData } = useAlert(
      'clicks-alert',
      { clicks: 0 },
      (data) => { return data?.clicks < 4 }
    );
    const clicksLeft = computed(() => 5 - data.clicks);
    const showModal = ref(true);

    return {
      isRequired,
      clicksLeft,
      showModal,
      onOk: updateData,
      onClose: () => {
        showModal.value = false;
      }
    }
  }
})
</script>

<template>
  <div v-if="isRequired">
    <div class="show-alert" v-if="!showModal">
      <TheAlert
        kind="error"
        :is-removable="false"
        @ok="onOk"
      >
        Click "Ok" {{ clicksLeft }} times
      </TheAlert>
    </div>
    <teleport to="#global-alert" v-else>
      <TheAlert
          kind="error"
          is-removable
          @ok="onOk"
          @close="onClose"
      >
        Click "Ok" {{ clicksLeft }} times
      </TheAlert>
    </teleport>
  </div>
</template>
