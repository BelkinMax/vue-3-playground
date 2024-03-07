<script>
import { defineComponent } from 'vue'
import PadButton from './components/PadButton.vue'
import useCalculator from './composition/useCalculator'

export default defineComponent({
  name: 'CalculatorApp',
  components: {
    PadButton
  },
  setup() {
    const calculator = useCalculator();

    return {
      buttons: calculator.buttons,
      screenResult: calculator.screenResult,
      handleClick: calculator.handleClick
    };
  }
})
</script>

<template>
  <div class="calculator">
    <div class="screen-wrapper">
      <div class="screen-result">
        {{ screenResult }}
      </div>
    </div>
    <div class="pad">
      <PadButton
        v-for="button in buttons"
        :key="button.value"
        :button="button"
        @buttonClick="handleClick"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./calculator-app.scss" />
