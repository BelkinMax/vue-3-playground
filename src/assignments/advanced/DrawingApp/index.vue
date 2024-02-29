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
    const { isOutside, elementX, elementY } = useMouseInElement(canvasWrapper);
    const { pressed } = useMousePressed();
    const color = ref('#000000');
    let canvasContext, lineStart;

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
        canvasContext.strokeStyle = color.value;
        canvasContext.stroke();
        setStartLine(position);
      }
    }

    function clearCanvas () {
      canvasContext.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    }

    onMounted(() => {
      canvasContext = canvasElement.value.getContext('2d');
    })


    watch([elementX, elementY, pressed], () => {
      if (!isOutside.value && pressed.value) {
        drawLine([elementX.value, elementY.value]);
      }
    });

    whenever(() => !pressed.value, () => setStartLine());
    whenever(() => !color.value, () => color.value = '#000000');

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
    <input type="color" v-model="color"/>
    <canvas
      ref="canvasElement"
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    >
      Your browser does not support the HTML canvas tag.
    </canvas>

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
