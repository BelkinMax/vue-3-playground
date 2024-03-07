<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    button: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    function emitClick() {
      emit('click', props.button);
    }

    return {
      emitClick
    }
  }
})
</script>

<template>
  <button
    class="button"
    :class="{
      [button.classes]: true
    }"
    @click="emitClick"
  >
    {{ button.label }}
  </button>
</template>
