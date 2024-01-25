<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: {
    button: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const { button } = toRefs(props);

    function emitClick() {
      emit('buttonClick', button.value);
    }

    return {
      button,
      emitClick
    };
  }
})
</script>

<template>
  <button class="button" :class="button.classes" @click="emitClick">
    {{ button.label }}
  </button>
</template>

