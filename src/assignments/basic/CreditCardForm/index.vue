<script>
import { defineComponent, computed, reactive, ref } from 'vue'

export default defineComponent({
  name: 'CreditCardForm',
  setup() {
    const cardNumber = ref('')
    const cardName = ref('')
    const errors = reactive([true, true])
    const hasErrors = computed(() => errors.some(Boolean))

    function validateNumber(el) {
      if (!el.srcElement) return
      if (el.srcElement.value.length === 16) {
        el.srcElement.style.backgroundColor = 'lightgreen'
        errors[0] = false
      } else {
        el.srcElement.style.backgroundColor = 'antiquewhite'
        errors[0] = true
      }
    }
    function validateName(el) {
      if (!el.srcElement) return

      if (!el.srcElement.value || /^[0-9]+$/.test(el.srcElement.value) || el.srcElement.value.length < 6) {
        el.srcElement.style.backgroundColor = 'antiquewhite'
        errors[1] = true
      } else {
        el.srcElement.style.backgroundColor = 'lightgreen'
        errors[1] = false
      }
    }
    function focusSubmit(el) {
      if (!el) return

      if (!hasErrors.value) {
        el.disabled = false
        el.focus()
      } else {
        el.disabled = true
      }
    }

    return {
      cardNumber,
      cardName,
      validateNumber,
      validateName,
      focusSubmit,
      hasErrors
    }
  }
})
</script>

<template>
  <div class="credit-card-form">
    <form @submit.prevent>
      <div class="field">
        <label for="cardNumber">Card Number:</label>
        <input v-model="cardNumber" id="cardNumber" type="text" placeholder="1234567890123456" @input="validateNumber"/>
      </div>
      <div class="field">
        <label for="cardName">Card Holder's Name:</label>
        <input v-model="cardName" id="cardName" type="text" placeholder="Full Name" @input="validateName"/>
      </div>

      <button type="submit" :disabled="hasErrors">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" src="./credit-card-form.scss" />
