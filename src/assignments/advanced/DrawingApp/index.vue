<script>
import { defineComponent, watch, onMounted } from 'vue';
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
    const { elementX: x, elementY: y, isOutside } = useMouseInElement(canvasElement)
    const { pressed } = useMousePressed()

    function setStartLine(position) {
      lineStart = position ||
          null;
    }

    watch(
        () => ([x.value, y.value]),
        (position) => {
          if (!isOutside.value && pressed.value) {
            drawLine(position)
          }
        }
    )

    whenever(() => !pressed.value, () => {
      setStartLine()
    })

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
        setStartLine(position);
      }
    }

    function clearCanvas () {
      canvasContext.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    }

    onMounted(() => {
      canvasContext = canvasElement.value.getContext('2d');
    })

    // TODO: Your code here
    // 1. Get isOutside and mouse position inside element from vueuse/useMouseInElement

    // 2. Call draw line when:
    //  - elementX or elementY have changed
    //  - the pointer is inside element

    // 3. Add condition to draw line. It should draw only when mouse is pressed.
    //    Use vueuse/useMousePressed

    // 4. Reset startLine if mouse is not pressed (try use vueuse/whenever)

    // BONUS: 5. Implement color picker

    return {
      canvasWidth,
      canvasHeight,
      clearCanvas,
      x, y, isOutside
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
