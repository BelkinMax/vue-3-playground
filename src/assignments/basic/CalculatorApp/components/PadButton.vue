<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function emitClick() {
      // TODO: emit 'buttonClick'
    }

    return {
      button: {},
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
