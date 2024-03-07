<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    button: {
      type: Object,
      required: true
    }
  },
  emits: ['buttonClick'],
  setup(props, { emit }) {
    function emitClick() {
      emit('buttonClick',props.button);
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
