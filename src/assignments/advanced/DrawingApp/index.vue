<script>
import {defineComponent, watch, onMounted, ref} from 'vue';
import {
  useMousePressed,
  useMouseInElement,
  useElementSize,
  templateRef, whenever
} from '@vueuse/core'

export default defineComponent({
  name: 'DrawingApp',
  setup() {
    const canvasWrapper = templateRef('canvasWrapper');
    const canvasElement = templateRef('canvasElement');
    const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasWrapper);
    const { elementX, elementY, isOutside } = useMouseInElement(canvasElement);
    const { pressed } = useMousePressed({ target: canvasElement })
    const strokeStyle = ref('#000000');
    const lineWidth = ref(1);
    let canvasContext, lineStart;

    watch([elementX, elementY], (position) => {
      if(!isOutside.value && pressed.value) {
        drawLine(position);
      }
    });

    whenever(() => !pressed.value, () => setStartLine());

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
        canvasContext.strokeStyle = strokeStyle.value;
        canvasContext.lineWidth = lineWidth.value;
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
      strokeStyle,
      lineWidth
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
    <input type="color" v-model="strokeStyle" />
    <input type="range" v-model="lineWidth" min="1" max="10" />
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
