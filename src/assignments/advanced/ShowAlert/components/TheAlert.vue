<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

type AlertKind = 'warning' | 'error';

export default defineComponent({
  name: 'TheAlert',
  props: {
    kind: {
      type: String as PropType<AlertKind>,
      required: true
    },
    isRemovable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['ok', 'close'],
  setup(props, { emit }) {
    const alertColor = computed(() => {
      switch (props.kind) {
        case 'error': return '#EED3D9';
        case 'warning': return '#F5E8DD';
        default: return 'transparent';
      }
    });

    function emitClose () {
      emit('close');
    }

    function emitOk () {
      emit('ok');
    }

    return {
      alertColor,
      emitOk,
      emitClose
    }
  }
})
</script>

<template>
  <article class="the-alert">
    <p class="text"><slot /></p>
    <div class="cta">
      <button
        class="button"
        @click="emitOk"
      >
        Ok
      </button>
      <button
        v-if="isRemovable"
        class="button"
        @click="emitClose"
      >
        Close
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.the-alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: v-bind(alertColor);

  .text,
  .cta .button {
    font-size: 1.5rem;
  }

  .cta {
    display: flex;
    gap: 1rem;

    .button {
      color: black;
      background-color: transparent;
      border: 2px solid black;
      padding: 0.3rem 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
    }
  }
}
</style>
