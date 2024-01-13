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

<style>
.segment {
  text-align: center;
  width: 80px;
}
.numbers {
  font-size: 32px;
}
.label {
  display: block;
  padding-top: 0.5rem;
  font-size: 16px;
}
</style>
