<script>
import { defineComponent, watch, onMounted, ref } from 'vue';
import {
  useElementSize,
  templateRef,
  useMouseInElement,
  useMousePressed,
  whenever
} from '@vueuse/core'

export default defineComponent({
  name: 'DrawingApp',
  setup() {
    const canvasWrapper = templateRef('canvasWrapper');
    const canvasElement = templateRef('canvasElement');
    const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasWrapper);
    let canvasContext, lineStart;
    const color = ref('#000000');
    function setStartLine(position) {
      lineStart = position || null;
    }
    function drawLine (position) {
      if (canvasContext) {
        if (!lineStart) {
          setStartLine(position);
          return;
        }
        canvasContext.beginPath();
        canvasContext.moveTo(...lineStart);
        canvasContext.lineTo(...position);
        canvasContext.stroke();
        canvasContext.strokeStyle = color.value;
        setStartLine(position);
      }
    }

    function clearCanvas () {
      canvasContext.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    }

    onMounted(() => {
      canvasContext = canvasElement.value.getContext('2d');
    })

    const { elementX, elementY, isOutside } = useMouseInElement(canvasElement);
    const { pressed } = useMousePressed();

    watch([elementX, elementY, pressed], () => {
      if (!pressed.value) setStartLine(null);
      if (!isOutside.value && pressed.value) {
        drawLine([elementX.value, elementY.value]);


      }
    }, { immediate: true });

    //whenever(pressed, () => setStartLine(null))

    return {
      canvasWidth,
      canvasHeight,
      clearCanvas,
      color
    }
  }
})
</script>

<template>
  <div
    ref="canvasWrapper"
    class="canvas-wrapper"
  >
    <canvas
      ref="canvasElement"
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
    <input type="color" v-model="color" />
    <button class="clear-button" @click="clearCanvas">Clear</button>
  </div>
</template>

<style lang="scss" scoped>
#canvas {
  border: 1px solid var(--color-border);
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
  max-height: 80vh;
}

.clear-button {
  width: 100%;
}
</style>
