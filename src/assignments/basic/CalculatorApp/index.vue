<script>
import {computed, defineComponent, reactive, ref} from 'vue'
import PadButton from './components/PadButton.vue'

export default defineComponent({
  name: 'CalculatorApp',
  components: {
    PadButton
  },
  setup() {
    const currentCalculationButtons = reactive([]);
    let calculationResult = ref('');
    const calculationValues = computed(() => currentCalculationButtons.map((button) => button.value).join(''));
    const lastButton = computed(() => currentCalculationButtons.at(-1) || {});
    const screenResult = computed(() => calculationResult.value || calculationValues.value);
    const buttons = reactive([
      { label: 'C', value: 'clear', type: 'clear', classes: 'col-span-3' },
      { label: '÷', value: '/', type: 'symbol', classes: '' },
      { label: '7', value: '7', type: 'value', classes: '' },
      { label: '8', value: '8', type: 'value', classes: '' },
      { label: '9', value: '9', type: 'value', classes: '' },
      { label: '×', value: '*', type: 'symbol', classes: '' },
      { label: '4', value: '4', type: 'value', classes: '' },
      { label: '5', value: '5', type: 'value', classes: '' },
      { label: '6', value: '6', type: 'value', classes: '' },
      { label: '-', value: '-', type: 'symbol', classes: '' },
      { label: '1', value: '1', type: 'value', classes: '' },
      { label: '2', value: '2', type: 'value', classes: '' },
      { label: '3', value: '3', type: 'value', classes: '' },
      { label: '+', value: '+', type: 'symbol', classes: '' },
      { label: '0', value: '0', type: 'value', classes: 'col-span-3' },
      { label: '=', value: 'equals', type: 'equals', classes: '' }
    ]);

    function handleClick(button) {
      calculationResult.value = ''

      switch (button.type) {
        case 'clear':
          return onClear()
        case 'equals':
          return onEquals()
        default:
          return onNumber(button)
      }
    }

    function onClear() {
      currentCalculationButtons.splice(0, currentCalculationButtons.length)
    }
    function onEquals() {
      if (lastButton.value.type === 'value') {
        calculationResult.value = eval(calculationValues.value)
      }
    }
    function onNumber(button) {
      if (
        (!lastButton.value.type && button.type === 'value') ||
        (lastButton.value.type === 'value' && (button.type === 'value' || button.type === 'symbol')) ||
        (lastButton.value.type === 'symbol' && button.type === 'value')
      ) {
        currentCalculationButtons.push(button)
      }
    }

    return {
      buttons,
      screenResult,
      handleClick
    }
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
      <PadButton v-for="button in buttons" :key="button.value" :button="button" @buttonClick="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" src="./calculator-app.scss" />
