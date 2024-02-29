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
    const selectedColor = ref('#000000');
    const colorPicker = templateRef('colorPicker');
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
    const { elementX, elementY, isOutside } = useMouseInElement(canvasElement)
    // 2. Call draw line when:
    //  - elementX or elementY have changed
    //  - the pointer is inside element
    watch([elementX, elementY], ([newX, newY]) => {
      if (!isOutside.value && pressed.value) {
        drawLine([newX, newY]);
      }
    });
    
    // 3. Add condition to draw line. It should draw only when mouse is pressed.
    //    Use vueuse/useMousePressed
    const { pressed } = useMousePressed()

    // 4. Reset startLine if mouse is not pressed (try use vueuse/whenever)
    whenever(() => !pressed.value, () => setStartLine());

    // BONUS: 5. Implement color picker
    watch(selectedColor, (color) => canvasContext.strokeStyle = color);
    return {
      canvasWidth,
      canvasHeight,
      selectedColor,
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
  <input type="color" id="colorPicker" name="colorPicker" ref="colorPicker" v-model="selectedColor"/>
  <label for="colorPicker">Color Picker</label>
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

.color {
  margin-right: 5px;
  width: 20px;
  height: 20px;
  &--selected {
    border: 3px solid black;
  }
}
</style>
