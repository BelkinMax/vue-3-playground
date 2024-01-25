<script>
import { defineComponent, ref, watch, reactive } from 'vue'

export default defineComponent({
  name: 'CreditCardForm',
  setup() {
    const cardNumber = ref('')
    const cardName = ref('')
    const numberInput = ref(null);
    const nameInput = ref(null);
    const submitButton = ref(null);
    const errors = reactive([true, true])

    watch(cardNumber, () => {
      validateNumber(numberInput)
    })

    watch(cardName, () => {
      validateName(nameInput)
    })

    watch(submitButton, () => {
      if(submitButton.value) {
        focusSubmit(submitButton);
      }
    })

    watch(errors, () => {
      focusSubmit(submitButton);
    })

    function hasErrors() {
      return errors.some(el => el)
    }

    function validateNumber(el) {
      if (!el) return

      if (cardNumber.value.length === 16) {
        el.value.style.backgroundColor = 'lightgreen'
        errors[0] = false
      } else {
        el.value.style.backgroundColor = 'antiquewhite'
        errors[0] = true
      }
    }
    function validateName(el) {
      if (!el) return

      if (!cardName.value || /^[0-9]+$/.test(cardName.value) || cardName.value.length < 6) {
        el.value.style.backgroundColor = 'antiquewhite'
        errors[1] = true
      } else {
        el.value.style.backgroundColor = 'lightgreen'
        errors[1] = false
      }
    }
    function focusSubmit(el) {
      if (!el) return

      if (!hasErrors()) {
        el.value.disabled = false
        el.value.focus()
      } else {
        el.value.disabled = true
      }
    }

    return {
      cardNumber,
      cardName,
      numberInput,
      nameInput,
      submitButton,
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
        <input v-model="cardNumber" ref="numberInput" id="cardNumber" type="text" placeholder="1234567890123456" />
      </div>
      <div class="field">
        <label for="cardName">Card Holder's Name:</label>
        <input v-model="cardName" ref="nameInput" id="cardName" type="text" placeholder="Full Name" />
      </div>

      <button ref="submitButton" type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" src="./credit-card-form.scss" />
