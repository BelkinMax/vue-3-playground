<script>
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['buttonClick'],
    props: {
        button: {
            type: Object,
            required: true
        }
    },
    setup(_, { emit }) {
        function emitClick() {
            emit('buttonClick');
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
