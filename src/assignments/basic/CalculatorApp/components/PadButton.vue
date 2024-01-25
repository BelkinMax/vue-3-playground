<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['clicked'],
  props: {
    label: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <button
    class="button"
    :class="{
      [classes]: true
    }"
    @click="() => $emit('clicked')"
  >
    {{ label }}
  </button>
</template>
