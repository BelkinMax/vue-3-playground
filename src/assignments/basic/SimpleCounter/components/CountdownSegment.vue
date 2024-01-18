<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CountdownSegment',
  props: {
    label: String,
    number: Number
  }
})
</script>

<template>
  <div class="segment">
    <span :key="number" class="numbers" v-text="number" />
    <span class="label" v-text="label" />
  </div>
</template>
