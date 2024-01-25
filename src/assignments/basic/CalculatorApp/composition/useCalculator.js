import { ref, computed } from 'vue'

export default function useCalculator () {
  const currentCalculationButtons = ref([]);
  const calculationResult = ref('');
  const calculationValues = computed(() => currentCalculationButtons.value.map((button) => button.value).join(''))
  const lastButton = computed(() => currentCalculationButtons.value.at(-1) || {});
  const screenResult = computed(() => calculationResult.value || calculationValues.value);
  const buttons = [
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
  ]

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
    currentCalculationButtons.value.splice(0, currentCalculationButtons.value.length)
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
      currentCalculationButtons.value.push(button)
    }
  }

  return {
    buttons,
    screenResult,
    handleClick
  }
}