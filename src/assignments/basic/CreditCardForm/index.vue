<script>
import { defineComponent, ref, reactive, computed } from 'vue'

export default defineComponent({
  name: 'CreditCardForm',
  setup() {
    const cardNumber = ref('');
    const cardName = ref('');
    const errors = reactive([true, true]);
    const hasErrors = computed(() => errors.some(Boolean));

    function validateNumber(el) {
      if (!el) return

      if (el.value.length === 16) {
        el.style.backgroundColor = 'lightgreen'
        errors[0] = false
      } else {
        el.style.backgroundColor = 'antiquewhite'
        errors[0] = true
      }
    }
    function validateName(el) {
      if (!el) return

      if (!el.value || /^[0-9]+$/.test(el.value) || el.value.length < 6) {
        el.style.backgroundColor = 'antiquewhite'
        errors[1] = true
      } else {
        el.style.backgroundColor = 'lightgreen'
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
      focusSubmit
    }
  }
})
</script>

<template>
  <div class="credit-card-form">
    <form @submit.prevent>
      <div class="field">
        <label for="cardNumber">Card Number:</label>
        <input id="cardNumber" type="text" v-model="cardNumber" placeholder="1234567890123456" :ref="validateNumber" />
      </div>
      <div class="field">
        <label for="cardName">Card Holder's Name:</label>
        <input id="cardName" type="text"  v-model="cardName" placeholder="Full Name" :ref="validateName" />
      </div>

      <button :ref="focusSubmit" type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" src="./credit-card-form.scss" />
