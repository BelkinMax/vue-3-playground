<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmptyCell'
})
</script>

<template>
  <div class="empty"></div>
</template>

<style lang="scss" scoped>
.empty {
  display: flex;
  aspect-ratio: 1;
  height: 48px;
  width: 48px;
  background-color: #F5E8DD;
}
</style>