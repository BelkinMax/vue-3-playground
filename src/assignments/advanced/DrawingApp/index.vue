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
        canvasContext.moveTo(lineStart.X, lineStart.Y);
        canvasContext.lineTo(position.X, lineStart.Y);
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

    const { x, y, isOutside } = useMouseInElement(canvasWrapper)
    watch(
      [x, y, () => isOutside.value],
      ([newX, newY, newIsOutside]) => {
        const { pressed } = useMousePressed();

        console.log('pressed:', pressed.value)

        if (!newIsOutside && pressed.value) {
          drawLine({
            X: newX,
            Y: newY
          });
        }

        whenever(
          () => !pressed, 
          () => {
            setStartLine();
          }
        );
      }
    );

    // BONUS: 5. Implement color picker

    return {
      canvasWidth,
      canvasHeight,
      clearCanvas
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
