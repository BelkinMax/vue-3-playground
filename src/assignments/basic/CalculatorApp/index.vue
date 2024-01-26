<script>
import { defineComponent, ref, computed } from 'vue'
import PadButton from './components/PadButton.vue'

export default defineComponent({
    name: 'CalculatorApp',
    components: {
        PadButton
    },
    setup() {
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


        const currentCalculationButtons = ref([])
        let calculationResult = ref('');
        const calculationValues = computed(() => currentCalculationButtons.value.map((button) => button.value).join(''));
        const lastButton = computed(() => currentCalculationButtons.value.at(-1) || {})
        const screenResult = computed(() => calculationResult.value || calculationValues.value)


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
                    @buttonClick="handleClick(button)"
            />
        </div>
    </div>
</template>

<style>
.calculator {
    padding: 2rem;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: #9ca3af;
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;
    max-width: 400px;
}
.screen-wrapper {
    padding: 1rem;
    border-radius: 0.375rem;
    width: 100%;
    height: 5rem;
    background-color: #064e3b;
}
.screen-result {
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-align: right;
    color: #ffffff;
}
.pad {
    display: grid;
    margin-top: 3rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    width: 100%;
}
.button {
    border-radius: 1rem;
    width: 5rem;
    height: 5rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    color: #ffffff;
    background-color: #1f2937;
    cursor: pointer;
}
.button.col-span-3 {
    grid-column: span 3 / span 3;
}
</style>
