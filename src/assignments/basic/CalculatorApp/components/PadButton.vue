<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['button'],
  emits: ['click'],
  setup(_, { emit }) {
    function emitClick(button) {
      emit('click', button);
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
    @click="emitClick(button)"
  >
    {{ button.label }}
  </button>
</template>
